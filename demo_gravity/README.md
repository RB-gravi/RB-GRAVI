# Marketing Document Change Tracker

This monorepo demonstrates how changes to marketing documents can be automatically tracked and summarized for stakeholders.

## Structure

\`\`\`
├── packages/
│   ├── marketing-docs/      # Document editor (Next.js)
│   └── change-tracker/      # Change tracking tool (Next.js)
├── package.json             # Root package.json with scripts
└── README.md
\`\`\`

## Quick Start

1. **Install dependencies:**
   \`\`\`bash
   npm run install:all
   \`\`\`

2. **Start both applications:**
   \`\`\`bash
   npm run dev
   \`\`\`
   This starts:
   - Document editor at http://localhost:3000
   - Change tracker at http://localhost:3001

3. **Start document watching:**
   \`\`\`bash
   npm run watch
   \`\`\`

4. **Make changes to see tracking in action:**
   - Edit documents at http://localhost:3000
   - Save your changes
   - Watch change summaries appear at http://localhost:3001

## How It Works

1. **Document Editor**: Edit marketing documents (product briefs, launch plans, messaging guides)
2. **File Watcher**: Monitors document changes in real-time
3. **Change Analysis**: Analyzes what changed and determines impact
4. **Stakeholder Notification**: Identifies who needs to be informed
5. **Action Items**: Suggests next steps based on the changes

## Demo Flow

1. Open the document editor (localhost:3000)
2. Edit any marketing document
3. Click "Save Changes"
4. Switch to the change tracker (localhost:3001)
5. See automatic change summaries with:
   - What changed
   - Impact level
   - Stakeholders to notify
   - Suggested action items

## Try These Changes

- **Add new features** to Product Brief → High impact, notifies Product & Engineering
- **Update pricing** in Launch Plan → High impact, notifies Sales & Finance
- **Modify messaging** in Messaging Guide → Medium impact, notifies Sales & Content teams
- **Change target audience** → High impact, notifies Marketing & Sales

Perfect for PMMs to understand how document changes can be automatically tracked and communicated!
