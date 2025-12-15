"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Upload, Save, Eye } from "lucide-react"

export default function MarketingDocsEditor() {
  const [activeDoc, setActiveDoc] = useState("product-brief")
  const [hasChanges, setHasChanges] = useState(false)

  const [docs, setDocs] = useState({
    "product-brief": {
      title: "Product Brief - Q1 2024 Feature Release",
      content: `# Product Brief: Q1 2024 Feature Release

## Executive Summary
This quarter we're launching three major features to improve user engagement and retention.

## Key Features

### 1. Advanced User Profiles
- Enhanced profile customization
- Bio sections for personal branding
- Skills and interests tagging

### 2. Smart Notifications
- Real-time activity updates
- Customizable notification preferences
- Mobile push integration

### 3. Collaboration Tools
- Team workspaces
- Shared document editing
- Comment and review system

## Target Audience
- Primary: Existing power users (25-45, professionals)
- Secondary: New enterprise customers

## Success Metrics
- User engagement: +25%
- Feature adoption: 60% within 30 days
- Customer satisfaction: 4.5+ rating

## Timeline
- Development: Jan 15 - Feb 28
- Beta testing: Mar 1 - Mar 15
- Public launch: Mar 20

## Competitive Analysis
Our main competitors lack integrated collaboration features, giving us a significant advantage in the enterprise market.`,
      lastModified: new Date().toISOString(),
    },
    "launch-plan": {
      title: "Go-to-Market Strategy",
      content: `# Go-to-Market Strategy: Q1 Feature Launch

## Launch Strategy
Multi-phase rollout starting with beta users, followed by general availability.

## Marketing Channels

### Pre-Launch (2 weeks before)
- Email campaign to existing users
- Blog post series highlighting benefits
- Social media teasers
- Influencer partnerships

### Launch Week
- Press release
- Product Hunt launch
- Webinar series
- Customer success stories

### Post-Launch (4 weeks after)
- Usage analytics review
- Customer feedback collection
- Feature optimization based on data

## Messaging Framework

### Primary Message
"Collaborate smarter, achieve more together"

### Key Benefits
- Streamlined workflows
- Enhanced team productivity
- Better project visibility

## Budget Allocation
- Paid advertising: $50k
- Content creation: $25k
- Events/webinars: $15k
- Influencer partnerships: $10k

## Success Metrics
- Website traffic: +40%
- Trial signups: +60%
- Conversion rate: 15%
- Social engagement: +100%`,
      lastModified: new Date().toISOString(),
    },
    "messaging-guide": {
      title: "Messaging & Positioning Guide",
      content: `# Messaging & Positioning Guide

## Brand Positioning
We are the productivity platform that makes collaboration effortless for modern teams.

## Value Proposition
Transform how your team works together with intelligent tools that adapt to your workflow.

## Key Messages

### For Individual Users
"Focus on what matters most while we handle the collaboration complexity"

### For Team Leaders
"Give your team the tools they need to succeed, with visibility you need to lead"

### For Enterprise
"Scale your collaboration without sacrificing security or control"

## Competitive Differentiation

### vs. Slack
- More structured project management
- Better file organization
- Advanced analytics

### vs. Asana
- More intuitive interface
- Better real-time collaboration
- Stronger communication features

### vs. Microsoft Teams
- Faster setup and onboarding
- More flexible customization
- Better mobile experience

## Tone of Voice
- Professional but approachable
- Confident without being arrogant
- Helpful and solution-oriented
- Clear and jargon-free

## Messaging Do's and Don'ts

### Do's
- Focus on outcomes, not features
- Use customer language
- Include social proof
- Be specific with benefits

### Don'ts
- Use technical jargon
- Make unsubstantiated claims
- Ignore competitor strengths
- Overwhelm with features`,
      lastModified: new Date().toISOString(),
    },
  })

  const handleContentChange = (docKey: string, newContent: string) => {
    setDocs((prev) => ({
      ...prev,
      [docKey]: {
        ...prev[docKey],
        content: newContent,
      },
    }))
    setHasChanges(true)
  }

  const saveDocument = async (docKey: string) => {
    // Save to file system
    const doc = docs[docKey]
    const response = await fetch("/api/save-doc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: `${docKey}.md`,
        content: doc.content,
        title: doc.title,
      }),
    })

    if (response.ok) {
      setDocs((prev) => ({
        ...prev,
        [docKey]: {
          ...prev[docKey],
          lastModified: new Date().toISOString(),
        },
      }))
      setHasChanges(false)

      // Show success message
      alert("Document saved! Check the change tracker for updates.")
    }
  }

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const content = await file.text()
    const docKey = file.name.replace(/\.[^/.]+$/, "")

    setDocs((prev) => ({
      ...prev,
      [docKey]: {
        title: file.name,
        content: content,
        lastModified: new Date().toISOString(),
      },
    }))

    // Auto-switch to the uploaded document
    setActiveDoc(docKey)

    alert(`✅ Uploaded "${file.name}"! You can now edit it and save to see change tracking.`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Marketing Documents Editor</h1>
          <p className="text-gray-600">Edit your marketing docs and watch change summaries generate automatically</p>
          <div className="flex items-center justify-center gap-4">
            <div className="relative">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Upload className="h-4 w-4 mr-2" />
                Upload Your Marketing Document
                <input
                  type="file"
                  accept=".md,.txt,.doc,.docx,.pdf"
                  onChange={uploadFile}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </Button>
            </div>
            <Button variant="outline" asChild>
              <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">
                <Eye className="h-4 w-4 mr-2" />
                View Change Tracker
              </a>
            </Button>
          </div>
        </div>

        {/* Document Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Document Editor</CardTitle>
            <CardDescription>
              Make changes to your marketing documents and save to trigger change tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeDoc} onValueChange={setActiveDoc}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="product-brief">Product Brief</TabsTrigger>
                <TabsTrigger value="launch-plan">Launch Plan</TabsTrigger>
                <TabsTrigger value="messaging-guide">Messaging Guide</TabsTrigger>
              </TabsList>

              {Object.entries(docs).map(([key, doc]) => (
                <TabsContent key={key} value={key} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{doc.title}</h3>
                      <p className="text-sm text-gray-500">
                        Last modified: {new Date(doc.lastModified).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      onClick={() => saveDocument(key)}
                      disabled={!hasChanges}
                      className="flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>

                  <Textarea
                    value={doc.content}
                    onChange={(e) => handleContentChange(key, e.target.value)}
                    className="min-h-[500px] font-mono text-sm"
                    placeholder="Start writing your marketing document..."
                  />
                </TabsContent>
              ))}
            </Tabs>

            {/* Uploaded Documents */}
            {Object.keys(docs).filter((key) => !["product-brief", "launch-plan", "messaging-guide"].includes(key))
              .length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Your Uploaded Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(docs)
                    .filter(([key]) => !["product-brief", "launch-plan", "messaging-guide"].includes(key))
                    .map(([key, doc]) => (
                      <Card
                        key={key}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setActiveDoc(key)}
                      >
                        <CardHeader>
                          <CardTitle className="text-sm">{doc.title}</CardTitle>
                          <CardDescription className="text-xs">
                            Last modified: {new Date(doc.lastModified).toLocaleString()}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              How to Use This Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">1. Start the Change Tracker</h4>
                <p className="text-sm text-gray-600 mb-2">Open a terminal and run:</p>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">npm run watch</code>
              </div>

              <div>
                <h4 className="font-medium mb-2">2. Make Document Changes</h4>
                <p className="text-sm text-gray-600">
                  Edit any of the marketing documents above and click "Save Changes" to trigger automatic change
                  detection.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">3. Try These Changes</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Add new features to the Product Brief</li>
                  <li>• Update pricing in the Launch Plan</li>
                  <li>• Modify messaging in the Messaging Guide</li>
                  <li>• Change target audience descriptions</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">4. View Change Summaries</h4>
                <p className="text-sm text-gray-600">
                  Visit the Change Tracker at{" "}
                  <a href="http://localhost:3001" className="text-blue-600 underline">
                    localhost:3001
                  </a>{" "}
                  to see automatically generated summaries of your changes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
