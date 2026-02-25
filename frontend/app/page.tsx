import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { SkinUpload } from "@/components/skin-upload"
import { HowItWorks } from "@/components/how-it-works"
import { InfoSection } from "@/components/info-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <SkinUpload />
        <HowItWorks />
        <InfoSection />
      </main>
      <Footer />
    </div>
  )
}
