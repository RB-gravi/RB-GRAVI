"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  GitBranch,
  GitCommit,
  FileText,
  Folder,
  Clock,
  Target,
  MessageSquare,
  Bell,
  Eye,
  GitPullRequest,
  Sparkles,
  Search,
} from "lucide-react"

interface FileNode {
  name: string
  type: "file" | "folder"
  content?: string
  children?: FileNode[]
}

interface Commit {
  id: string
  message: string
  author: string
  timestamp: string
  files: string[]
  diff: string
  marketingSpec?: MarketingSpec
}

interface MarketingSpec {
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

const initialRepo: FileNode = {
  name: "acme-saas-app",
  type: "folder",
  children: [
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "components",
          type: "folder",
          children: [
            {
              name: "user-profile.tsx",
              type: "file",
              content: `export const UserProfile = () => {
  const user = useCurrentUser();
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};`,
            },
            {
              name: "search-bar.tsx",
              type: "file",
              content: `export const SearchBar = () => {
  const [query, setQuery] = useState("");
  
  return (
    <input 
      value={query} 
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
};`,
            },
          ],
        },
        {
          name: "pages",
          type: "folder",
          children: [
            {
              name: "dashboard.tsx",
              type: "file",
              content: `export const Dashboard = () => {
  const { data } = useAnalytics();
  
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <AnalyticsChart data={data} />
    </div>
  );
};`,
            },
          ],
        },
      ],
    },
    {
      name: "README.md",
      type: "file",
      content: "# Acme SaaS App\n\nA modern SaaS application built with React and TypeScript.",
    },
  ],
}

const sampleCommits: Commit[] = [
  {
    id: "abc123",
    message: "Add user bio editing functionality",
    author: "sarah.dev",
    timestamp: "2 minutes ago",
    files: ["src/components/user-profile.tsx"],
    diff: `@@ -2,6 +2,12 @@ export const UserProfile = () => {
   const user = useCurrentUser();
   
+  const [bio, setBio] = useState(user.bio || "");
+  
+  const handleBioChange = (e) => {
+    setBio(e.target.value);
+  };
+
   return (
     <div>
       <h1>{user.name}</h1>
       <p>{user.email}</p>
+      <textarea
+        value={bio}
+        onChange={handleBioChange}
+        placeholder="Tell us about yourself..."
+      />
     </div>
   );`,
    marketingSpec: {
      title: "Editable User Bios",
      summary:
        "Users can now edit their personal bio directly on their profile page, allowing them to share information about themselves with others on the platform.",
      benefits: [
        "Improves personalization and user expression",
        "Enhances networking and trust-building",
        "Increases profile completion rates",
      ],
      targetAudience: "All signed-in users with public profiles",
      affectedAreas: ["Profile Page", "User Settings"],
      releaseType: "Minor feature enhancement",
      suggestedMessaging: "Your story, your space. Add a personal bio to your profile and tell the world who you are!",
      impact: "Medium",
      effort: "Low",
    },
  },
]

