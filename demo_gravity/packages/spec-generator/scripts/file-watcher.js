const chokidar = require("chokidar")
const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

// Watch the sample app directory
const watchPath = path.join(__dirname, "../../sample-app")
const specsPath = path.join(__dirname, "../generated-specs")

// Ensure specs directory exists
if (!fs.existsSync(specsPath)) {
  fs.mkdirSync(specsPath, { recursive: true })
}

console.log("🔍 Watching for file changes in sample-app...")
console.log("📁 Specs will be generated in:", specsPath)

// Initialize watcher
const watcher = chokidar.watch(watchPath, {
  ignored: ["**/node_modules/**", "**/.next/**", "**/.git/**", "**/package-lock.json"],
  persistent: true,
})

// Function to generate marketing spec
function generateMarketingSpec(filePath, changeType) {
  const fileName = path.basename(filePath)
  const relativePath = path.relative(watchPath, filePath)

  // Read the file content
  let content = ""
  try {
    content = fs.readFileSync(filePath, "utf8")
  } catch (error) {
    console.log("Could not read file:", error.message)
    return
  }

  // Analyze the change and generate spec
  const spec = analyzeCodeChange(fileName, content, changeType, relativePath)

  // Save the spec
  const specFileName = `${fileName.replace(/\.[^/.]+$/, "")}-${Date.now()}.json`
  const specFilePath = path.join(specsPath, specFileName)

  fs.writeFileSync(specFilePath, JSON.stringify(spec, null, 2))

  console.log(`\n✨ Generated marketing spec: ${specFileName}`)
  console.log(`📄 File: ${relativePath}`)
  console.log(`🎯 Feature: ${spec.title}`)
  console.log(`💡 Impact: ${spec.impact}`)

  // Also update the latest specs for the web interface
  updateLatestSpecs(spec)
}

function analyzeCodeChange(fileName, content, changeType, relativePath) {
  // Simple analysis based on file content and name
  let spec = {
    timestamp: new Date().toISOString(),
    file: relativePath,
    changeType: changeType,
    title: "Code Update",
    summary: "Code changes detected",
    benefits: [],
    targetAudience: "All users",
    affectedAreas: [],
    releaseType: "Minor update",
    suggestedMessaging: "We've made improvements to enhance your experience.",
    impact: "Low",
    effort: "Low",
  }

  // Analyze based on file name and content
  if (fileName.includes("UserProfile")) {
    if (content.includes("bio") || content.includes("Bio")) {
      spec = {
        ...spec,
        title: "Editable User Bios",
        summary:
          "Users can now edit their personal bio directly on their profile page, allowing them to share information about themselves with others.",
        benefits: [
          "Improves personalization and user expression",
          "Enhances networking and trust-building",
          "Increases profile completion rates",
        ],
        targetAudience: "All signed-in users with public profiles",
        affectedAreas: ["Profile Page", "User Settings"],
        releaseType: "Minor feature enhancement",
        suggestedMessaging:
          "Your story, your space. Add a personal bio to your profile and tell the world who you are!",
        impact: "Medium",
        effort: "Low",
      }
    } else if (content.includes("avatar") || content.includes("Avatar") || content.includes("image")) {
      spec = {
        ...spec,
        title: "Profile Picture Upload",
        summary: "Users can now upload and customize their profile pictures to personalize their account.",
        benefits: [
          "Increases user engagement and personalization",
          "Improves recognition and trust in community features",
          "Enhances overall user experience",
        ],
        targetAudience: "All registered users",
        affectedAreas: ["Profile Page", "User Settings", "Comments/Posts"],
        releaseType: "Minor feature enhancement",
        suggestedMessaging: "Make it yours! Upload a profile picture and let your personality shine.",
        impact: "Medium",
        effort: "Medium",
      }
    }
  } else if (fileName.includes("Search")) {
    if (content.includes("filter") || content.includes("Filter")) {
      spec = {
        ...spec,
        title: "Advanced Search Filters",
        summary:
          "Enhanced search functionality with filtering options to help users find exactly what they're looking for.",
        benefits: [
          "Improves search accuracy and user satisfaction",
          "Reduces time to find relevant content",
          "Enhances overall platform usability",
        ],
        targetAudience: "All users searching for content",
        affectedAreas: ["Search Page", "Navigation", "Results Pages"],
        releaseType: "Major feature enhancement",
        suggestedMessaging: "Find it faster! New search filters help you discover exactly what you need.",
        impact: "High",
        effort: "Medium",
      }
    }
  } else if (fileName.includes("Dashboard")) {
    if (content.includes("dark") || content.includes("Dark") || content.includes("theme")) {
      spec = {
        ...spec,
        title: "Dark Mode Support",
        summary: "Users can now switch between light and dark themes for a more comfortable viewing experience.",
        benefits: [
          "Reduces eye strain in low-light conditions",
          "Provides modern, customizable user experience",
          "Improves accessibility for light-sensitive users",
        ],
        targetAudience: "All users, especially those working in low-light environments",
        affectedAreas: ["All Pages", "Settings", "Mobile App"],
        releaseType: "Major feature addition",
        suggestedMessaging: "Easy on the eyes! Switch to dark mode for a sleek, comfortable experience.",
        impact: "High",
        effort: "High",
      }
    } else if (content.includes("notification") || content.includes("Notification")) {
      spec = {
        ...spec,
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
    }
  }

  return spec
}

function updateLatestSpecs(spec) {
  const latestSpecsPath = path.join(__dirname, "../app/data/latest-specs.json")

  let latestSpecs = []
  try {
    const existing = fs.readFileSync(latestSpecsPath, "utf8")
    latestSpecs = JSON.parse(existing)
  } catch (error) {
    // File doesn't exist yet, start with empty array
  }

  // Add new spec to the beginning
  latestSpecs.unshift(spec)

  // Keep only the latest 10 specs
  latestSpecs = latestSpecs.slice(0, 10)

  // Ensure directory exists
  const dir = path.dirname(latestSpecsPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(latestSpecsPath, JSON.stringify(latestSpecs, null, 2))
}

// Watch for file changes
watcher
  .on("change", (filePath) => {
    console.log(`\n📝 File changed: ${path.relative(watchPath, filePath)}`)
    generateMarketingSpec(filePath, "modified")
  })
  .on("add", (filePath) => {
    console.log(`\n➕ File added: ${path.relative(watchPath, filePath)}`)
    generateMarketingSpec(filePath, "added")
  })
  .on("unlink", (filePath) => {
    console.log(`\n🗑️  File deleted: ${path.relative(watchPath, filePath)}`)
  })

console.log("\n🚀 File watcher is running!")
console.log("💡 Try editing files in packages/sample-app/ to see marketing specs generated automatically")
console.log("🌐 View generated specs at http://localhost:3001")
