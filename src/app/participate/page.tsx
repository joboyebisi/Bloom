import { ImageInput } from "@/components/image-input"
import { ThreeDViewer } from "@/components/3d-viewer"
import { EmailCaptureModal } from "@/components/email-capture-modal"

export default function ParticipatePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 md:p-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Participate in Our Research</h1>
        
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">How to Participate</h2>
            <p className="text-lg text-muted-foreground mb-4">
              We're looking for dental educators to help us improve our AI-powered 3D modeling technology. Your participation will help shape the future of dental education.
            </p>
            <div className="flex justify-center">
              <EmailCaptureModal />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Try Our Technology</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Upload a dental image and see how our AI generates a 3D model. Your feedback on the accuracy and usefulness of the generated models is invaluable to our research.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ImageInput />
              <ThreeDViewer />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">What to Expect</h2>
            <ul className="list-disc list-inside space-y-2 text-lg text-muted-foreground">
              <li>Regular updates on our research progress</li>
              <li>Early access to new features and improvements</li>
              <li>Opportunities to provide feedback and shape development</li>
              <li>Collaboration with leading researchers in dental education</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-lg text-muted-foreground">
              For more information about participating in our research, please contact Dr. John Oyebisi at j.a.oyebisi@qmul.ac.uk
            </p>
          </div>
        </section>
      </div>
    </main>
  )
} 