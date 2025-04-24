"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface ModelContextType {
  modelUrl: string | null
  setModelUrl: (url: string | null) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  error: string | null
  setError: (error: string | null) => void
}

const ModelContext = createContext<ModelContextType | undefined>(undefined)

export function ModelProvider({ children }: { children: ReactNode }) {
  const [modelUrl, setModelUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <ModelContext.Provider
      value={{
        modelUrl,
        setModelUrl,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </ModelContext.Provider>
  )
}

export function useModel() {
  const context = useContext(ModelContext)
  if (context === undefined) {
    throw new Error("useModel must be used within a ModelProvider")
  }
  return context
} 