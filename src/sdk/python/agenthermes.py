"""
AgentHermes Python SDK

Check Agent Readiness Scores, discover agent-ready businesses,
and facilitate verified agent-to-business commerce.

Usage::

    from agenthermes import AgentHermes

    hermes = AgentHermes(api_key='ah_...')
    score = hermes.check('example.com')
    if score['tier'] in ('gold', 'platinum'):
        proceed_with_transaction()
"""

from __future__ import annotations

import json
from typing import Any, Dict, List, Optional
from urllib.parse import quote, urlencode

try:
    import httpx

    _HTTP_BACKEND = "httpx"
except ImportError:
    try:
        import requests

        _HTTP_BACKEND = "requests"
    except ImportError:
        raise ImportError(
            "agenthermes requires either 'httpx' or 'requests'. "
            "Install one: pip install httpx  OR  pip install requests"
        )


class AgentHermesError(Exception):
    """Raised when an AgentHermes API call returns a non-2xx status."""

    def __init__(self, message: str, status: int, body: Any = None):
        super().__init__(message)
        self.status = status
        self.body = body


class AgentHermes:
    """Client for the AgentHermes API.

    Args:
        base_url: Base URL of the API. Defaults to ``https://agenthermes.ai``.
        api_key: Bearer token for authenticated endpoints (format ``ah_...``).
        agent_id: Optional agent identifier sent via ``x-agent-id`` for analytics.
        timeout: Request timeout in seconds. Defaults to 30.
    """

    def __init__(
        self,
        base_url: str = "https://agenthermes.ai",
        api_key: Optional[str] = None,
        agent_id: Optional[str] = None,
        timeout: float = 30.0,
    ):
        self._base_url = base_url.rstrip("/")
        self._api_key = api_key
        self._agent_id = agent_id
        self._timeout = timeout

        if _HTTP_BACKEND == "httpx":
            self._client = httpx.Client(timeout=self._timeout)
        else:
            self._session = requests.Session()

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------

    def _headers(self) -> Dict[str, str]:
        h: Dict[str, str] = {"Content-Type": "application/json"}
        if self._api_key:
            h["Authorization"] = f"Bearer {self._api_key}"
        if self._agent_id:
            h["x-agent-id"] = self._agent_id
        return h

    def _request(
        self,
        method: str,
        path: str,
        body: Optional[Any] = None,
    ) -> Any:
        url = f"{self._base_url}{path}"
        kwargs: Dict[str, Any] = {"headers": self._headers()}

        if body is not None:
            if _HTTP_BACKEND == "httpx":
                kwargs["content"] = json.dumps(body)
            else:
                kwargs["data"] = json.dumps(body)

        try:
            if _HTTP_BACKEND == "httpx":
                resp = self._client.request(method, url, **kwargs)
                status = resp.status_code
                try:
                    data = resp.json()
                except Exception:
                    data = resp.text
            else:
                resp = self._session.request(
                    method, url, timeout=self._timeout, **kwargs
                )
                status = resp.status_code
                try:
                    data = resp.json()
                except Exception:
                    data = resp.text
        except Exception as exc:
            raise AgentHermesError(str(exc), 0, None) from exc

        if status >= 400:
            msg = (
                data.get("error", f"HTTP {status}")
                if isinstance(data, dict)
                else f"HTTP {status}"
            )
            raise AgentHermesError(msg, status, data)

        return data

    @staticmethod
    def _build_query(params: Dict[str, Any]) -> str:
        filtered = {k: v for k, v in params.items() if v is not None}
        if not filtered:
            return ""
        return "?" + urlencode(filtered)

    # ------------------------------------------------------------------
    # Public API -- read-only (no auth required)
    # ------------------------------------------------------------------

    def check(self, domain: str) -> Dict[str, Any]:
        """Check a domain's cached agent readiness score.

        Args:
            domain: The domain to check (e.g. ``"example.com"``).

        Returns:
            Score, tier, tier_label, category breakdown, and profile URL.
        """
        return self._request("GET", f"/api/v1/score/{quote(domain, safe='')}")

    def scan(self, url: str) -> Dict[str, Any]:
        """Run a fresh 9-dimension agent readiness scan (10-30s).

        Args:
            url: Domain or URL to scan.

        Returns:
            Full 9-dimension scorecard with per-dimension breakdown.
        """
        return self._request("POST", "/api/v1/scan", {"url": url})

    def details(self, slug: str) -> Dict[str, Any]:
        """Get full details for a business.

        Args:
            slug: Business slug (e.g. ``"acme-corp"``).

        Returns:
            Complete business profile with services, audit results,
            connections, and transaction history.
        """
        return self._request("GET", f"/api/v1/business/{quote(slug, safe='')}")

    def discover(
        self,
        q: Optional[str] = None,
        vertical: Optional[str] = None,
        capability: Optional[str] = None,
        tier: Optional[str] = None,
        min_score: Optional[float] = None,
        mcp_compatible: Optional[bool] = None,
        max_price: Optional[float] = None,
        sort: Optional[str] = None,
        limit: int = 20,
        offset: int = 0,
    ) -> Dict[str, Any]:
        """Discover agent-ready businesses.

        Args:
            q: Text search across name, description, domain.
            vertical: Filter by vertical.
            capability: Filter by capability.
            tier: Minimum tier (bronze/silver/gold/platinum).
            min_score: Minimum audit score.
            mcp_compatible: Only return businesses with MCP endpoints.
            max_price: Max price per call for any service.
            sort: Sort field (audit_score, trust_score, name).
            limit: Results per page (max 100).
            offset: Pagination offset.

        Returns:
            Paginated list of matching businesses.
        """
        qs = self._build_query(
            {
                "q": q,
                "vertical": vertical,
                "capability": capability,
                "tier": tier,
                "min_score": min_score,
                "mcp_compatible": mcp_compatible,
                "max_price": max_price,
                "sort": sort,
                "limit": limit,
                "offset": offset,
            }
        )
        return self._request("GET", f"/api/v1/discover{qs}")

    def discover_services(
        self,
        q: Optional[str] = None,
        vertical: Optional[str] = None,
        max_price: Optional[float] = None,
        pricing_model: Optional[str] = None,
        auth_type: Optional[str] = None,
        min_uptime: Optional[float] = None,
        limit: int = 20,
        offset: int = 0,
    ) -> Dict[str, Any]:
        """Discover individual services across all businesses.

        Args:
            q: Text search on service name/description.
            vertical: Filter by parent business vertical.
            max_price: Max price_per_call.
            pricing_model: per_call | monthly | per_unit | custom.
            auth_type: api_key | oauth | jwt | none.
            min_uptime: Minimum uptime percentage (0-100).
            limit: Results per page (max 100).
            offset: Pagination offset.

        Returns:
            Paginated list of services with parent business info.
        """
        qs = self._build_query(
            {
                "q": q,
                "vertical": vertical,
                "max_price": max_price,
                "pricing_model": pricing_model,
                "auth_type": auth_type,
                "min_uptime": min_uptime,
                "limit": limit,
                "offset": offset,
            }
        )
        return self._request("GET", f"/api/v1/discover/services{qs}")

    def manifest(self, slug: str) -> Dict[str, Any]:
        """Get the structured manifest for a business.

        Args:
            slug: Business slug.

        Returns:
            Business manifest (schema v1.0) with services, MCP endpoints,
            and payment capabilities.
        """
        return self._request("GET", f"/api/v1/business/{quote(slug, safe='')}/manifest")

    def verify_hermes_json(self, domain: str) -> Dict[str, Any]:
        """Verify a ``.well-known/agent-hermes.json`` file.

        Fetches the file from the domain and validates the HMAC signature,
        score accuracy, and certification status.

        Args:
            domain: Domain to verify.

        Returns:
            ``{"valid": True/False, ...}`` with verification details.
        """
        return self._request("POST", "/api/v1/hermes-json/verify", {"domain": domain})

    def leaderboard(
        self,
        vertical: Optional[str] = None,
        limit: int = 50,
        offset: int = 0,
    ) -> Dict[str, Any]:
        """Get the agent readiness leaderboard.

        Args:
            vertical: Filter by vertical.
            limit: Results per page (max 100).
            offset: Pagination offset.

        Returns:
            Ranked list of businesses with pagination and available filters.
        """
        qs = self._build_query(
            {"vertical": vertical, "limit": limit, "offset": offset}
        )
        return self._request("GET", f"/api/v1/leaderboard{qs}")

    def benchmarks(self, vertical: Optional[str] = None) -> Dict[str, Any]:
        """Get aggregate benchmarks for agent readiness.

        Args:
            vertical: Optional vertical to scope the benchmarks.

        Returns:
            Average, median, top-quartile scores, tier distribution,
            and category averages.
        """
        qs = self._build_query({"vertical": vertical})
        return self._request("GET", f"/api/v1/benchmarks{qs}")

    def compare(self, slug: str) -> Dict[str, Any]:
        """Compare a business against its peers.

        Args:
            slug: Business slug.

        Returns:
            Percentile rank, strengths, weaknesses, and per-category
            comparison against vertical averages.
        """
        qs = self._build_query({"slug": slug})
        return self._request("GET", f"/api/v1/benchmarks/compare{qs}")

    def batch_check(self, domains: List[str]) -> Dict[str, Any]:
        """Batch check up to 100 domains at once (auth required).

        Domains scanned within the last 24 hours return cached results.
        Batches of 5 or fewer are scanned synchronously; larger batches
        return ``status: 'queued'``.

        Args:
            domains: List of domains (max 100).

        Returns:
            Per-domain results with summary statistics.

        Raises:
            AgentHermesError: If more than 100 domains are provided.
        """
        if len(domains) > 100:
            raise AgentHermesError(
                f"Too many domains. Maximum is 100, received {len(domains)}.",
                400,
                None,
            )
        return self._request("POST", "/api/v1/scan/batch", {"domains": domains})

    # ------------------------------------------------------------------
    # Public API -- authenticated methods
    # ------------------------------------------------------------------

    def register_business(
        self,
        name: str,
        domain: str,
        description: str,
        vertical: Optional[str] = None,
        capabilities: Optional[List[str]] = None,
        owner_email: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Register a new business in the AgentHermes directory.

        Args:
            name: Business name (max 200 chars).
            domain: Business domain (e.g. ``"example.com"``).
            description: Business description.
            vertical: Business vertical/industry.
            capabilities: List of capabilities.
            owner_email: Contact email.

        Returns:
            The created business record.
        """
        payload: Dict[str, Any] = {
            "name": name,
            "domain": domain,
            "description": description,
        }
        if vertical is not None:
            payload["vertical"] = vertical
        if capabilities is not None:
            payload["capabilities"] = capabilities
        if owner_email is not None:
            payload["owner_email"] = owner_email
        return self._request("POST", "/api/v1/business", payload)

    def fund_wallet(self, business_id: str, amount: float) -> Dict[str, Any]:
        """Add funds to a business's wallet (auth required).

        Args:
            business_id: UUID of the business.
            amount: Amount in USD (max $10,000, max 2 decimal places).

        Returns:
            Updated wallet with new balance.
        """
        return self._request(
            "POST", "/api/v1/wallet/fund", {"business_id": business_id, "amount": amount}
        )

    def transfer(
        self,
        from_business_id: str,
        to_business_id: str,
        amount: float,
        description: str,
        agent_id: Optional[str] = None,
        task_context: Optional[str] = None,
        service_id: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Transfer funds between two business wallets (auth required).

        Args:
            from_business_id: Source business UUID.
            to_business_id: Destination business UUID.
            amount: Amount in USD (max $10,000).
            description: Service description for the transaction.
            agent_id: Optional agent performing the transfer.
            task_context: Optional context about the task.
            service_id: Optional service ID being paid for.

        Returns:
            Transaction record.
        """
        payload: Dict[str, Any] = {
            "from_business_id": from_business_id,
            "to_business_id": to_business_id,
            "amount": amount,
            "service_description": description,
        }
        if agent_id is not None:
            payload["agent_id"] = agent_id
        if task_context is not None:
            payload["task_context"] = task_context
        if service_id is not None:
            payload["service_id"] = service_id
        return self._request("POST", "/api/v1/wallet/transfer", payload)

    def trust_score(self, slug: str) -> Dict[str, Any]:
        """Get the trust score for a business.

        Args:
            slug: Business slug.

        Returns:
            Trust score with detailed breakdown.
        """
        return self._request("GET", f"/api/v1/trust-score/{quote(slug, safe='')}")

    def certify(self, slug: str) -> Dict[str, Any]:
        """Apply for AgentHermes certification (auth required).

        Requires Gold tier (score >= 75) or higher. Certification lasts 90 days
        with auto-renewal.

        Args:
            slug: Business slug.

        Returns:
            Certification details with badge URL.
        """
        return self._request("POST", "/api/v1/certify", {"slug": slug})

    # ------------------------------------------------------------------
    # Audit (old 5-category system)
    # ------------------------------------------------------------------

    def run_audit(self, url: str) -> Dict[str, Any]:
        """Run an audit using the old 5-category scoring system.

        Args:
            url: Domain or URL to audit.

        Returns:
            Audit results with category breakdown.
        """
        return self._request("POST", "/api/v1/audit", {"url": url})

    def get_audit_by_id(self, id: str) -> Dict[str, Any]:
        """Retrieve a previously completed audit by ID.

        Args:
            id: Audit UUID.

        Returns:
            Stored audit results.
        """
        return self._request("GET", f"/api/v1/audit/{quote(id, safe='')}")

    # ------------------------------------------------------------------
    # Wallet
    # ------------------------------------------------------------------

    def get_wallet(self, business_id: str) -> Dict[str, Any]:
        """Get the wallet balance for a business.

        Args:
            business_id: UUID of the business.

        Returns:
            Wallet balance and status.
        """
        qs = self._build_query({"business_id": business_id})
        return self._request("GET", f"/api/v1/wallet{qs}")

    def get_transactions(
        self,
        business_id: str,
        limit: Optional[int] = None,
        offset: Optional[int] = None,
    ) -> Dict[str, Any]:
        """Get transaction history for a business wallet.

        Args:
            business_id: UUID of the business.
            limit: Max results per page.
            offset: Pagination offset.

        Returns:
            Paginated list of transactions.
        """
        qs = self._build_query({
            "business_id": business_id,
            "limit": limit,
            "offset": offset,
        })
        return self._request("GET", f"/api/v1/wallet/transactions{qs}")

    # ------------------------------------------------------------------
    # Analytics
    # ------------------------------------------------------------------

    def get_analytics(
        self,
        business_id: str,
        period: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Get analytics for a business.

        Args:
            business_id: UUID of the business.
            period: Time period (e.g. ``"7d"``, ``"30d"``).

        Returns:
            Analytics metrics for the specified period.
        """
        qs = self._build_query({
            "business_id": business_id,
            "period": period,
        })
        return self._request("GET", f"/api/v1/analytics{qs}")

    # ------------------------------------------------------------------
    # Report
    # ------------------------------------------------------------------

    def get_report(self) -> Dict[str, Any]:
        """Get the platform-wide report.

        Returns:
            Aggregate platform report.
        """
        return self._request("GET", "/api/v1/report")

    # ------------------------------------------------------------------
    # Mystery Shop
    # ------------------------------------------------------------------

    def run_mystery_shop(
        self,
        business_id: Optional[str] = None,
        slug: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Run a mystery shop evaluation of a business.

        Args:
            business_id: UUID of the business.
            slug: Business slug (alternative to business_id).

        Returns:
            Mystery shop evaluation results.
        """
        payload: Dict[str, Any] = {}
        if business_id is not None:
            payload["business_id"] = business_id
        if slug is not None:
            payload["slug"] = slug
        return self._request("POST", "/api/v1/mystery-shop", payload)

    def get_mystery_shop_history(
        self,
        business_id: Optional[str] = None,
        slug: Optional[str] = None,
        limit: Optional[int] = None,
    ) -> Dict[str, Any]:
        """Get mystery shop history for a business.

        Args:
            business_id: UUID of the business.
            slug: Business slug.
            limit: Max results.

        Returns:
            Paginated list of past mystery shop results.
        """
        qs = self._build_query({
            "business_id": business_id,
            "slug": slug,
            "limit": limit,
        })
        return self._request("GET", f"/api/v1/mystery-shop{qs}")

    # ------------------------------------------------------------------
    # Webhooks
    # ------------------------------------------------------------------

    def subscribe_webhook(
        self,
        url: str,
        event_type: str,
        filters: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Subscribe to webhook events.

        Args:
            url: Endpoint URL to receive events.
            event_type: Event type to subscribe to.
            filters: Optional event filters.

        Returns:
            The created webhook subscription.
        """
        payload: Dict[str, Any] = {"url": url, "event_type": event_type}
        if filters is not None:
            payload["filters"] = filters
        return self._request("POST", "/api/v1/webhooks/subscribe", payload)

    def list_webhooks(self) -> Dict[str, Any]:
        """List all active webhook subscriptions.

        Returns:
            List of webhook subscriptions.
        """
        return self._request("GET", "/api/v1/webhooks/subscribe")

    def unsubscribe_webhook(self, id: str) -> Dict[str, Any]:
        """Unsubscribe from a webhook.

        Args:
            id: Webhook subscription ID to remove.

        Returns:
            Confirmation of deletion.
        """
        return self._request(
            "DELETE",
            f"/api/v1/webhooks/subscribe?id={quote(id, safe='')}",
        )

    # ------------------------------------------------------------------
    # Services
    # ------------------------------------------------------------------

    def get_services(self, slug: str) -> Dict[str, Any]:
        """List services for a business.

        Args:
            slug: Business slug.

        Returns:
            List of services.
        """
        return self._request(
            "GET",
            f"/api/v1/business/{quote(slug, safe='')}/services",
        )

    def create_service(
        self,
        slug: str,
        name: str,
        description: Optional[str] = None,
        pricing_model: Optional[str] = None,
        price_per_call: Optional[float] = None,
    ) -> Dict[str, Any]:
        """Create a new service for a business.

        Args:
            slug: Business slug.
            name: Service name.
            description: Service description.
            pricing_model: Pricing model (per_call, monthly, etc.).
            price_per_call: Price per API call in USD.

        Returns:
            The created service.
        """
        payload: Dict[str, Any] = {"name": name}
        if description is not None:
            payload["description"] = description
        if pricing_model is not None:
            payload["pricing_model"] = pricing_model
        if price_per_call is not None:
            payload["price_per_call"] = price_per_call
        return self._request(
            "POST",
            f"/api/v1/business/{quote(slug, safe='')}/services",
            payload,
        )

    def update_service(
        self,
        slug: str,
        service_id: str,
        data: Dict[str, Any],
    ) -> Dict[str, Any]:
        """Update an existing service.

        Args:
            slug: Business slug.
            service_id: Service UUID.
            data: Fields to update.

        Returns:
            The updated service.
        """
        return self._request(
            "PATCH",
            f"/api/v1/business/{quote(slug, safe='')}/services"
            f"?service_id={quote(service_id, safe='')}",
            data,
        )

    def delete_service(self, slug: str, service_id: str) -> Dict[str, Any]:
        """Delete a service from a business.

        Args:
            slug: Business slug.
            service_id: Service UUID.

        Returns:
            Confirmation of deletion.
        """
        return self._request(
            "DELETE",
            f"/api/v1/business/{quote(slug, safe='')}/services"
            f"?service_id={quote(service_id, safe='')}",
        )

    # ------------------------------------------------------------------
    # Business management
    # ------------------------------------------------------------------

    def update_business(self, slug: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Update a business profile.

        Args:
            slug: Business slug.
            data: Fields to update.

        Returns:
            The updated business.
        """
        return self._request(
            "PATCH",
            f"/api/v1/business/{quote(slug, safe='')}",
            data,
        )

    def create_api_key(
        self,
        slug: str,
        name: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Create a new API key for a business.

        Args:
            slug: Business slug.
            name: Optional name for the key.

        Returns:
            The created API key (value only shown once).
        """
        payload = {"name": name} if name else None
        return self._request(
            "POST",
            f"/api/v1/business/{quote(slug, safe='')}/api-keys",
            payload,
        )

    def list_api_keys(self, slug: str) -> Dict[str, Any]:
        """List API keys for a business (keys are masked).

        Args:
            slug: Business slug.

        Returns:
            List of API keys with masked values.
        """
        return self._request(
            "GET",
            f"/api/v1/business/{quote(slug, safe='')}/api-keys",
        )

    def revoke_api_key(self, slug: str, key_id: str) -> Dict[str, Any]:
        """Revoke an API key.

        Args:
            slug: Business slug.
            key_id: API key UUID to revoke.

        Returns:
            Confirmation of revocation.
        """
        return self._request(
            "DELETE",
            f"/api/v1/business/{quote(slug, safe='')}/api-keys"
            f"?key_id={quote(key_id, safe='')}",
        )

    def connect_stripe(self, slug: str) -> Dict[str, Any]:
        """Initiate Stripe Connect onboarding for a business.

        Args:
            slug: Business slug.

        Returns:
            Stripe Connect onboarding URL.
        """
        return self._request(
            "POST",
            f"/api/v1/business/{quote(slug, safe='')}/connect",
        )

    # ------------------------------------------------------------------
    # Certification (lookup)
    # ------------------------------------------------------------------

    def get_certification(self, slug: str) -> Dict[str, Any]:
        """Get the current certification status for a business.

        Args:
            slug: Business slug.

        Returns:
            Certification details or null if not certified.
        """
        qs = self._build_query({"slug": slug})
        return self._request("GET", f"/api/v1/certify{qs}")

    # ------------------------------------------------------------------
    # Hermes JSON
    # ------------------------------------------------------------------

    def generate_hermes_json(
        self,
        domain: Optional[str] = None,
        slug: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Generate a .well-known/agent-hermes.json file for a business.

        Args:
            domain: Domain to generate for.
            slug: Business slug (alternative to domain).

        Returns:
            Generated JSON content and deployment instructions.
        """
        payload: Dict[str, Any] = {}
        if domain is not None:
            payload["domain"] = domain
        if slug is not None:
            payload["slug"] = slug
        return self._request("POST", "/api/v1/hermes-json", payload)

    # ------------------------------------------------------------------
    # Health
    # ------------------------------------------------------------------

    def run_health_check(
        self,
        service_id: Optional[str] = None,
        url: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Run a health check on a service or URL.

        Args:
            service_id: Service UUID to check.
            url: URL to check (alternative to service_id).

        Returns:
            Health check results with latency.
        """
        payload: Dict[str, Any] = {}
        if service_id is not None:
            payload["service_id"] = service_id
        if url is not None:
            payload["url"] = url
        return self._request("POST", "/api/v1/health/check", payload)

    def get_health_status(
        self,
        business_id: Optional[str] = None,
        slug: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Get the health status overview for a business.

        Args:
            business_id: UUID of the business.
            slug: Business slug.

        Returns:
            Overall health status with per-service breakdown.
        """
        qs = self._build_query({
            "business_id": business_id,
            "slug": slug,
        })
        return self._request("GET", f"/api/v1/health/status{qs}")

    # ------------------------------------------------------------------
    # Monitoring
    # ------------------------------------------------------------------

    def trigger_monitoring(self) -> Dict[str, Any]:
        """Trigger a monitoring sweep across all registered businesses.

        Returns:
            Number of monitoring events created.
        """
        return self._request("POST", "/api/v1/monitoring")

    def get_monitoring_events(
        self,
        business_id: Optional[str] = None,
        severity: Optional[str] = None,
        limit: Optional[int] = None,
    ) -> Dict[str, Any]:
        """Get monitoring events, optionally filtered.

        Args:
            business_id: Filter by business UUID.
            severity: Filter by severity level.
            limit: Max results.

        Returns:
            Paginated list of monitoring events.
        """
        qs = self._build_query({
            "business_id": business_id,
            "severity": severity,
            "limit": limit,
        })
        return self._request("GET", f"/api/v1/monitoring{qs}")

    # ------------------------------------------------------------------
    # Semantic search
    # ------------------------------------------------------------------

    def semantic_search(
        self,
        q: str,
        limit: Optional[int] = None,
        threshold: Optional[float] = None,
    ) -> Dict[str, Any]:
        """Search businesses using natural language semantic matching.

        Args:
            q: Natural language query.
            limit: Max results.
            threshold: Minimum similarity threshold (0-1).

        Returns:
            Businesses ranked by semantic similarity.
        """
        qs = self._build_query({
            "q": q,
            "limit": limit,
            "threshold": threshold,
        })
        return self._request("GET", f"/api/v1/discover/semantic{qs}")

    # ------------------------------------------------------------------
    # Remediation
    # ------------------------------------------------------------------

    def generate_llms_txt(
        self,
        domain: str,
        name: str,
        description: str,
    ) -> Dict[str, Any]:
        """Generate an llms.txt file for a domain.

        Args:
            domain: Target domain.
            name: Business name.
            description: Business description.

        Returns:
            Generated llms.txt content and deployment instructions.
        """
        return self._request("POST", "/api/v1/remediate/llms-txt", {
            "domain": domain,
            "name": name,
            "description": description,
        })

    def generate_agent_card(
        self,
        domain: str,
        name: str,
        description: str,
    ) -> Dict[str, Any]:
        """Generate an A2A agent card for a domain.

        Args:
            domain: Target domain.
            name: Business name.
            description: Business description.

        Returns:
            Generated agent card JSON and deployment instructions.
        """
        return self._request("POST", "/api/v1/remediate/agent-card", {
            "domain": domain,
            "name": name,
            "description": description,
        })

    def generate_schema_org(
        self,
        domain: str,
        name: str,
        description: str,
        type: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Generate Schema.org structured data for a domain.

        Args:
            domain: Target domain.
            name: Business name.
            description: Business description.
            type: Schema.org type (e.g. ``"SoftwareApplication"``).

        Returns:
            Generated JSON-LD and deployment instructions.
        """
        payload: Dict[str, Any] = {
            "domain": domain,
            "name": name,
            "description": description,
        }
        if type is not None:
            payload["type"] = type
        return self._request("POST", "/api/v1/remediate/schema-org", payload)

    def generate_mcp_proxy(
        self,
        domain: str,
        name: str,
        api_base: str,
        endpoints: List[Dict[str, Any]],
    ) -> Dict[str, Any]:
        """Generate an MCP proxy configuration for a domain.

        Args:
            domain: Target domain.
            name: Business name.
            api_base: Base URL for the API.
            endpoints: List of endpoint definitions.

        Returns:
            Generated MCP proxy config and deployment instructions.
        """
        return self._request("POST", "/api/v1/remediate/mcp-proxy", {
            "domain": domain,
            "name": name,
            "api_base": api_base,
            "endpoints": endpoints,
        })

    # ------------------------------------------------------------------
    # Context manager / cleanup
    # ------------------------------------------------------------------

    def close(self) -> None:
        """Close the underlying HTTP client/session."""
        if _HTTP_BACKEND == "httpx":
            self._client.close()
        else:
            self._session.close()

    def __enter__(self) -> "AgentHermes":
        return self

    def __exit__(self, *args: Any) -> None:
        self.close()

    def __repr__(self) -> str:
        return f"AgentHermes(base_url={self._base_url!r})"
