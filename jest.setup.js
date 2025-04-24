// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
  usePathname() {
    return ''
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock the ModelContext
jest.mock('@/context/model-context', () => ({
  useModel: () => ({
    modelUrl: null,
    setModelUrl: jest.fn(),
    isLoading: false,
    setIsLoading: jest.fn(),
    error: null,
    setError: jest.fn(),
  }),
  ModelProvider: ({ children }) => <>{children}</>,
})) 