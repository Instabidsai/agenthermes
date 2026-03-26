"""
AgentHermes CrewAI Tools

CrewAI-compatible tools for checking agent readiness, discovering businesses
and services, verifying hermes.json files, and more.

Usage::

    from agenthermes_tools import (
        check_agent_readiness,
        discover_businesses,
        discover_services,
        verify_hermes_json,
        get_business_manifest,
        get_leaderboard,
        compare_business,
        scan_domain,
        batch_check_domains,
    )
    from crewai import Agent, Task, Crew

    researcher = Agent(
        role="Agent Commerce Researcher",
        goal="Find and evaluate agent-ready businesses",
        tools=[
            check_agent_readiness,
            discover_businesses,
            discover_services,
            verify_hermes_json,
            get_business_manifest,
            get_leaderboard,
            compare_business,
        ],
    )
"""

from __future__ import annotations

import json
import os
import sys
from typing import Any, Optional

from crewai.tools import tool

# Import the core SDK
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'python'))
from agenthermes import AgentHermes, AgentHermesError


def _get_client() -> AgentHermes:
    """Create an AgentHermes client from environment variables."""
    return AgentHermes(
        base_url=os.environ.get("AGENTHERMES_BASE_URL", "https://agenthermes.ai"),
        api_key=os.environ.get("AGENTHERMES_API_KEY"),
        agent_id=os.environ.get("AGENTHERMES_AGENT_ID", "crewai-agent"),
    )


def _safe_json(data: Any, max_length: int = 4000) -> str:
    """Serialize data to a truncated JSON string safe for LLM consumption."""
    text = json.dumps(data, indent=2, default=str)
    if len(text) > max_length:
        text = text[:max_length] + "\n... (truncated)"
    return text


# ---------------------------------------------------------------------------
# Tools
# ---------------------------------------------------------------------------

@tool("Check Agent Readiness")
def check_agent_readiness(domain: str) -> str:
    """Check if a business is agent-ready by domain.

    Returns the agent readiness score (0-100), tier
    (platinum/gold/silver/bronze/unaudited), and a category breakdown.
    Use this to determine if a business can participate in AI agent commerce.

    Args:
        domain: The domain to check, e.g. "stripe.com" or "shopify.com".
    """
    try:
        hermes = _get_client()
        result = hermes.check(domain)
        score = result.get("score")
        tier = result.get("tier", "unaudited")
        tier_label = result.get("tier_label", "Unknown")
        categories = result.get("categories", {})

        parts = [
            f"Domain: {domain}",
            f"Score: {score}/100" if score is not None else "Score: Not yet audited",
            f"Tier: {tier} ({tier_label})",
        ]

        if categories:
            parts.append("Category Breakdown:")
            for cat, info in categories.items():
                label = cat.replace("_", " ").title()
                parts.append(f"  - {label}: {info['score']}/{info['max']} ({info['status']})")

        if result.get("profile_url"):
            parts.append(f"Profile: {result['profile_url']}")

        return "\n".join(parts)
    except AgentHermesError as e:
        return f"Error checking {domain}: {e} (HTTP {e.status})"


@tool("Discover Agent-Ready Businesses")
def discover_businesses(query: str) -> str:
    """Search for agent-ready businesses by keyword, capability, or vertical.

    Returns a list of businesses with their agent readiness scores and tiers.
    Use this to find businesses that an AI agent can transact with.

    Args:
        query: Search text (e.g. "payment processing", "ecommerce", "AI tools").
    """
    try:
        hermes = _get_client()
        result = hermes.discover(q=query, limit=10)
        businesses = result.get("businesses", [])
        total = result.get("pagination", {}).get("total", 0)

        if not businesses:
            return f"No agent-ready businesses found for: '{query}'"

        parts = [f"Found {total} businesses (showing top {len(businesses)}):"]
        for biz in businesses:
            name = biz.get("name", "Unknown")
            domain = biz.get("domain", "")
            score = biz.get("audit_score", 0)
            tier = biz.get("audit_tier", "unaudited")
            vertical = biz.get("vertical", "")
            desc = biz.get("description", "")
            if desc and len(desc) > 100:
                desc = desc[:100] + "..."

            line = f"  - {name} ({domain}) | Score: {score} | Tier: {tier}"
            if vertical:
                line += f" | Vertical: {vertical}"
            if desc:
                line += f"\n    {desc}"
            parts.append(line)

        return "\n".join(parts)
    except AgentHermesError as e:
        return f"Error discovering businesses: {e} (HTTP {e.status})"