export default function AutoMarketingSpecRepo() {
  const [activeTab, setActiveTab] = useState("code")
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)
  const [commits, setCommits] = useState<Commit[]>(sampleCommits)
  const [isCommitting, setIsCommitting] = useState(false)
  const [commitMessage, setCommitMessage] = useState("")
  const [editedContent, setEditedContent] = useState("")
  const [hasChanges, setHasChanges] = useState(false)
  const [notifications, setNotifications] = useState<string[]>([])
  const [fileSearch, setFileSearch] = useState("")

  useEffect(() => {
    if (selectedFile?.content) {
      setEditedContent(selectedFile.content)
    }
  }, [selectedFile])

  const renderFileTree = (node: FileNode, depth = 0) => {
    return (
      <div key={node.name} style={{ marginLeft: depth * 16 }}>
        <div
          className={`flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-gray-100 ${
            selectedFile?.name === node.name ? "bg-blue-50" : ""
          }`}
          onClick={() => node.type === "file" && setSelectedFile(node)}
        >
          {node.type === "folder" ? (
            <Folder className="h-4 w-4 text-blue-600" />
          ) : (
            <FileText className="h-4 w-4 text-gray-600" />
          )}
          <span className="text-sm">{node.name}</span>
        </div>
        {node.children?.map((child) => renderFileTree(child, depth + 1))}
      </div>
    )
  }

  const filterFileTree = (node: FileNode, query: string): FileNode | null => {
    if (!query) return node

    const matches = node.name.toLowerCase().includes(query)

    if (node.type === "file") {
      return matches ? node : null
    }

    const filteredChildren = node.children
      ?.map((child) => filterFileTree(child, query))
      .filter((child): child is FileNode => child !== null)

    if (matches || (filteredChildren && filteredChildren.length > 0)) {
      return {
        ...node,
        children: filteredChildren ?? [],
      }
    }

    return null
  }

  const handleContentChange = (value: string) => {
    setEditedContent(value)
    setHasChanges(value !== selectedFile?.content)
  }

  const simulateCommit = async () => {
    if (!commitMessage.trim() || !hasChanges) return

    setIsCommitting(true)

    // Simulate commit processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate fake diff
    const diff = `@@ -1,3 +1,8 @@
 export const UserProfile = () => {
   const user = useCurrentUser();
   
+  const [notifications, setNotifications] = useState([]);
+  
+  useEffect(() => {
+    fetchUserNotifications().then(setNotifications);
+  }, []);
+
   return (
     <div>
       <h1>{user.name}</h1>`

    // Auto-generate marketing spec
    const newMarketingSpec: MarketingSpec = {
      title: "Real-time Notifications",
      summary:
        "Users now receive instant notifications about important updates, messages, and activity on their account.",
      benefits: [
        "Keeps users engaged with timely updates",
        "Reduces missed opportunities and messages",
        "Improves overall user experience and retention",
      ],
      targetAudience: "All active users",
      affectedAreas: ["Dashboard", "Profile Page", "Mobile App"],
      releaseType: "Major feature addition",
      suggestedMessaging: "Stay in the loop! Get instant notifications for everything that matters to you.",
      impact: "High",
      effort: "Medium",
    }

    const newCommit: Commit = {
      id: Math.random().toString(36).substr(2, 6),
      message: commitMessage,
      author: "you",
      timestamp: "just now",
      files: [selectedFile?.name || "unknown"],
      diff,
      marketingSpec: newMarketingSpec,
    }

    setCommits([newCommit, ...commits])
    setCommitMessage("")
    setHasChanges(false)
    setIsCommitting(false)

    // Add notification
    setNotifications((prev) => [...prev, `🎉 Marketing spec auto-generated for: ${newCommit.message}`])

    // Auto-switch to commits tab to show the result
    setTimeout(() => setActiveTab("commits"), 500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                <span className="font-semibold">acme-org/saas-app</span>
              </div>
              <Badge variant="secondary">main</Badge>
            </div>
            <div className="flex items-center gap-2">
              {notifications.length > 0 && (
                <div className="relative">
                  <Bell className="h-5 w-5 text-orange-500" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {notifications.length}
                  </span>
                </div>
              )}
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                Watch
              </Button>
              <Button variant="outline" size="sm">
                <GitPullRequest className="h-4 w-4 mr-1" />
                Pull Request
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="bg-green-50 border-b border-green-200">
          <div className="max-w-7xl mx-auto px-4 py-2">
            {notifications.map((notification, index) => (
              <div key={index} className="flex items-center gap-2 text-green-800 text-sm">
                <Sparkles className="h-4 w-4" />
                {notification}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="code">
              <FileText className="h-4 w-4 mr-2" />
              Code
            </TabsTrigger>
            <TabsTrigger value="commits">
              <GitCommit className="h-4 w-4 mr-2" />
              Commits ({commits.length})
            </TabsTrigger>
            <TabsTrigger value="marketing">
              <MessageSquare className="h-4 w-4 mr-2" />
              Marketing Specs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* File Tree */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Files</CardTitle>
                  <CardDescription>Search by filename to quickly locate files.</CardDescription>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search files..."
                      value={fileSearch}
                      onChange={(event) => setFileSearch(event.target.value)}
                      className="pl-8"
                      aria-label="Search files"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const filteredRepo = filterFileTree(initialRepo, fileSearch.trim().toLowerCase())
                    if (!filteredRepo) {
                      return <p className="text-sm text-muted-foreground">No files match your search.</p>
                    }
                    return renderFileTree(filteredRepo)
                  })()}
                </CardContent>
              </Card>

              {/* Code Editor */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center justify-between">
                    {selectedFile?.name || "Select a file"}
                    {hasChanges && (
                      <Badge variant="outline" className="text-orange-600">
                        Modified
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedFile ? (
                    <div className="space-y-4">
                      <Textarea
                        value={editedContent}
                        onChange={(e) => handleContentChange(e.target.value)}
                        className="font-mono text-sm min-h-[300px]"
                      />

                      {hasChanges && (
                        <div className="space-y-2">
                          <Input
                            placeholder="Commit message (e.g., 'Add notification system')"
                            value={commitMessage}
                            onChange={(e) => setCommitMessage(e.target.value)}
                          />
                          <Button
                            onClick={simulateCommit}
                            disabled={isCommitting || !commitMessage.trim()}
                            className="w-full"
                          >
                            {isCommitting ? (
                              <>
                                <Clock className="h-4 w-4 mr-2 animate-spin" />
                                Committing & Generating Marketing Spec...
                              </>
                            ) : (
                              <>
                                <GitCommit className="h-4 w-4 mr-2" />
                                Commit Changes
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-gray-500">
                      Select a file to edit
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="commits" className="space-y-4">
            <div className="space-y-4">
              {commits.map((commit) => (
                <Card key={commit.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <GitCommit className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{commit.message}</div>
                          <div className="text-sm text-gray-500">
                            {commit.author} • {commit.timestamp}
                          </div>
                        </div>
                      </div>
                      {commit.marketingSpec && (
                        <Badge className="bg-green-100 text-green-800">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Auto-Generated Spec
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Code Diff */}
                      <div>
                        <h4 className="font-medium mb-2">Code Changes</h4>
                        <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">{commit.diff}</pre>
                      </div>

                      {/* Auto-Generated Marketing Spec */}
                      {commit.marketingSpec && (
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-green-600" />
                            Auto-Generated Marketing Spec
                          </h4>
                          <div className="bg-green-50 p-3 rounded space-y-3 text-sm">
                            <div>
                              <strong>Feature:</strong> {commit.marketingSpec.title}
                            </div>
                            <div>
                              <strong>Summary:</strong> {commit.marketingSpec.summary}
                            </div>
                            <div>
                              <strong>Impact:</strong>
                              <Badge variant="outline" className="ml-2">
                                {commit.marketingSpec.impact}
                              </Badge>
                            </div>
                            <div>
                              <strong>Suggested Messaging:</strong>
                              <div className="italic mt-1 p-2 bg-white rounded">
                                "{commit.marketingSpec.suggestedMessaging}"
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="marketing" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {commits
                .filter((commit) => commit.marketingSpec)
                .map((commit) => (
                  <Card key={commit.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        {commit.marketingSpec!.title}
                      </CardTitle>
                      <CardDescription>Generated from: {commit.message}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Summary</h4>
                        <p className="text-sm text-gray-600">{commit.marketingSpec!.summary}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-1">Benefits</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {commit.marketingSpec!.benefits.map((benefit, index) => (
                            <li key={index}>• {benefit}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-2">
                        <Badge variant="outline">{commit.marketingSpec!.impact} Impact</Badge>
                        <Badge variant="outline">{commit.marketingSpec!.effort} Effort</Badge>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium mb-1">Marketing Message</h4>
                        <div className="bg-blue-50 p-2 rounded text-sm italic">
                          "{commit.marketingSpec!.suggestedMessaging}"
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
