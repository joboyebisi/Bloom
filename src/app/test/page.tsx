import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { ImageInput } from "@/components/image-input"
import { ThreeDViewer } from "@/components/3d-viewer"
import { EmailCaptureModal } from "@/components/email-capture-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function TestPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">Component Test Page</h1>
      
      <div className="w-full max-w-4xl space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Hero Section</h2>
          <HeroSection />
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <HowItWorks />
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Image Input</h2>
          <ImageInput />
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">3D Viewer</h2>
          <ThreeDViewer />
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Email Capture Modal</h2>
          <div className="flex justify-center">
            <EmailCaptureModal />
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Toast Notifications</h2>
          <Card>
            <CardHeader>
              <CardTitle>Test Toast Notifications</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button onClick={() => {
                // @ts-ignore - We're just testing the toast functionality
                window.toast({
                  title: "Success Toast",
                  description: "This is a success toast notification",
                })
              }}>
                Show Success Toast
              </Button>
              <Button variant="destructive" onClick={() => {
                // @ts-ignore - We're just testing the toast functionality
                window.toast({
                  title: "Error Toast",
                  description: "This is an error toast notification",
                  variant: "destructive",
                })
              }}>
                Show Error Toast
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
} 