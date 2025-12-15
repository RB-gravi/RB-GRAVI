"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FileText, Clock, Target, Users, MessageSquare, RefreshCw, Sparkles, Eye, Download } from "lucide-react"

interface MarketingSpec {
  timestamp: string
  file: string
  changeType: string
  title: string
  summary: string
  benefits: string[]
  targetAudience: string
  affectedAreas: string[]
  releaseType: string
  suggestedMessaging: string
  impact: string
  effort: string
}

export default function SpecGeneratorDashboard() {
  const [specs, setSpecs] = useState<MarketingSpec[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadSpecs = async () => {
    try {
      const response = await fetch("/api/specs")
      if (response.ok) {
        const data = await response.json()
        setSpecs(data)
      }
    } catch (error) {
      console.error("Failed to load specs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadSpecs()

    // Poll for updates every 5 seconds
    const interval = setInterval(loadSpecs, 5000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const exportSpec = (spec: MarketingSpec) => {
    const content = `# ${spec.title}

**Generated:** ${formatTime(spec.timestamp)}
**File:** ${spec.file}
**Impact:** ${spec.impact}

## Summary
${spec.summary}

## Benefits
${spec.benefits.map((benefit) => `- ${benefit}`).join("\n")}

## Target Audience
${spec.targetAudience}

## Affected Areas
${spec.affectedAreas.join(", ")}

## Release Type
${spec.releaseType}

## Suggested Messaging
"${spec.suggestedMessaging}"
`

    const blob = new Blob([content], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${spec.title.replace(/\s+/g, "-").toLowerCase()}-spec.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-purple-600" />
            Marketing Spec Generator
          </h1>
          <p className="text-gray-600">Automatically generated product marketing specs from code changes</p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              Watching: packages/sample-app/
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Last updated: {specs.length > 0 ? formatTime(specs[0].timestamp) : "Never"}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center">
          <Button onClick={loadSpecs} variant="outline" className="flex items-center gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Refresh Specs
          </Button>
        </div>

        {/* Instructions */}
        {specs.length === 0 && !isLoading && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>To see marketing specs generated automatically:</p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  Open a terminal and run: <code className="bg-gray-100 px-2 py-1 rounded">npm run watch</code>
                </li>
                <li>
                  In another terminal, edit files in{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded">packages/sample-app/</code>
                </li>
                <li>
                  Try adding features like:
                  <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                    <li>Add "bio" field to UserProfile.tsx</li>
                    <li>Add "filter" functionality to SearchBar.tsx</li>
                    <li>Add "notification" system to Dashboard.tsx</li>
                  </ul>
                </li>
                <li>Watch as marketing specs are automatically generated!</li>
              </ol>
            </CardContent>
          </Card>
        )}

        {/* Generated Specs */}
        {specs.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center">Generated Marketing Specs ({specs.length})</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {specs.map((spec, index) => (
                <Card key={index} className="relative">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-purple-600" />
                          {spec.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <FileText className="h-3 w-3" />
                          {spec.file}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getImpactColor(spec.impact)}>{spec.impact} Impact</Badge>
                        <Badge variant="outline" className="text-xs">
                          {spec.changeType}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Summary */}
                    <div>
                      <h4 className="font-medium text-sm mb-1">Summary</h4>
                      <p className="text-sm text-gray-600">{spec.summary}</p>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-medium text-sm mb-1">Key Benefits</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {spec.benefits.slice(0, 2).map((benefit, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-green-500 mt-0.5">•</span>
                            {benefit}
                          </li>
                        ))}
                        {spec.benefits.length > 2 && (
                          <li className="text-xs text-gray-400">+{spec.benefits.length - 2} more benefits</li>
                        )}
                      </ul>
                    </div>

                    {/* Target Audience */}
                    <div>
                      <h4 className="font-medium text-sm mb-1 flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        Target Audience
                      </h4>
                      <p className="text-sm text-gray-600">{spec.targetAudience}</p>
                    </div>

                    <Separator />

                    {/* Marketing Message */}
                    <div>
                      <h4 className="font-medium text-sm mb-1 flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        Suggested Messaging
                      </h4>
                      <div className="bg-blue-50 p-2 rounded text-sm italic border-l-2 border-blue-400">
                        "{spec.suggestedMessaging}"
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
                      <span>{formatTime(spec.timestamp)}</span>
                      <Button size="sm" variant="ghost" onClick={() => exportSpec(spec)} className="h-6 px-2">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
