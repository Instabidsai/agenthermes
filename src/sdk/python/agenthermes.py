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

    def scan_v2(self, url: str) -> Dict[str, Any]:
        """Alias for :meth:`scan` -- runs the 9-dimension scanner."""
        return self.scan(url)

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
