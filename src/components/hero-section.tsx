import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          BLOOM Dental 3D
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Create 3D Models from your dental image bank that can be used for teaching
          on VR-Haptics Dental Simulators, VR Headsets or for teaching in classroom
        </p>
      </div>
      <div className="space-x-4">
        <Button>Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </div>
  )
} 