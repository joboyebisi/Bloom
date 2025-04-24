import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThreeDViewer } from './3d-viewer'
import { useModel } from '@/context/model-context'

// Mock the useModel hook
jest.mock('@/context/model-context')

// Mock the fetch function
global.fetch = jest.fn()

// Mock the @react-three/fiber and @react-three/drei modules
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="canvas">{children}</div>,
}))

jest.mock('@react-three/drei', () => ({
  OrbitControls: () => null,
  useGLTF: () => ({ scene: {} }),
}))

describe('ThreeDViewer Component', () => {
  const mockModelUrl = 'https://example.com/model.glb'
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()
    
    // Setup fetch mock
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(new Blob(['test'], { type: 'model/gltf-binary' })),
    })
  })

  it('renders the loading state', () => {
    // Setup useModel mock with loading state
    ;(useModel as jest.Mock).mockReturnValue({
      modelUrl: null,
      isLoading: true,
      error: null,
    })
    
    render(<ThreeDViewer />)
    
    // Check if the loading state is displayed
    expect(screen.getByText(/Generating 3D Model/i)).toBeInTheDocument()
  })

  it('renders the error state', () => {
    // Setup useModel mock with error state
    ;(useModel as jest.Mock).mockReturnValue({
      modelUrl: null,
      isLoading: false,
      error: 'Failed to generate 3D model',
    })
    
    render(<ThreeDViewer />)
    
    // Check if the error message is displayed
    expect(screen.getByText(/Failed to generate 3D model/i)).toBeInTheDocument()
  })

  it('renders the empty state', () => {
    // Setup useModel mock with empty state
    ;(useModel as jest.Mock).mockReturnValue({
      modelUrl: null,
      isLoading: false,
      error: null,
    })
    
    render(<ThreeDViewer />)
    
    // Check if the empty state message is displayed
    expect(screen.getByText(/No 3D model generated yet/i)).toBeInTheDocument()
  })

  it('renders the 3D model when modelUrl is provided', () => {
    // Setup useModel mock with modelUrl
    ;(useModel as jest.Mock).mockReturnValue({
      modelUrl: mockModelUrl,
      isLoading: false,
      error: null,
    })
    
    render(<ThreeDViewer />)
    
    // Check if the Canvas is rendered
    expect(screen.getByTestId('canvas')).toBeInTheDocument()
    
    // Check if the download button is displayed
    expect(screen.getByText(/Download 3D Model/i)).toBeInTheDocument()
  })

  it('handles model download', async () => {
    // Setup useModel mock with modelUrl
    ;(useModel as jest.Mock).mockReturnValue({
      modelUrl: mockModelUrl,
      isLoading: false,
      error: null,
    })
    
    // Mock URL.createObjectURL and URL.revokeObjectURL
    const mockCreateObjectURL = jest.fn().mockReturnValue('blob:test')
    const mockRevokeObjectURL = jest.fn()
    
    global.URL.createObjectURL = mockCreateObjectURL
    global.URL.revokeObjectURL = mockRevokeObjectURL
    
    // Mock document.createElement and appendChild
    const mockLink = {
      href: '',
      download: '',
      click: jest.fn(),
    }
    
    const mockCreateElement = jest.fn().mockReturnValue(mockLink)
    const mockAppendChild = jest.fn()
    const mockRemoveChild = jest.fn()
    
    document.createElement = mockCreateElement
    document.body.appendChild = mockAppendChild
    document.body.removeChild = mockRemoveChild
    
    render(<ThreeDViewer />)
    
    // Get the download button
    const downloadButton = screen.getByText(/Download 3D Model/i)
    
    // Simulate button click
    fireEvent.click(downloadButton)
    
    // Wait for the download process to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(mockModelUrl)
    })
    
    // Check if the link was created and clicked
    expect(mockCreateElement).toHaveBeenCalledWith('a')
    expect(mockLink.href).toBe('blob:test')
    expect(mockLink.download).toBe('dental-model.glb')
    expect(mockAppendChild).toHaveBeenCalledWith(mockLink)
    expect(mockLink.click).toHaveBeenCalled()
    expect(mockRemoveChild).toHaveBeenCalledWith(mockLink)
    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:test')
  })

  it('handles download error', async () => {
    // Setup useModel mock with modelUrl
    ;(useModel as jest.Mock).mockReturnValue({
      modelUrl: mockModelUrl,
      isLoading: false,
      error: null,
    })
    
    // Setup fetch mock to return an error
    ;(global.fetch as jest.Mock).mockRejectedValue(new Error('Download failed'))
    
    // Spy on console.error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    
    render(<ThreeDViewer />)
    
    // Get the download button
    const downloadButton = screen.getByText(/Download 3D Model/i)
    
    // Simulate button click
    fireEvent.click(downloadButton)
    
    // Wait for the download process to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(mockModelUrl)
    })
    
    // Check if the error was logged
    expect(consoleSpy).toHaveBeenCalledWith('Error downloading model:', expect.any(Error))
    
    // Restore console.error
    consoleSpy.mockRestore()
  })
}) 