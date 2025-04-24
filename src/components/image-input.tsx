"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useModel } from "@/context/model-context"

export function ImageInput() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [localLoading, setLocalLoading] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const { toast } = useToast()
  const { setModelUrl, setIsLoading, setError } = useModel()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Reset error state
      setLocalError(null)
      setError(null)
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        const errorMsg = "Please upload an image file"
        setLocalError(errorMsg)
        setError(errorMsg)
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive",
        })
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        const errorMsg = "File size too large"
        setLocalError(errorMsg)
        setError(errorMsg)
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        })
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.onerror = () => {
        const errorMsg = "Failed to read the image file"
        setLocalError(errorMsg)
        setError(errorMsg)
        toast({
          title: "Error",
          description: "Failed to read the image file. Please try again.",
          variant: "destructive",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSetAsInput = async () => {
    if (!selectedImage) return
    
    setLocalLoading(true)
    setIsLoading(true)
    setLocalError(null)
    setError(null)
    
    try {
      // Convert base64 to blob
      const base64Response = await fetch(selectedImage)
      const blob = await base64Response.blob()
      
      // Create form data
      const formData = new FormData()
      formData.append("image", blob, "dental-image.jpg")
      
      // Send to API
      const response = await fetch("/api/generate-model", {
        method: "POST",
        body: formData,
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate 3D model")
      }
      
      const data = await response.json()
      
      // Update the model URL in the context
      setModelUrl(data.modelUrl)
      
      // Show success toast
      toast({
        title: "Success!",
        description: "3D model generated successfully",
      })
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setLocalError(errorMessage)
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLocalLoading(false)
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full max-w-md">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={localLoading}
                aria-label="Upload dental image"
              />
              <label
                htmlFor="image-upload"
                className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${
                  localError ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50"
                } hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${
                  localLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-describedby={localError ? "upload-error" : undefined}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {localLoading ? (
                    <div className="flex flex-col items-center">
                      <div className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" aria-hidden="true"></div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Processing...
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag
                        and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG or GIF (MAX. 5MB)
                      </p>
                    </>
                  )}
                </div>
              </label>
              {localError && (
                <p className="mt-2 text-sm text-red-500" id="upload-error">{localError}</p>
              )}
            </div>

            {selectedImage && !localLoading && (
              <div className="relative w-full max-w-md">
                <Image
                  src={selectedImage}
                  alt="Selected dental image"
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Remove selected image"
                >
                  ×
                </Button>
              </div>
            )}

            <Button
              onClick={handleSetAsInput}
              disabled={!selectedImage || localLoading}
              className="w-full max-w-md"
              aria-label="Generate 3D dental model from uploaded image"
            >
              {localLoading ? "Generating 3D Model..." : "Generate 3D Dental Model"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 