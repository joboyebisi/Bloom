export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 md:p-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About BLOOM</h1>
        
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              BLOOM (Building Learning Objects with Online Modeling) is a research project at Queen Mary University of London aimed at revolutionizing dental education through AI-powered 3D modeling technology.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">The Problem</h2>
            <p className="text-lg text-muted-foreground">
              Traditional dental education relies heavily on 2D images and physical models, which can be limiting for students trying to understand complex 3D structures. Creating custom 3D models for specific learning scenarios is time-consuming and expensive.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Solution</h2>
            <p className="text-lg text-muted-foreground">
              BLOOM leverages cutting-edge AI technology to automatically generate detailed 3D models from 2D dental images. This allows educators to quickly create custom learning materials that can be used in virtual reality simulations and other interactive learning environments.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Research Team</h2>
            <ul className="list-disc list-inside space-y-2 text-lg text-muted-foreground">
              <li>Dr. John Oyebisi - Principal Investigator</li>
              <li>Dr. Greg Slabaugh - Co-Investigator</li>
              <li>Dr. Chris Phillips - Co-Investigator</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
            <p className="text-lg text-muted-foreground">
              We're always looking for dental educators and institutions to participate in our research. Your feedback helps us improve our technology and create better learning tools for dental students.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
} 