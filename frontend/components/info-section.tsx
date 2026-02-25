"use client"

import { ShieldCheck, Brain, Eye, Lock, Stethoscope, Smartphone } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Deep Learning Powered",
    description:
      "Built on a convolutional neural network trained on thousands of dermatological images to recognize patterns invisible to the untrained eye.",
  },
  {
    icon: Eye,
    title: "Three Condition Detection",
    description:
      "Currently identifies Eczema, Melanocytic Nevi (moles), and Melanoma with confidence scoring and low-confidence safety checks.",
  },
  {
    icon: ShieldCheck,
    title: "Safety-First Approach",
    description:
      "When prediction confidence is low, the system advises consulting a certified dermatologist rather than providing uncertain guidance.",
  },
  {
    icon: Stethoscope,
    title: "Doctor Locator",
    description:
      "Integrated with OpenStreetMap Overpass API to find nearby dermatologists, clinics, and hospitals within a 5 km radius of your location.",
  },
  {
    icon: Lock,
    title: "Privacy Focused",
    description:
      "Your images are processed in real-time and not stored on any server. Location data is only used to find nearby medical facilities.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description:
      "Fully responsive design that works seamlessly on phones, tablets, and desktops for convenient access anytime, anywhere.",
  },
]

export function InfoSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            About DermaScan AI
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Intelligent Skin Analysis You Can Trust
          </h2>
          <p className="text-muted-foreground">
            DermaScan AI combines cutting-edge deep learning with a
            user-friendly interface to provide early guidance on skin concerns.
          </p>
        </div>

        {/* Zig-zag feature cards */}
        <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{
                transform: i % 2 === 1 ? "translateY(2rem)" : undefined,
              }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-transform duration-300 group-hover:scale-110">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
