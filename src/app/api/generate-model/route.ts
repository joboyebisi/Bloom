import { NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { v4 as uuidv4 } from "uuid"

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.STORAGE_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_KEY || "",
    secretAccessKey: process.env.STORAGE_SECRET_KEY || "",
  },
})

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File
    
    if (!image) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      )
    }

    // Convert the image to a buffer
    const imageBuffer = Buffer.from(await image.arrayBuffer())
    
    // Generate a unique ID for this model
    const modelId = uuidv4()
    
    // Upload the image to S3
    const imageKey = `uploads/${modelId}/${image.name}`
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.STORAGE_BUCKET,
        Key: imageKey,
        Body: imageBuffer,
        ContentType: image.type,
      })
    )
    
    // Call the 3D model generation API
    const apiUrl = process.env.MODEL_GENERATION_API_URL
    const apiKey = process.env.MODEL_GENERATION_API_KEY
    
    if (!apiUrl || !apiKey) {
      throw new Error("3D model generation API configuration is missing")
    }
    
    // In development, simulate the API call
    if (process.env.NODE_ENV === "development") {
      console.log("Development mode: Would call 3D model generation API with image:", imageKey)
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Return a mock model URL
      const mockModelUrl = "https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/teeth-model/model.gltf"
      
      return NextResponse.json(
        { 
          success: true,
          modelUrl: mockModelUrl,
          message: "3D model generated successfully (development mode)" 
        },
        { status: 200 }
      )
    }
    
    // In production, make the actual API call
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        imageUrl: `https://${process.env.STORAGE_BUCKET}.s3.${process.env.STORAGE_REGION}.amazonaws.com/${imageKey}`,
        modelId,
      }),
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to generate 3D model")
    }
    
    const data = await response.json()
    
    // Upload the generated model to S3
    const modelKey = `models/${modelId}/model.glb`
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.STORAGE_BUCKET,
        Key: modelKey,
        Body: Buffer.from(data.modelData, "base64"),
        ContentType: "model/gltf-binary",
      })
    )
    
    // Return the URL to the generated model
    const modelUrl = `https://${process.env.STORAGE_BUCKET}.s3.${process.env.STORAGE_REGION}.amazonaws.com/${modelKey}`
    
    return NextResponse.json(
      { 
        success: true,
        modelUrl,
        message: "3D model generated successfully" 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error generating 3D model:", error)
    return NextResponse.json(
      { error: "Failed to generate 3D model" },
      { status: 500 }
    )
  }
} 