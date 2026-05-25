"use client"

import { useMemo, useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export function ROICalculator() {
  const [releasesPerMonth, setReleasesPerMonth] = useState(6)
  const [contributorsPerRelease, setContributorsPerRelease] = useState(5)
  const [hourlyCost, setHourlyCost] = useState(95)

  const model = useMemo(() => {
    const monthlyHoursSaved = releasesPerMonth * contributorsPerRelease * 2.2
    const yearlyHoursSaved = monthlyHoursSaved * 12
    const yearlySavings = yearlyHoursSaved * hourlyCost

    return {
      monthlyHoursSaved,
      yearlyHoursSaved,
      yearlySavings,
    }
  }, [contributorsPerRelease, hourlyCost, releasesPerMonth])

  return (
    <Card className="border-primary/20 bg-card/80">
      <CardHeader>
        <CardTitle>Launch ROI Calculator</CardTitle>
        <CardDescription>
          Estimate time and budget recovered when release communications are automated and standardized.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="releases-per-month">Releases per month</Label>
            <span className="text-sm font-medium">{releasesPerMonth}</span>
          </div>
          <Slider
            id="releases-per-month"
            min={1}
            max={20}
            step={1}
            value={[releasesPerMonth]}
            onValueChange={(value) => setReleasesPerMonth(value[0] ?? 1)}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="contributors-per-release">Contributors per release</Label>
            <span className="text-sm font-medium">{contributorsPerRelease}</span>
          </div>
          <Slider
            id="contributors-per-release"
            min={2}
            max={20}
            step={1}
            value={[contributorsPerRelease]}
            onValueChange={(value) => setContributorsPerRelease(value[0] ?? 2)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hourly-cost">Blended hourly team cost (USD)</Label>
          <Input
            id="hourly-cost"
            type="number"
            min={25}
            step={5}
            value={hourlyCost}
            onChange={(event) => setHourlyCost(Number(event.target.value) || 0)}
          />
        </div>

        <div className="grid gap-3 rounded-lg border bg-background p-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-muted-foreground">Hours saved / month</p>
            <p className="text-2xl font-semibold text-primary">{Math.round(model.monthlyHoursSaved)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Hours saved / year</p>
            <p className="text-2xl font-semibold text-primary">{Math.round(model.yearlyHoursSaved)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Estimated yearly savings</p>
            <p className="text-2xl font-semibold text-primary">{currency(model.yearlySavings)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
