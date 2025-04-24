import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Create a transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // In development, just log the email
    if (process.env.NODE_ENV === "development") {
      console.log("Development mode: Email would be sent to", email)
      return NextResponse.json(
        { message: "Email submitted successfully (development mode)" },
        { status: 200 }
      )
    }

    // Send email to the research team
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: "j.a.oyebisi@qmul.ac.uk",
      subject: "New Research Participant: BLOOM Dental 3D",
      text: `A new participant has registered for the BLOOM Dental 3D research study.\n\nEmail: ${email}\n\nPlease follow up with this participant.`,
      html: `
        <h2>New Research Participant</h2>
        <p>A new participant has registered for the BLOOM Dental 3D research study.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>Please follow up with this participant.</p>
      `,
    })

    // Send confirmation email to the participant
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Thank you for participating in BLOOM Dental 3D research",
      text: `Thank you for your interest in participating in our research on AI-aided VR content creation for dental education.\n\nWe will contact you shortly with more information about the study.\n\nBest regards,\nThe BLOOM Dental 3D Team`,
      html: `
        <h2>Thank you for participating!</h2>
        <p>Thank you for your interest in participating in our research on AI-aided VR content creation for dental education.</p>
        <p>We will contact you shortly with more information about the study.</p>
        <p>Best regards,<br>The BLOOM Dental 3D Team</p>
      `,
    })

    return NextResponse.json(
      { message: "Email submitted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error submitting email:", error)
    return NextResponse.json(
      { error: "Failed to submit email" },
      { status: 500 }
    )
  }
} 