@tool("Discover Agent Services")
def discover_services(query: str, max_price: Optional[float] = None) -> str:
    """Search for individual API services across agent-ready businesses.

    Returns services with pricing, auth type, uptime, and parent business info.
    Use this to find specific services an AI agent can consume.

    Args:
        query: Search text (e.g. "email sending", "data enrichment").
        max_price: Optional maximum price per API call in USD.
    """
    try:
        hermes = _get_client()
        result = hermes.discover_services(q=query, max_price=max_price, limit=10)
        services = result.get("services", [])
        total = result.get("pagination", {}).get("total", 0)

        if not services:
            return f"No services found for: '{query}'"

        parts = [f"Found {total} services (showing top {len(services)}):"]
        for svc in services:
            name = svc.get("name", "Unknown")
            desc = svc.get("description", "")
            price = svc.get("price_per_call")
            model = svc.get("pricing_model", "")
            auth = svc.get("auth_type", "")
            uptime = svc.get("uptime_pct")
            biz = svc.get("business", {})
            biz_name = biz.get("name", "")
            biz_tier = biz.get("tier", "")

            line = f"  - {name}"
            if biz_name:
                line += f" (by {biz_name}, {biz_tier})"
            if price is not None:
                line += f" | ${price}/{model}"
            if auth:
                line += f" | Auth: {auth}"
            if uptime is not None:
                line += f" | Uptime: {uptime}%"
            if desc:
                short_desc = desc[:80] + "..." if len(desc) > 80 else desc
                line += f"\n    {short_desc}"
            parts.append(line)

        return "\n".join(parts)
    except AgentHermesError as e:
        return f"Error discovering services: {e} (HTTP {e.status})"


@tool("Verify Hermes JSON")
def verify_hermes_json(domain: str) -> str:
    """Verify a business's .well-known/agent-hermes.json file is valid.

    Checks the HMAC signature, score accuracy against the AgentHermes database,
    and certification expiry. Use this to verify a business's claimed agent
    readiness before trusting it.

    Args:
        domain: The domain to verify (e.g. "example.com").
    """
    try:
        hermes = _get_client()
        result = hermes.verify_hermes_json(domain)
        valid = result.get("valid", False)

        parts = [f"Domain: {domain}", f"Valid: {valid}"]

        if valid:
            parts.append(f"Score: {result.get('score')}")
            parts.append(f"Tier: {result.get('tier')}")
            parts.append(f"Signature Verified: {result.get('signature_verified')}")
            parts.append(f"Score Matches DB: {result.get('score_matches_db')}")
            cert = result.get("certification_current")
            if cert is not None:
                parts.append(f"Certification Current: {cert}")
        else:
            reason = result.get("reason", "Unknown reason")
            parts.append(f"Reason: {reason}")

        return "\n".join(parts)
    except AgentHermesError as e:
        return f"Error verifying {domain}: {e} (HTTP {e.status})"


@tool("Get Business Manifest")
def get_business_manifest(slug: str) -> str:
    """Get the full structured manifest for an agent-ready business.

    Returns services, MCP endpoints, pricing, auth types, and payment
    capabilities. Use this to understand exactly what a business offers
    to AI agents before initiating a transaction.

    Args:
        slug: The business slug (e.g. "acme-corp"). Find slugs via discover_businesses.
    """
    try:
        hermes = _get_client()
        result = hermes.manifest(slug)

        biz = result.get("business", {})
        readiness = result.get("agent_readiness", {})
        services = result.get("services", [])
        payment = result.get("payment", {})

        parts = [
            f"Business: {biz.get('name')} ({biz.get('domain')})",
            f"Vertical: {biz.get('vertical', 'N/A')}",
            f"Agent Readiness: {readiness.get('score')}/100 ({readiness.get('tier')})",
            f"MCP Endpoints: {len(result.get('mcp_endpoints', []))}",
            f"Accepts Agent Payments: {payment.get('accepts_agent_payments', False)}",
        ]

        if services:
            parts.append(f"\nServices ({len(services)}):")
            for svc in services:
                line = f"  - {svc.get('name')}: ${svc.get('price_per_call')}/{svc.get('pricing_model')}"
                line += f" | Auth: {svc.get('auth_type')} | Uptime: {svc.get('uptime_pct')}%"
                if svc.get("endpoint"):
                    line += f"\n    Endpoint: {svc.get('endpoint')}"
                parts.append(line)

        caps = biz.get("capabilities", [])
        if caps:
            parts.append(f"\nCapabilities: {', '.join(caps)}")

        return "\n".join(parts)
    except AgentHermesError as e:
        return f"Error getting manifest for {slug}: {e} (HTTP {e.status})"


