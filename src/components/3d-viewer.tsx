"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useModel } from "@/context/model-context"

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export function ThreeDViewer() {
  const { modelUrl, isLoading, error } = useModel()
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    if (!modelUrl) return
    
    setIsDownloading(true)
    
    try {
      const response = await fetch(modelUrl)
      const blob = await response.blob()
      
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "dental-model.glb"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Error downloading model:", err)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="container py-10">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-[400px] w-full">
              {isLoading ? (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" aria-hidden="true"></div>
                    <p className="text-sm text-muted-foreground">
                      Generating 3D Model...
                    </p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-red-500">
                      {error}
                    </p>
                  </div>
                </div>
              ) : modelUrl ? (
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <Model url={modelUrl} />
                  <OrbitControls />
                </Canvas>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    No 3D model generated yet
                  </p>
                </div>
              )}
            </div>

            {modelUrl && !isLoading && !error && (
              <Button 
                onClick={handleDownload} 
                disabled={isDownloading}
                aria-label="Download 3D dental model"
              >
                {isDownloading ? "Downloading..." : "Download 3D Model"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 