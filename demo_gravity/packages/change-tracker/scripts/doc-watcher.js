const chokidar = require("chokidar")
const fs = require("fs")
const path = require("path")
const diff = require("diff")

// Watch the marketing docs directory
const watchPath = path.join(__dirname, "../../marketing-docs/documents")
const changesPath = path.join(__dirname, "../app/data/changes.json")

// Store previous versions of files
const fileVersions = new Map()

// Ensure directories exist
if (!fs.existsSync(watchPath)) {
  fs.mkdirSync(watchPath, { recursive: true })
}

const dataDir = path.dirname(changesPath)
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

console.log("📄 Watching for marketing document changes...")
console.log("📁 Watching:", watchPath)
console.log("💾 Changes saved to:", changesPath)

// Initialize watcher
const watcher = chokidar.watch(watchPath, {
  ignored: ["**/*.meta.json", "**/node_modules/**", "**/.git/**"],
  persistent: true,
})

// Function to analyze document changes
function analyzeDocumentChange(filePath, content, changeType) {
  const fileName = path.basename(filePath)
  const relativePath = path.relative(watchPath, filePath)

  // Get previous version if it exists
  const previousContent = fileVersions.get(filePath) || ""

  // Calculate diff
  const changes = diff.diffLines(previousContent, content)
  const addedLines = changes
    .filter((change) => change.added)
    .map((change) => change.value.trim())
    .filter(Boolean)
  const removedLines = changes
    .filter((change) => change.removed)
    .map((change) => change.value.trim())
    .filter(Boolean)

  // Store current version
  fileVersions.set(filePath, content)

  // Analyze the type of changes
  const changeAnalysis = analyzeMarketingChanges(fileName, content, addedLines, removedLines)

  const changeSummary = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    file: relativePath,
    fileName: fileName,
    changeType: changeType,
    ...changeAnalysis,
    addedLines: addedLines.slice(0, 5), // Keep first 5 for display
    removedLines: removedLines.slice(0, 5),
    totalChanges: addedLines.length + removedLines.length,
  }

  // Save the change
  saveChange(changeSummary)

  console.log(`\n✨ Document change detected: ${fileName}`)
  console.log(`📝 Change type: ${changeSummary.changeCategory}`)
  console.log(`🎯 Impact: ${changeSummary.impact}`)
  console.log(`👥 Stakeholders: ${changeSummary.stakeholders.join(", ")}`)

  return changeSummary
}

