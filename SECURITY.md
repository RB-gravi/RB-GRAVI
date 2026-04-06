# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Do not open a public GitHub issue for security vulnerabilities.**

Instead, please email the maintainers directly or use GitHub's
[private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability)
feature for this repository.

Please include:
- A description of the vulnerability
- Steps to reproduce the issue
- The potential impact
- Any suggested mitigation or fix

We aim to acknowledge reports within **48 hours** and provide a resolution timeline within **7 days**.

---

## Security Measures

### HTTP Security Headers

All Next.js applications in this repository set the following HTTP response headers on every route:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-type sniffing attacks |
| `X-Frame-Options` | `DENY` | Prevents clickjacking by disallowing framing |
| `X-XSS-Protection` | `1; mode=block` | Enables browser's built-in XSS filter |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limits referrer information leakage |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=()` | Restricts access to sensitive browser APIs |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Enforces HTTPS connections |
| `Content-Security-Policy` | See below | Restricts resource loading to same origin |

**Content Security Policy:**

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:;
font-src 'self';
connect-src 'self';
frame-ancestors 'none';
```

> **Note:** `unsafe-inline` and `unsafe-eval` are currently required by Next.js's
> client-side hydration. In a production deployment, these should be replaced
> with nonce-based or hash-based CSP directives.

### Input Validation

The `/api/save-doc` endpoint performs the following validation before writing to disk:

- **Filename sanitization:** Only alphanumeric characters and `._-` are allowed; path
  traversal sequences (`..`, absolute paths) are rejected with HTTP 400.
- **Content type check:** Content must be a string; non-string values are rejected with HTTP 400.
- **Content size limit:** Documents larger than 100,000 characters are rejected with HTTP 413.
- **Title validation:** Title must be a string and is truncated to 200 characters to prevent
  oversized metadata.

### Rate Limiting

The `POST /api/save-doc` endpoint enforces an in-memory rate limit of **20 requests per IP per
minute**. Requests exceeding this limit receive an HTTP 429 response. This protects the server
from file-system abuse and denial-of-service via rapid document writes.

---

## Supported Versions

| Version | Supported |
|---------|-----------|
| `main` branch | ✅ Yes |
| Older branches | ❌ No |
