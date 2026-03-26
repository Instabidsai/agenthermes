"""
AgentHermes LangChain Tools

Drop-in LangChain-compatible tools for checking agent readiness,
discovering businesses and services, and verifying hermes.json files.

Usage::

    from agenthermes_tools import (
        CheckAgentReadiness,
        DiscoverAgentReadyBusinesses,
        DiscoverAgentServices,
        VerifyHermesJson,
        GetBusinessManifest,
        GetLeaderboard,
        CompareBusiness,
    )
    from langchain.agents import initialize_agent, AgentType

    tools = [
        CheckAgentReadiness(),
        DiscoverAgentReadyBusinesses(),
        DiscoverAgentServices(),
        VerifyHermesJson(),
        GetBusinessManifest(),
        GetLeaderboard(),
        CompareBusiness(),
    ]

    agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION)
    agent.run("Is stripe.com agent-ready?")
"""

from __future__ import annotations

import json
import os
from typing import Any, Optional, Type

from langchain.tools import BaseTool
from pydantic import BaseModel, Field

# Import the core SDK (expects agenthermes.py to be importable)
import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'python'))
from agenthermes import AgentHermes, AgentHermesError


def _get_client() -> AgentHermes:
    """Create an AgentHermes client from environment variables."""
    return AgentHermes(
        base_url=os.environ.get("AGENTHERMES_BASE_URL", "https://agenthermes.ai"),
        api_key=os.environ.get("AGENTHERMES_API_KEY"),
        agent_id=os.environ.get("AGENTHERMES_AGENT_ID", "langchain-agent"),
    )


def _safe_json(data: Any, max_length: int = 4000) -> str:
    """Serialize data to a truncated JSON string safe for LLM consumption."""
    text = json.dumps(data, indent=2, default=str)
    if len(text) > max_length:
        text = text[:max_length] + "\n... (truncated)"
    return text


# ---------------------------------------------------------------------------
# Input schemas
# ---------------------------------------------------------------------------

class DomainInput(BaseModel):
    """Input for domain-based lookups."""
    domain: str = Field(description="A domain name like 'example.com'")


class SlugInput(BaseModel):
    """Input for slug-based lookups."""
    slug: str = Field(description="A business slug like 'acme-corp'")


class QueryInput(BaseModel):
    """Input for search queries."""
    query: str = Field(description="Search query text")


class ServiceQueryInput(BaseModel):
    """Input for service discovery queries."""
    query: str = Field(description="Search query for services (e.g. 'payment processing')")
    max_price: Optional[float] = Field(default=None, description="Maximum price per API call in USD")


class LeaderboardInput(BaseModel):
    """Input for leaderboard queries."""
    vertical: Optional[str] = Field(default=None, description="Filter by vertical/industry (e.g. 'fintech', 'ecommerce')")
    limit: int = Field(default=10, description="Number of results to return (max 100)")


# ---------------------------------------------------------------------------
# Tools
# ---------------------------------------------------------------------------

class CheckAgentReadiness(BaseTool):
    """Check if a business is agent-ready by scanning its domain."""

    name: str = "check_agent_readiness"
    description: str = (
        "Check if a business is agent-ready by domain. "
        "Returns an agent readiness score (0-100) and tier "
        "(platinum/gold/silver/bronze/unaudited). Use this to "
        "determine if a business can participate in agent commerce."
    )
    args_schema: Type[BaseModel] = DomainInput

    def _run(self, domain: str) -> str:
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

    async def _arun(self, domain: str) -> str:
        return self._run(domain)


class DiscoverAgentReadyBusinesses(BaseTool):
    """Search for agent-ready businesses by capability, vertical, or keyword."""

    name: str = "discover_agent_ready_businesses"
    description: str = (
        "Search for agent-ready businesses by capability, vertical, or keyword. "
        "Returns a list of businesses with their agent readiness scores and tiers. "
        "Use this to find businesses that an AI agent can transact with."
    )
    args_schema: Type[BaseModel] = QueryInput

    def _run(self, query: str) -> str:
        try:
            hermes = _get_client()
            result = hermes.discover(q=query, limit=10)
            businesses = result.get("businesses", [])
            total = result.get("pagination", {}).get("total", 0)

            if not businesses:
                return f"No agent-ready businesses found for query: '{query}'"

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

    async def _arun(self, query: str) -> str:
        return self._run(query)


class DiscoverAgentServices(BaseTool):
    """Search for individual services that AI agents can consume."""

    name: str = "discover_agent_services"
    description: str = (
        "Search for individual API services across agent-ready businesses. "
        "Filter by keyword, price, and more. Returns services with pricing, "
        "auth type, uptime, and the parent business details."
    )
    args_schema: Type[BaseModel] = ServiceQueryInput

    def _run(self, query: str, max_price: Optional[float] = None) -> str:
        try:
            hermes = _get_client()
            result = hermes.discover_services(q=query, max_price=max_price, limit=10)
            services = result.get("services", [])
            total = result.get("pagination", {}).get("total", 0)

            if not services:
                return f"No services found for query: '{query}'"

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

    async def _arun(self, query: str, max_price: Optional[float] = None) -> str:
        return self._run(query, max_price)