@tool("Get Agent Readiness Leaderboard")
def get_leaderboard(vertical: Optional[str] = None, limit: int = 10) -> str:
    """Get the agent readiness leaderboard, ranked by score.

    Shows the top agent-ready businesses globally or within a specific vertical.
    Use this to find industry leaders in agent readiness.

    Args:
        vertical: Optional vertical/industry filter (e.g. "fintech", "ecommerce").
        limit: Number of results (default 10, max 100).
    """
    try:
        hermes = _get_client()
        result = hermes.leaderboard(vertical=vertical, limit=limit)
        entries = result.get("leaderboard", [])
        total = result.get("pagination", {}).get("total", 0)
        verticals = result.get("filters", {}).get("verticals", [])

        if not entries:
            msg = "No businesses on the leaderboard"
            if vertical:
                msg += f" for vertical: {vertical}"
            return msg

        header = f"Agent Readiness Leaderboard (top {len(entries)} of {total})"
        if vertical:
            header += f" [Vertical: {vertical}]"
        parts = [header + ":"]

        for entry in entries:
            rank = entry.get("rank", "?")
            name = entry.get("name", "Unknown")
            score = entry.get("score", 0)
            tier = entry.get("tier", "unaudited")
            domain = entry.get("domain", "")
            has_mcp = entry.get("has_mcp", False)
            line = f"  #{rank}. {name} ({domain}) | Score: {score} | Tier: {tier}"
            if has_mcp:
                line += " | MCP: Yes"
            parts.append(line)

        if verticals:
            parts.append(f"\nAvailable verticals: {', '.join(verticals)}")

        return "\n".join(parts)
    except AgentHermesError as e:
        return f"Error getting leaderboard: {e} (HTTP {e.status})"


@tool("Compare Business to Peers")
def compare_business(slug: str) -> str:
    """Compare a business against its peers in the same vertical.

    Returns percentile rank, strengths, weaknesses, and per-category
    comparison against vertical averages. Use this to understand how
    a business stacks up against competitors.

    Args:
        slug: The business slug (e.g. "acme-corp").
    """
    try:
        hermes = _get_client()
        result = hermes.compare(slug)

        biz = result.get("business", {})
        comparison = result.get("comparison", {})
        strengths = result.get("strengths", [])
        weaknesses = result.get("weaknesses", [])

        score_diff = comparison.get("score_vs_avg", 0)
        sign = "+" if score_diff >= 0 else ""

        parts = [
            f"Business: {biz.get('name')} ({biz.get('tier')})",
            f"Score: {biz.get('score')}/100",
            f"Vertical: {result.get('vertical', 'global')}",
            f"Percentile Rank: {comparison.get('percentile_rank')}th",
            f"vs Peer Average: {comparison.get('your_score')} vs {comparison.get('avg_peer_score')} ({sign}{score_diff})",
            f"Total Peers: {comparison.get('total_peers')}",
        ]

        if strengths:
            parts.append("\nStrengths:")
            for s in strengths:
                parts.append(f"  + {s}")

        if weaknesses:
            parts.append("\nWeaknesses:")
            for w in weaknesses:
                parts.append(f"  - {w}")

        cat_comp = result.get("category_comparison", {})
        if cat_comp:
            parts.append("\nCategory Comparison:")
            for cat, info in cat_comp.items():
                label = cat.replace("_", " ").title()
                parts.append(
                    f"  {label}: You: {info['your_score']}/{info['max']} | Peers: {info['peer_avg']}/{info['max']}"
                )

        return "\n".join(parts)
    except AgentHermesError as e:
        return f"Error comparing {slug}: {e} (HTTP {e.status})"


