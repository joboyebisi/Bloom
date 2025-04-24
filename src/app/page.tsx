import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { ImageInput } from "@/components/image-input"
import { ThreeDViewer } from "@/components/3d-viewer"
import { EmailCaptureModal } from "@/components/email-capture-modal"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <HowItWorks />
      <div className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ImageInput />
          <ThreeDViewer />
        </div>
      </div>
      <EmailCaptureModal />
    </main>
  )
}
