"use client"

import { ArrowDown, ShieldCheck, Zap, MapPin } from "lucide-react"

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-24 pt-16 md:pb-32 md:pt-24"
    >
      {/* Background decorative grid */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
            backgroundSize: "40px 40px",
            opacity: 0.4,
          }}
        />
        {/* Soft radial glow */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: "800px",
            height: "600px",
            background:
              "radial-gradient(ellipse at center, rgba(14,165,233,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            <ShieldCheck className="h-4 w-4" />
            AI-Powered Skin Analysis
          </div>

          {/* Main heading with animated gradient */}
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
            <span className="text-balance">
              Early Skin{" "}
              <span
                className="animate-gradient-text bg-gradient-to-r from-primary via-accent to-primary"
              >
                Guidance
              </span>{" "}
              at Your Fingertips
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Upload a photo of a skin concern and receive instant AI analysis
            with actionable guidance, severity indicators, and nearby
            dermatologist recommendations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#upload"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Analyze Your Skin
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-4 text-base font-semibold text-card-foreground transition-all duration-200 hover:bg-secondary hover:-translate-y-0.5"
            >
              Learn How It Works
            </a>
          </div>
        </div>

        {/* Feature chips */}
        <div className="mx-auto mt-16 flex max-w-2xl flex-wrap items-center justify-center gap-4 md:mt-20">
          {[
            {
              icon: Zap,
              label: "Instant Results",
              description: "Analysis in seconds",
            },
            {
              icon: ShieldCheck,
              label: "3 Conditions",
              description: "Eczema, Nevi, Melanoma",
            },
            {
              icon: MapPin,
              label: "Find Doctors",
              description: "Nearby dermatologists",
            },
          ].map((chip) => (
            <div
              key={chip.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary">
                <chip.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-card-foreground">{chip.label}</p>
                <p className="text-xs text-muted-foreground">{chip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
