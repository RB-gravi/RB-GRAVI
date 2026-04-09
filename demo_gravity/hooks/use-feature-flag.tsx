"use client"

import * as React from "react"
import type { FeatureFlags } from "@/lib/featureFlags"

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const FeatureFlagContext = React.createContext<FeatureFlags | null>(null)

// ---------------------------------------------------------------------------
// Provider – wraps the app tree in the root layout
// ---------------------------------------------------------------------------

export interface FeatureFlagProviderProps {
  flags: FeatureFlags
  children: React.ReactNode
}

export function FeatureFlagProvider({
  flags,
  children,
}: FeatureFlagProviderProps) {
  return (
    <FeatureFlagContext.Provider value={flags}>
      {children}
    </FeatureFlagContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Hook – consumed by client components
// ---------------------------------------------------------------------------

/**
 * Returns the resolved boolean value for the given feature flag.
 * Must be used inside a <FeatureFlagProvider>.
 */
export function useFeatureFlag(flag: keyof FeatureFlags): boolean {
  const context = React.useContext(FeatureFlagContext)
  if (!context) {
    throw new Error("useFeatureFlag must be used within a <FeatureFlagProvider>")
  }
  return context[flag]
}