@tool("Scan Domain for Agent Readiness")
def scan_domain(url: str) -> str:
    """Run a fresh 9-dimension agent readiness scan on a domain.

    This actively probes the target site and takes 10-30 seconds. Returns
    a full scorecard with per-dimension breakdowns, cap rules, and
    prioritized recommendations.

    Args:
        url: Domain or URL to scan (e.g. "example.com").
    """
    try:
        hermes = _get_client()
        result = hermes.scan(url)

        parts = [
            f"Scan Complete: {result.get('domain', url)}",
            f"Hermes ID: {result.get('hermes_id', 'N/A')}",
            f"Total Score: {result.get('total_score', 0)}/100",
            f"Tier: {result.get('tier', 'unaudited')}",
            f"Scanned At: {result.get('scanned_at', 'N/A')}",
        ]

        dimensions = result.get("dimensions", [])
        if dimensions:
            parts.append(f"\n9-Dimension Breakdown:")
            for dim in dimensions:
                label = dim.get("label", dim.get("dimension", "?"))
                score = dim.get("score", 0)
                weight = dim.get("weight", 0)
                checks = dim.get("checks", [])
                passed = sum(1 for c in checks if c.get("passed"))
                total = len(checks)
                parts.append(
                    f"  {dim.get('dimension', '?')}. {label}: {score}/100 (weight: {weight}) [{passed}/{total} checks passed]"
                )

        caps = result.get("caps_applied", [])
        if caps:
            parts.append("\nCaps Applied:")
            for cap in caps:
                parts.append(f"  - {cap.get('rule')}: capped to {cap.get('capped_to')}")

        next_steps = result.get("next_steps", [])
        if next_steps:
            parts.append("\nRecommended Next Steps:")
            for i, step in enumerate(next_steps[:5], 1):
                parts.append(f"  {i}. {step}")

        return "\n".join(parts)
    except AgentHermesError as e:
        return f"Error scanning {url}: {e} (HTTP {e.status})"


@tool("Batch Check Domains")
def batch_check_domains(domains: str) -> str:
    """Batch check multiple domains for agent readiness (requires API key).

    Accepts a comma-separated list of domains (max 100). Cached results
    from the last 24 hours are returned immediately; new domains are scanned.

    Args:
        domains: Comma-separated list of domains (e.g. "stripe.com,shopify.com,twilio.com").
    """
    try:
        domain_list = [d.strip() for d in domains.split(",") if d.strip()]
        if not domain_list:
            return "No domains provided. Pass a comma-separated list."
        if len(domain_list) > 100:
            return f"Too many domains ({len(domain_list)}). Maximum is 100."

        hermes = _get_client()
        result = hermes.batch_check(domain_list)

        summary = result.get("summary", {})
        results = result.get("results", [])
        invalid = result.get("invalid_domains", [])

        parts = [
            f"Batch Check Summary:",
            f"  Total Requested: {summary.get('total_requested', 0)}",
            f"  Cached: {summary.get('cached', 0)}",
            f"  Scanned: {summary.get('scanned', 0)}",
            f"  Queued: {summary.get('queued', 0)}",
            f"  Errors: {summary.get('errors', 0)}",
            "",
            "Results:",
        ]

        for r in results:
            domain = r.get("domain", "?")
            score = r.get("score")
            tier = r.get("tier", "unaudited")
            status = r.get("status", "unknown")
            hermes_id = r.get("hermes_id", "N/A")

            score_str = f"{score}/100" if score is not None else "N/A"
            line = f"  - {domain}: Score: {score_str} | Tier: {tier} | Status: {status}"
            if hermes_id and hermes_id != "N/A":
                line += f" | ID: {hermes_id}"
            if r.get("error"):
                line += f" | Error: {r['error']}"
            parts.append(line)

        if invalid:
            parts.append("\nInvalid Domains:")
            for inv in invalid:
                parts.append(f"  - {inv.get('domain')}: {inv.get('reason')}")

        return "\n".join(parts)
    except AgentHermesError as e:
        return f"Error in batch check: {e} (HTTP {e.status})"


def get_all_tools() -> list:
    """Return all AgentHermes CrewAI tools as a list.

    Usage::

        from agenthermes_tools import get_all_tools
        tools = get_all_tools()
    """
    return [
        check_agent_readiness,
        discover_businesses,
        discover_services,
        verify_hermes_json,
        get_business_manifest,
        get_leaderboard,
        compare_business,
        scan_domain,
        batch_check_domains,
    ]