class VerifyHermesJson(BaseTool):
    """Verify a business's .well-known/agent-hermes.json file."""

    name: str = "verify_hermes_json"
    description: str = (
        "Verify a business's .well-known/agent-hermes.json file is valid and "
        "signed by AgentHermes. Checks HMAC signature, score accuracy against "
        "the database, and certification expiry. Use this to verify a business's "
        "claimed agent readiness."
    )
    args_schema: Type[BaseModel] = DomainInput

    def _run(self, domain: str) -> str:
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

    async def _arun(self, domain: str) -> str:
        return self._run(domain)


class GetBusinessManifest(BaseTool):
    """Get the full structured manifest for a business."""

    name: str = "get_business_manifest"
    description: str = (
        "Get the structured manifest for a business by slug. "
        "Returns services, MCP endpoints, pricing, auth types, "
        "and payment capabilities. Use this to understand what "
        "a business offers to AI agents."
    )
    args_schema: Type[BaseModel] = SlugInput

    def _run(self, slug: str) -> str:
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
                    parts.append(line)

            caps = biz.get("capabilities", [])
            if caps:
                parts.append(f"\nCapabilities: {', '.join(caps)}")

            return "\n".join(parts)
        except AgentHermesError as e:
            return f"Error getting manifest for {slug}: {e} (HTTP {e.status})"

    async def _arun(self, slug: str) -> str:
        return self._run(slug)


class GetLeaderboard(BaseTool):
    """Get the agent readiness leaderboard."""

    name: str = "get_agent_readiness_leaderboard"
    description: str = (
        "Get the agent readiness leaderboard, ranked by score. "
        "Optionally filter by vertical. Use this to find the "
        "most agent-ready businesses."
    )
    args_schema: Type[BaseModel] = LeaderboardInput

    def _run(self, vertical: Optional[str] = None, limit: int = 10) -> str:
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

            parts = [f"Agent Readiness Leaderboard (top {len(entries)} of {total}):"]
            if vertical:
                parts[0] += f" [Vertical: {vertical}]"

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

    async def _arun(self, vertical: Optional[str] = None, limit: int = 10) -> str:
        return self._run(vertical, limit)


class CompareBusiness(BaseTool):
    """Compare a business against its peers."""

    name: str = "compare_business_to_peers"
    description: str = (
        "Compare a business against its peers in the same vertical. "
        "Returns percentile rank, strengths, weaknesses, and "
        "category-level comparison. Use this to understand how a "
        "business stacks up."
    )
    args_schema: Type[BaseModel] = SlugInput

    def _run(self, slug: str) -> str:
        try:
            hermes = _get_client()
            result = hermes.compare(slug)

            biz = result.get("business", {})
            comparison = result.get("comparison", {})
            strengths = result.get("strengths", [])
            weaknesses = result.get("weaknesses", [])

            parts = [
                f"Business: {biz.get('name')} ({biz.get('tier')})",
                f"Score: {biz.get('score')}/100",
                f"Vertical: {result.get('vertical', 'global')}",
                f"Percentile Rank: {comparison.get('percentile_rank')}th",
                f"vs Peer Average: {comparison.get('your_score')} vs {comparison.get('avg_peer_score')} ({comparison.get('score_vs_avg'):+d})",
                f"Total Peers: {comparison.get('total_peers')}",
            ]

            if strengths:
                parts.append(f"\nStrengths:")
                for s in strengths:
                    parts.append(f"  + {s}")

            if weaknesses:
                parts.append(f"\nWeaknesses:")
                for w in weaknesses:
                    parts.append(f"  - {w}")

            cat_comp = result.get("category_comparison", {})
            if cat_comp:
                parts.append(f"\nCategory Comparison:")
                for cat, info in cat_comp.items():
                    label = cat.replace("_", " ").title()
                    parts.append(
                        f"  {label}: You: {info['your_score']}/{info['max']} | Peers: {info['peer_avg']}/{info['max']}"
                    )

            return "\n".join(parts)
        except AgentHermesError as e:
            return f"Error comparing {slug}: {e} (HTTP {e.status})"

    async def _arun(self, slug: str) -> str:
        return self._run(slug)


# ---------------------------------------------------------------------------
# Convenience: get all tools as a list
# ---------------------------------------------------------------------------

def get_agenthermes_tools() -> list[BaseTool]:
    """Return all AgentHermes LangChain tools as a list.

    Usage::

        from agenthermes_tools import get_agenthermes_tools
        tools = get_agenthermes_tools()
    """
    return [
        CheckAgentReadiness(),
        DiscoverAgentReadyBusinesses(),
        DiscoverAgentServices(),
        VerifyHermesJson(),
        GetBusinessManifest(),
        GetLeaderboard(),
        CompareBusiness(),
    ]
