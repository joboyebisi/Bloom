import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ImageInput } from './image-input'
import { useModel } from '@/context/model-context'

// Mock the useModel hook
jest.mock('@/context/model-context')

// Mock the useToast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

// Mock the fetch function
global.fetch = jest.fn()

describe('ImageInput Component', () => {
  const mockSetModelUrl = jest.fn()
  const mockSetIsLoading = jest.fn()
  const mockSetError = jest.fn()

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()
    
    // Setup useModel mock
    ;(useModel as jest.Mock).mockReturnValue({
      modelUrl: null,
      setModelUrl: mockSetModelUrl,
      isLoading: false,
      setIsLoading: mockSetIsLoading,
      error: null,
      setError: mockSetError,
    })
    
    // Setup fetch mock
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ modelUrl: 'https://example.com/model.glb' }),
    })
  })

  it('renders the image input component', () => {
    render(<ImageInput />)
    
    // Check if the component renders correctly
    expect(screen.getByText(/Click to upload/i)).toBeInTheDocument()
    expect(screen.getByText(/or drag and drop/i)).toBeInTheDocument()
    expect(screen.getByText(/PNG, JPG or GIF/i)).toBeInTheDocument()
  })

  it('handles file selection', async () => {
    render(<ImageInput />)
    
    // Create a mock file
    const file = new File(['test'], 'test.png', { type: 'image/png' })
    
    // Get the file input
    const input = screen.getByLabelText(/Upload dental image/i)
    
    // Simulate file selection
    await waitFor(() => {
      fireEvent.change(input, { target: { files: [file] } })
    })
    
    // Check if the image preview is displayed
    expect(screen.getByAltText(/Selected dental image/i)).toBeInTheDocument()
  })

  it('handles invalid file type', async () => {
    render(<ImageInput />)
    
    // Create a mock file with invalid type
    const file = new File(['test'], 'test.txt', { type: 'text/plain' })
    
    // Get the file input
    const input = screen.getByLabelText(/Upload dental image/i)
    
    // Simulate file selection
    await waitFor(() => {
      fireEvent.change(input, { target: { files: [file] } })
    })
    
    // Check if the error message is displayed
    expect(screen.getByText(/Please upload an image file/i)).toBeInTheDocument()
  })

  it('handles file size limit', async () => {
    render(<ImageInput />)
    
    // Create a mock file that exceeds the size limit (5MB)
    const largeFile = new File(['x'.repeat(6 * 1024 * 1024)], 'large.png', { type: 'image/png' })
    
    // Get the file input
    const input = screen.getByLabelText(/Upload dental image/i)
    
    // Simulate file selection
    await waitFor(() => {
      fireEvent.change(input, { target: { files: [largeFile] } })
    })
    
    // Check if the error message is displayed
    expect(screen.getByText(/File size too large/i)).toBeInTheDocument()
  })

  it('handles model generation', async () => {
    render(<ImageInput />)
    
    // Create a mock file
    const file = new File(['test'], 'test.png', { type: 'image/png' })
    
    // Get the file input
    const input = screen.getByLabelText(/Upload dental image/i)
    
    // Simulate file selection
    await waitFor(() => {
      fireEvent.change(input, { target: { files: [file] } })
    })
    
    // Get the generate button
    const generateButton = screen.getByText(/Generate 3D Dental Model/i)
    
    // Simulate button click
    fireEvent.click(generateButton)
    
    // Check if loading state is set
    expect(mockSetIsLoading).toHaveBeenCalledWith(true)
    
    // Wait for the API call to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/generate-model', expect.any(Object))
    })
    
    // Check if the model URL is set
    expect(mockSetModelUrl).toHaveBeenCalledWith('https://example.com/model.glb')
    
    // Check if loading state is reset
    expect(mockSetIsLoading).toHaveBeenCalledWith(false)
  })

  it('handles API error', async () => {
    // Setup fetch mock to return an error
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'Failed to generate 3D model' }),
    })
    
    render(<ImageInput />)
    
    // Create a mock file
    const file = new File(['test'], 'test.png', { type: 'image/png' })
    
    // Get the file input
    const input = screen.getByLabelText(/Upload dental image/i)
    
    // Simulate file selection
    await waitFor(() => {
      fireEvent.change(input, { target: { files: [file] } })
    })
    
    // Get the generate button
    const generateButton = screen.getByText(/Generate 3D Dental Model/i)
    
    // Simulate button click
    fireEvent.click(generateButton)
    
    // Wait for the API call to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/generate-model', expect.any(Object))
    })
    
    // Check if the error is set
    expect(mockSetError).toHaveBeenCalledWith('Failed to generate 3D model')
    
    // Check if loading state is reset
    expect(mockSetIsLoading).toHaveBeenCalledWith(false)
  })
}) 