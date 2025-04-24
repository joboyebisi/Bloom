import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function HowItWorks() {
  return (
    <div className="container py-10">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
        How It Works
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Step 1</CardTitle>
            <CardDescription>Upload Your Image</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Upload 2D images or provide text descriptions of the desired dental
              scenario.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Step 2</CardTitle>
            <CardDescription>AI Processing</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our AI-powered tool processes your input to generate a 3D model.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Step 3</CardTitle>
            <CardDescription>Download & Use</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View, interact with, and download your custom 3D learning asset for
              use in VR simulators.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 