"use client"

import { Upload, Brain, ClipboardList, MapPin } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload Image",
    description:
      "Take a clear photo of the affected skin area and upload it through our drag-and-drop interface.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description:
      "Our trained deep learning model analyzes the image to classify the skin condition with a confidence score.",
  },
  {
    icon: ClipboardList,
    title: "Get Guidance",
    description:
      "Receive personalized do's and don'ts for your detected condition, along with urgency flags when needed.",
  },
  {
    icon: MapPin,
    title: "Find Doctors",
    description:
      "Locate nearby dermatologists and clinics using your current position, powered by OpenStreetMap data.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            How It Works
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Four Simple Steps to Better Skin Health
          </h2>
          <p className="text-muted-foreground">
            Our streamlined process makes it easy to get early guidance on skin
            concerns.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Step number */}
              <div className="absolute -top-3 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-md shadow-primary/25">
                {i + 1}
              </div>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-primary transition-transform duration-300 group-hover:scale-110">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-card-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
