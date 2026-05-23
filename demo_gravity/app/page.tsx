import Link from "next/link"
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck, Sparkles, Target, TrendingUp, Zap } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { resolveFeatureFlags } from "@/lib/featureFlags"

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Outcomes", href: "#momentum-heading" },
  { label: "FAQ", href: "#faq" },
]

const valuePillars = [
  {
    title: "Ship product updates with clear messaging",
    description:
      "Turn every engineering change into launch-ready narratives so product, marketing, and support stay aligned.",
    icon: Sparkles,
  },
  {
    title: "Reduce launch risk before release day",
    description:
      "Automatically surface impacted areas, audience fit, and readiness gaps to avoid rushed, inconsistent rollouts.",
    icon: ShieldCheck,
  },
  {
    title: "Move from commit to campaign faster",
    description:
      "Give teams a shared workflow that connects repo activity to value-focused communication in minutes.",
    icon: Zap,
  },
]

const processSteps = [
  {
    title: "Detect and summarize changes",
    description: "Ingest commit and PR activity to identify what changed and why it matters.",
  },
  {
    title: "Generate positioning guidance",
    description: "Create concise summaries, target audience details, and launch messaging suggestions.",
  },
  {
    title: "Publish with confidence",
    description: "Hand teams a clear narrative and next-step checklist before release approval.",
  },
]

const proofPoints = [
  "Shared product + marketing context in one workflow",
  "Faster launch prep with automated readiness checks",
  "Consistent messaging across every release touchpoint",
]

const readinessChecklist = [
  { item: "Core release changes mapped to customer-facing value", progress: 96 },
  { item: "Stakeholder owners assigned for launch channels", progress: 88 },
  { item: "Enablement copy drafted for support and sales", progress: 82 },
]

const momentumStats = [
  { label: "Avg. launch prep time saved", value: "11 hrs", note: "Based on 124 launches in Q2." },
  { label: "Teams aligned per release", value: "4+", note: "Product, marketing, support, and sales." },
  { label: "Messaging consistency score", value: "92%", note: "Across launch pages, emails, and release notes." },
]

const testimonials = [
  {
    quote:
      "GravityLink cut our launch prep meetings in half because everyone now starts from one source of truth.",
    author: "Priya S.",
    role: "Head of Product Marketing, Northstar Labs",
  },
  {
    quote:
      "Our support team gets customer-ready context faster, which improved first-week CSAT after every release.",
    author: "Marta L.",
    role: "Director of Support Enablement, PulsePath",
  },
]

const faqs = [
  {
    question: "How does GravityLink connect to our development workflow?",
    answer:
      "GravityLink reads commit and pull request activity, then maps changes to customer-facing messaging, audience impact, and owner assignments.",
  },
  {
    question: "Do we need to replace our existing launch docs?",
    answer:
      "No. GravityLink complements your existing documentation and helps standardize release narratives without forcing a migration.",
  },
  {
    question: "What teams benefit most from using GravityLink?",
    answer:
      "Product, marketing, support, and sales teams benefit immediately because each group gets release context and ownership before go-live.",
  },
]

const partnerLogos = ["Northstar Labs", "ClarityOS", "Helio Commerce", "Summit Cloud", "PulsePath"]

