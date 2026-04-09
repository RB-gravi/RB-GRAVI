/**
 * Server-side feature flag resolver.
 *
 * Reads raw env vars on the server and returns a plain object of resolved
 * booleans.  This module must never be imported by client components because
 * it accesses `process.env` directly.
 */

export interface FeatureFlags {
  enableNewFeature: boolean
  enableSecurityHardening: boolean
}

function resolveFlag(envValue: string | undefined): boolean {
  return envValue?.toLowerCase() === "true"
}

/**
 * Resolves all feature flags from environment variables.
 * Call this once per request in a Server Component (e.g. the root layout).
 */
export function resolveFeatureFlags(): FeatureFlags {
  return {
    enableNewFeature: resolveFlag(process.env.FEATURE_ENABLE_NEW_FEATURE),
    enableSecurityHardening: resolveFlag(
      process.env.FEATURE_ENABLE_SECURITY_HARDENING
    ),
  }
}