function analyzeMarketingChanges(fileName, content, addedLines, removedLines) {
  const contentLower = content.toLowerCase()
  const addedText = addedLines.join(" ").toLowerCase()
  const removedText = removedLines.join(" ").toLowerCase()

  let changeCategory = "Content Update"
  let impact = "Low"
  let stakeholders = ["Marketing Team"]
  let summary = "Document content has been updated"
  let actionItems = []

  // Analyze based on file type
  if (fileName.includes("brief") || fileName.includes("product")) {
    stakeholders = ["Product Team", "Marketing Team", "Engineering"]

    if (addedText.includes("feature") || addedText.includes("functionality")) {
      changeCategory = "New Feature Addition"
      impact = "High"
      summary = "New product features have been added to the brief"
      actionItems = ["Update technical documentation", "Review development timeline", "Prepare feature announcement"]
    } else if (addedText.includes("timeline") || addedText.includes("date") || addedText.includes("launch")) {
      changeCategory = "Timeline Update"
      impact = "Medium"
      summary = "Product timeline or launch dates have been modified"
      actionItems = ["Notify development team", "Update marketing calendar", "Adjust campaign schedules"]
    } else if (addedText.includes("metric") || addedText.includes("goal") || addedText.includes("target")) {
      changeCategory = "Success Metrics Update"
      impact = "Medium"
      summary = "Success metrics or targets have been updated"
      actionItems = ["Update analytics tracking", "Inform stakeholders of new targets", "Adjust measurement strategy"]
    }
  } else if (fileName.includes("launch") || fileName.includes("gtm") || fileName.includes("go-to-market")) {
    stakeholders = ["Marketing Team", "Sales Team", "Customer Success"]

    if (addedText.includes("budget") || addedText.includes("cost") || addedText.includes("$")) {
      changeCategory = "Budget Update"
      impact = "High"
      summary = "Marketing budget or cost allocations have been modified"
      actionItems = ["Get budget approval", "Update financial forecasts", "Adjust campaign spending"]
    } else if (addedText.includes("channel") || addedText.includes("campaign") || addedText.includes("advertising")) {
      changeCategory = "Marketing Strategy Update"
      impact = "Medium"
      summary = "Marketing channels or campaign strategy has been updated"
      actionItems = ["Update campaign briefs", "Coordinate with creative team", "Adjust media planning"]
    } else if (addedText.includes("audience") || addedText.includes("target") || addedText.includes("segment")) {
      changeCategory = "Audience Targeting Update"
      impact = "High"
      summary = "Target audience or segmentation strategy has been modified"
      actionItems = ["Update buyer personas", "Adjust messaging strategy", "Review campaign targeting"]
    }
  } else if (fileName.includes("messaging") || fileName.includes("positioning")) {
    stakeholders = ["Marketing Team", "Sales Team", "Customer Success", "Content Team"]

    if (
      addedText.includes("value prop") ||
      addedText.includes("positioning") ||
      addedText.includes("differentiation")
    ) {
      changeCategory = "Positioning Update"
      impact = "High"
      summary = "Brand positioning or value proposition has been updated"
      actionItems = ["Update all marketing materials", "Train sales team on new messaging", "Revise website copy"]
    } else if (addedText.includes("competitor") || addedText.includes("competitive")) {
      changeCategory = "Competitive Analysis Update"
      impact = "Medium"
      summary = "Competitive analysis or differentiation points have been updated"
      actionItems = ["Update sales battlecards", "Revise competitive content", "Brief customer-facing teams"]
    } else if (addedText.includes("tone") || addedText.includes("voice") || addedText.includes("messaging")) {
      changeCategory = "Brand Voice Update"
      impact = "Medium"
      summary = "Brand voice or messaging guidelines have been updated"
      actionItems = ["Update style guide", "Brief content creators", "Review existing content"]
    }
  }

  // Check for pricing changes
  if (addedText.includes("price") || addedText.includes("pricing") || addedText.includes("cost")) {
    changeCategory = "Pricing Update"
    impact = "High"
    stakeholders = ["Marketing Team", "Sales Team", "Finance", "Leadership"]
    summary = "Pricing information or strategy has been updated"
    actionItems = ["Update pricing pages", "Notify sales team immediately", "Prepare customer communication"]
  }

  // Check for launch date changes
  if (addedText.includes("launch") && (addedText.includes("date") || addedText.includes("timeline"))) {
    impact = "High"
    stakeholders.push("Leadership", "Engineering")
  }

  return {
    changeCategory,
    impact,
    stakeholders: [...new Set(stakeholders)], // Remove duplicates
    summary,
    actionItems,
  }
}

function saveChange(changeSummary) {
  let changes = []

  try {
    if (fs.existsSync(changesPath)) {
      const existing = fs.readFileSync(changesPath, "utf8")
      changes = JSON.parse(existing)
    }
  } catch (error) {
    console.log("Starting with empty changes array")
  }

  // Add new change to the beginning
  changes.unshift(changeSummary)

  // Keep only the latest 20 changes
  changes = changes.slice(0, 20)

  try {
    fs.writeFileSync(changesPath, JSON.stringify(changes, null, 2))
  } catch (error) {
    console.error("❌ Failed to save change to disk:", error)
  }
}

// Watch for file changes
watcher
  .on("change", (filePath) => {
    console.log(`\n📝 Document modified: ${path.relative(watchPath, filePath)}`)

    try {
      const content = fs.readFileSync(filePath, "utf8")
      analyzeDocumentChange(filePath, content, "modified")
    } catch (error) {
      console.error("Error reading file:", error)
    }
  })
  .on("add", (filePath) => {
    console.log(`\n➕ New document: ${path.relative(watchPath, filePath)}`)

    try {
      const content = fs.readFileSync(filePath, "utf8")
      analyzeDocumentChange(filePath, content, "added")
    } catch (error) {
      console.error("Error reading file:", error)
    }
  })
  .on("unlink", (filePath) => {
    console.log(`\n🗑️  Document deleted: ${path.relative(watchPath, filePath)}`)
    fileVersions.delete(filePath)
  })

console.log("\n🚀 Document watcher is running!")
console.log("💡 Edit marketing documents to see change summaries generated automatically")
console.log("🌐 View change summaries at http://localhost:3001")

// Handle watcher errors
watcher.on("error", (error) => {
  console.error("❌ Watcher error:", error)
})

// Graceful shutdown
function shutdown() {
  console.log("\n🛑 Shutting down document watcher...")
  watcher.close().then(() => {
    console.log("✅ Watcher closed.")
    process.exit(0)
  }).catch((error) => {
    console.error("❌ Error closing watcher:", error)
    process.exit(1)
  })
}

process.on("SIGTERM", shutdown)
process.on("SIGINT", shutdown)