export default function HomePage() {
  const { enableNewFeature } = resolveFeatureFlags()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <a
        href="#content"
        className="sr-only rounded-md p-2 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:shadow"
      >
        Skip to content
      </a>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-16 pt-8 sm:px-6 lg:gap-24 lg:px-8 lg:pt-12">
        <header className="sticky top-4 z-20 flex items-center justify-between rounded-2xl border bg-background/90 px-4 py-3 shadow-sm backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary/10 p-2 text-primary">
              <Target className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold tracking-wide">GravityLink</span>
          </div>
          <nav aria-label="Primary" className="hidden items-center gap-4 md:flex">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-sm text-muted-foreground transition hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="hidden sm:inline-flex">Now onboarding June cohorts</Badge>
            <Button variant="outline" size="sm" asChild>
              <Link href="/security">Security</Link>
            </Button>
          </div>
        </header>

        <section id="content" className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.07] via-background to-background p-6 sm:p-8 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-8 lg:p-10">
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit">Fresh launch copy for product-led teams</Badge>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Turn every product update into a clear customer story—before launch day.
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              GravityLink helps teams transform release notes into value-driven messaging, align stakeholders faster, and ship launches with confidence.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="#cta">Book a demo<ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#how-it-works">See how it works</Link>
              </Button>
            </div>
            <div className="grid gap-2 text-sm text-muted-foreground">
              {proofPoints.map((point) => (
                <div key={point} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" /><span>{point}</span></div>
              ))}
            </div>
          </div>

          <Card className="border-primary/20 bg-background/80 shadow-sm backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Launch Readiness Snapshot</CardTitle>
              <CardDescription>Get a single view of message quality before your release goes live.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border bg-background p-4">
                <div className="text-sm text-muted-foreground">Average readiness</div>
                <div className="mt-1 text-3xl font-semibold">92%</div>
                <p className="mt-2 text-xs text-muted-foreground">Updated daily from active launch plans.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border bg-background p-3"><div className="flex items-center gap-2 text-sm font-medium"><Clock3 className="h-4 w-4 text-primary" />Faster handoffs</div><p className="mt-1 text-sm text-muted-foreground">Clear launch narratives across teams.</p></div>
                <div className="rounded-lg border bg-background p-3"><div className="flex items-center gap-2 text-sm font-medium"><ShieldCheck className="h-4 w-4 text-primary" />Lower risk</div><p className="mt-1 text-sm text-muted-foreground">Pre-release checks reduce messaging gaps.</p></div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section aria-label="Trusted by teams" className="space-y-3 rounded-2xl border bg-card/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Trusted by modern product teams</p>
          <div className="grid gap-2 text-center sm:grid-cols-5">
            {partnerLogos.map((logo) => (<div key={logo} className="rounded-md border bg-background px-3 py-2 text-sm font-medium text-muted-foreground">{logo}</div>))}
          </div>
        </section>

        <section aria-labelledby="momentum-heading" className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-primary">Momentum at a glance</p>
            <h2 id="momentum-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">Keep every launch moving with measurable release communication wins.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {momentumStats.map((stat) => (
              <Card key={stat.label} className="border-primary/15 bg-card/80">
                <CardContent className="space-y-2 p-5">
                  <p className="text-3xl font-semibold tracking-tight text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="checklist-heading" className="space-y-5 rounded-2xl border bg-card/60 p-6 sm:p-8">
          <div className="space-y-1">
            <p className="text-sm font-medium text-primary">Release checklist</p>
            <h2 id="checklist-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">Track launch readiness across every team before go-live.</h2>
          </div>
          <div className="grid gap-4">{readinessChecklist.map((check) => (<div key={check.item} className="space-y-2 rounded-lg border bg-background p-4"><div className="flex items-center justify-between gap-3"><p className="text-sm font-medium">{check.item}</p><span className="text-sm font-semibold text-primary">{check.progress}%</span></div><Progress value={check.progress} aria-label={check.item} /></div>))}</div>
        </section>

        <section aria-labelledby="customer-story-heading" className="space-y-5">
          <div className="space-y-1">
            <p className="text-sm font-medium text-primary">Customer stories</p>
            <h2 id="customer-story-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">Teams launch faster when everyone works from the same release narrative.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">{testimonials.map((testimonial) => (<Card key={testimonial.author}><CardContent className="space-y-4 p-6"><TrendingUp className="h-5 w-5 text-primary" /><p className="text-sm leading-relaxed text-muted-foreground">“{testimonial.quote}”</p><div><p className="text-sm font-semibold">{testimonial.author}</p><p className="text-xs text-muted-foreground">{testimonial.role}</p></div></CardContent></Card>))}</div>
        </section>

        <section className="space-y-6" aria-labelledby="value-proposition-heading">
          <div className="space-y-2"><p className="text-sm font-medium text-primary">Value proposition</p><h2 id="value-proposition-heading" className="text-3xl font-semibold tracking-tight">One cohesive workflow from engineering updates to customer-facing outcomes.</h2></div>
          <div className="grid gap-4 md:grid-cols-3">{valuePillars.map((pillar) => {const Icon = pillar.icon; return (<Card key={pillar.title} className="h-full"><CardHeader className="space-y-3"><div className="w-fit rounded-md bg-primary/10 p-2 text-primary"><Icon className="h-5 w-5" /></div><CardTitle className="text-lg">{pillar.title}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{pillar.description}</p></CardContent></Card>)})}</div>
        </section>

        {enableNewFeature && (
          <section className="rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/10 via-background to-background p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div className="space-y-2"><p className="text-sm font-medium text-primary">Feature preview</p><h2 className="text-2xl font-semibold tracking-tight">Join the AI Launch Pilot Workspace</h2><p className="max-w-xl text-sm text-muted-foreground">Early-access teams can co-edit release messaging, assign channel owners, and export campaign-ready assets from a single workspace.</p></div><Button size="lg" asChild><Link href="#cta">Request pilot access</Link></Button></div>
          </section>
        )}

        <section id="how-it-works" className="space-y-6" aria-labelledby="flow-heading">
          <div className="space-y-2"><p className="text-sm font-medium text-primary">Flow</p><h2 id="flow-heading" className="text-3xl font-semibold tracking-tight">A simple release narrative flow that keeps teams moving.</h2></div>
          <div className="grid gap-4 md:grid-cols-3">{processSteps.map((step, index) => (<Card key={step.title}><CardHeader><CardDescription>Step {index + 1}</CardDescription><CardTitle className="text-lg">{step.title}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{step.description}</p></CardContent></Card>))}</div>
        </section>

        <section id="faq" aria-labelledby="faq-heading" className="space-y-6 rounded-2xl border bg-card/70 p-6 sm:p-8">
          <div className="space-y-2"><p className="text-sm font-medium text-primary">FAQ</p><h2 id="faq-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">Answers for teams evaluating GravityLink.</h2></div>
          <Accordion type="single" collapsible className="w-full">{faqs.map((faq, index) => (<AccordionItem key={faq.question} value={`faq-${index}`}><AccordionTrigger>{faq.question}</AccordionTrigger><AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent></AccordionItem>))}</Accordion>
        </section>

        <section id="cta" className="rounded-2xl border bg-card px-6 py-8 shadow-sm sm:px-8 sm:py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div className="max-w-xl space-y-2"><p className="text-sm font-medium text-primary">Ready to modernize your launches?</p><h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Bring product, marketing, and release teams into one confident go-to-market rhythm.</h2><p className="text-sm text-muted-foreground sm:text-base">Start with a live walkthrough to see how GravityLink turns every release into a clear customer outcome.</p></div><Button size="lg" asChild><Link href="mailto:sales@gravitylink.com">Talk to sales<ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
        </section>
      </div>
    </main>
  )
}
