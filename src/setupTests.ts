import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeDisabled(): R;
    }
  }
}

// Mock window.__APP_CONFIG for tests
Object.defineProperty(window, '__APP_CONFIG', {
  value: {
    VITE_API_URL: 'http://localhost:5000',
    VITE_RAZORPAY_KEY_ID: 'test_key',
  },
  writable: true,
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

// Mock fetch globally
global.fetch = jest.fn();
