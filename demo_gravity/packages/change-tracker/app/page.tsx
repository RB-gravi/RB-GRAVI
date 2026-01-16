"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  Clock,
  Users,
  RefreshCw,
  Sparkles,
  Eye,
  Download,
  CheckCircle,
  TrendingUp,
  MessageSquare,
} from "lucide-react"

interface DocumentChange {
  id: string
  timestamp: string
  file: string
  fileName: string
  changeType: string
  changeCategory: string
  impact: string
  stakeholders: string[]
  summary: string
  actionItems: string[]
  addedLines: string[]
  removedLines: string[]
  totalChanges: number
}

export default function ChangeTracker() {
  const [changes, setChanges] = useState<DocumentChange[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadChanges = async () => {
    try {
      const response = await fetch("/api/changes")
      if (response.ok) {
        const data = await response.json()
        setChanges(data)
      }
    } catch (error) {
      console.error("Failed to load changes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadChanges()

    // Poll for updates every 3 seconds
    const interval = setInterval(loadChanges, 3000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const impactCounts = changes.reduce(
    (acc, change) => {
      const impactKey = change.impact.toLowerCase()
      if (impactKey === "high") acc.high += 1
      if (impactKey === "medium") acc.medium += 1
      if (impactKey === "low") acc.low += 1
      return acc
    },
    { high: 0, medium: 0, low: 0 }
  )

  const categoryCounts = changes.reduce<Record<string, number>>((acc, change) => {
    acc[change.changeCategory] = (acc[change.changeCategory] ?? 0) + 1
    return acc
  }, {})

  const topCategory =
    Object.entries(categoryCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ?? "No changes yet"

  const totalLineChanges = changes.reduce((total, change) => total + change.totalChanges, 0)

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "New Feature Addition":
        return <Sparkles className="h-4 w-4" />
      case "Pricing Update":
        return <TrendingUp className="h-4 w-4" />
      case "Timeline Update":
        return <Clock className="h-4 w-4" />
      case "Positioning Update":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const exportChange = (change: DocumentChange) => {
    const content = `# Change Summary: ${change.changeCategory}

**Document:** ${change.fileName}
**Date:** ${formatTime(change.timestamp)}
**Impact:** ${change.impact}

## Summary
${change.summary}

## Stakeholders to Notify
${change.stakeholders.map((s) => `- ${s}`).join("\n")}

## Action Items
${change.actionItems.map((item) => `- [ ] ${item}`).join("\n")}

## Changes Made
### Added Content
${change.addedLines.map((line) => `+ ${line}`).join("\n")}

### Removed Content
${change.removedLines.map((line) => `- ${line}`).join("\n")}
`

    const blob = new Blob([content], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `change-summary-${change.id}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Eye className="h-8 w-8 text-blue-600" />
            GraviTrack Change Tracker
          </h1>
          <p className="text-gray-600">Automatically track and summarize changes to your GraviTrack documents</p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Watching: marketing-docs/documents/
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Last updated: {changes.length > 0 ? formatTime(changes[0].timestamp) : "Never"}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <Button onClick={loadChanges} variant="outline" className="flex items-center gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Refresh Changes
          </Button>
          <Button variant="outline" asChild>
            <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">
              <FileText className="h-4 w-4 mr-2" />
              Edit Documents
            </a>
          </Button>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              Change Pulse
            </CardTitle>
            <CardDescription>Live insights across your GraviTrack marketing updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <p className="text-xs uppercase text-gray-500">High Impact Alerts</p>
                <p className="text-lg font-semibold text-gray-900">{impactCounts.high}</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <p className="text-xs uppercase text-gray-500">Total Change Events</p>
                <p className="text-lg font-semibold text-gray-900">{changes.length}</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <p className="text-xs uppercase text-gray-500">Most Active Category</p>
                <p className="text-base font-semibold text-gray-900">{topCategory}</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <p className="text-xs uppercase text-gray-500">Total Line Changes</p>
                <p className="text-lg font-semibold text-gray-900">{totalLineChanges}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        {changes.length === 0 && !isLoading && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>To see document change summaries:</p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  Start the document watcher: <code className="bg-gray-100 px-2 py-1 rounded">npm run watch</code>
                </li>
                <li>
                  Edit marketing documents at{" "}
                  <a href="http://localhost:3000" className="text-blue-600 underline">
                    localhost:3000
                  </a>
                </li>
                <li>
                  Try making these changes:
                  <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                    <li>Add new features to the Product Brief</li>
                    <li>Update pricing in the Launch Plan</li>
                    <li>Modify messaging in the Messaging Guide</li>
                    <li>Change target audience descriptions</li>
                  </ul>
                </li>
                <li>Save your changes and watch summaries appear here!</li>
              </ol>
            </CardContent>
          </Card>
        )}

        {/* Change Summaries */}
        {changes.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center">Document Changes ({changes.length})</h2>

            <div className="space-y-4">
              {changes.map((change) => (
                <Card key={change.id} className="relative">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="flex items-center gap-2">
                          {getCategoryIcon(change.changeCategory)}
                          {change.changeCategory}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <FileText className="h-3 w-3" />
                          {change.fileName} • {formatTime(change.timestamp)}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getImpactColor(change.impact)}>{change.impact} Impact</Badge>
                        <Badge variant="outline" className="text-xs">
                          {change.totalChanges} changes
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Summary */}
                    <div>
                      <h4 className="font-medium text-sm mb-1">Summary</h4>
                      <p className="text-sm text-gray-600">{change.summary}</p>
                    </div>

                    {/* Stakeholders */}
                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        Stakeholders to Notify
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {change.stakeholders.map((stakeholder, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {stakeholder}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Items */}
                    {change.actionItems.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Action Items
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {change.actionItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-blue-500 mt-0.5">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Separator />

                    {/* Changes Preview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {change.addedLines.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-1 text-green-700">Added Content</h4>
                          <div className="bg-green-50 p-2 rounded text-xs space-y-1 max-h-20 overflow-y-auto">
                            {change.addedLines.map((line, i) => (
                              <div key={i} className="text-green-800">
                                + {line}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {change.removedLines.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-1 text-red-700">Removed Content</h4>
                          <div className="bg-red-50 p-2 rounded text-xs space-y-1 max-h-20 overflow-y-auto">
                            {change.removedLines.map((line, i) => (
                              <div key={i} className="text-red-800">
                                - {line}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
                      <span>Change ID: {change.id}</span>
                      <Button size="sm" variant="ghost" onClick={() => exportChange(change)} className="h-6 px-2">
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
