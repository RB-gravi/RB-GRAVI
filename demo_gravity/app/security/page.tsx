import type { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck, Lock, ServerCog, FileCheck2, ArrowLeft } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Security | Gravity",
  description: "Learn how Gravity protects customer data and supports enterprise security requirements.",
}

const securityPillars = [
  {
    title: "Data Protection",
    icon: Lock,
    items: [
      "Encryption in transit with TLS 1.2+ and encryption at rest for persisted customer data",
      "Role-based access controls with least-privilege defaults for internal tooling",
      "Routine backups and tested recovery procedures",
    ],
  },
  {
    title: "Infrastructure Security",
    icon: ServerCog,
    items: [
      "Hardened cloud environments with network segmentation and restricted admin access",
      "Continuous monitoring for suspicious activity and alerting to on-call responders",
      "Automated patching and vulnerability remediation workflows",
    ],
  },
  {
    title: "Application Security",
    icon: ShieldCheck,
    items: [
      "Secure development lifecycle with peer review and security checkpoints",
      "Dependency and code scanning integrated into CI",
      "Session protections, authentication controls, and audit logging for critical actions",
    ],
  },
  {
    title: "Compliance & Governance",
    icon: FileCheck2,
    items: [
      "Documented policies covering access, incident response, and vendor management",
      "Security awareness training for employees and contractors",
      "Security reviews available during procurement for regulated and enterprise buyers",
    ],
  },
]

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-4 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
            Enterprise Security
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Security at Gravity</h1>
          <p className="max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            We built Gravity to support teams with strict security and procurement requirements. This page summarizes our
            current practices and helps prospective customers quickly evaluate our security posture.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to product
              </Link>
            </Button>
            <Button asChild size="sm">
              <a href="mailto:security@gravity.example">Contact Security Team</a>
            </Button>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2">
          {securityPillars.map((pillar) => (
            <Card key={pillar.title} className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <pillar.icon className="h-5 w-5 text-emerald-600" />
                  {pillar.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  {pillar.items.map((item) => (
                    <li key={item} className="list-inside list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  )
}
