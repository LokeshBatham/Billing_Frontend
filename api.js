// @ts-check
import axios from 'axios';

const resolveBaseUrl = () => {
  console.log('import.meta.env:', import.meta);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
  // @ts-ignore - import.meta.env is available in Vite
  const metaEnv = typeof import.meta !== 'undefined' ? import.meta.env : undefined;
  const envUrl = metaEnv?.VITE_API_URL;

  if (typeof envUrl === 'string' && envUrl.trim()) {
    return envUrl.replace(/\/+$/, '');
  }

  // Do not use a hardcoded default. Require VITE_API_URL to be set.
  // If it's not set, return empty string so relative paths are used (same-origin).
  // Log an explicit warning to help debugging.
  // Note: Consumers should set VITE_API_URL for explicit backend host.
  // eslint-disable-next-line no-console
  console.error('[API] VITE_API_URL is not set. API requests will use relative paths. Set VITE_API_URL in your environment.');
  return '';
};

const API_BASE_URL = resolveBaseUrl();

class ApiError extends Error {
  /**
   * @param {string} message
   * @param {number} status
   * @param {unknown} [details]
   */
  constructor(message, status, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

// axios will parse JSON responses automatically

/**
 * @param {string} path
 */
const makeUrl = (path) => {
  if (!path.startsWith('/')) {
    return `${API_BASE_URL}/${path}`;
  }
  return `${API_BASE_URL}${path}`;
};

/**
 * @param {string} path
 * @param {{ token?: string; body?: any; method?: string; headers?: HeadersInit; [key: string]: any }} options
 */
const request = async (path, options = {}) => {
  const { token, body, headers = {}, method = 'GET', ...rest } = options;

  const finalHeaders = {
    ...headers,
  };

  if (body !== undefined && body !== null && !finalHeaders['Content-Type']) {
    finalHeaders['Content-Type'] = 'application/json';
  }
  if (token) {
    finalHeaders['Authorization'] = `Bearer ${token}`;
  }

  try {
    const axiosConfig = {
      url: makeUrl(path),
      method: method.toLowerCase(),
      headers: finalHeaders,
      data: body !== undefined && body !== null ? body : undefined,
      ...rest,
    };
    const response = await axios.request(axiosConfig);
    return response.data !== undefined ? response.data : null;
  } catch (err) {
    if (err.response) {
      const status = err.response.status;
      const payload = err.response.data;
      const message = typeof payload?.error === 'string' ? payload.error : err.message || `Request failed with status ${status}`;
      throw new ApiError(message, status, payload);
    }
    throw new ApiError(err.message || 'Network request failed', 0, { originalError: err });
  }
};

/**
 * @param {{ email: string; password: string }} credentials
 */
export const login = async (credentials) => {
  const email = String(credentials.email || '').trim();
  const password = String(credentials.password || '');

   console.log('import.meta.env:', import.meta.env);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

  if (!email) {
    throw new ApiError('Email is required', 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new ApiError('Please enter a valid email address', 400);
  }

  if (!password || password.length < 6) {
    throw new ApiError('Password must be at least 6 characters long', 400);
  }

  return request('/api/auth/login', {
    method: 'POST',
    body: {
      email,
      password,
    },
  });
};

/**
 * @param {{ token?: string; [key: string]: any }} [options]
 */
export const getProducts = async (options) => {
  return request('/api/products', {
    method: 'GET',
    ...(options || {}),
  });
};

/**
 * @param {Record<string, unknown>} product
 * @param {{ token?: string; [key: string]: any }} [options]
 */
export const createProduct = async (product, options) => {
  return request('/api/products', {
    method: 'POST',
    body: product,
    ...(options || {}),
  });
};

/**
 * @param {string} id
 * @param {Record<string, unknown>} product
 * @param {{ token?: string; [key: string]: any }} [options]
 */
export const updateProduct = async (id, product, options) => {
  return request(`/api/products/${id}`, {
    method: 'PUT',
    body: product,
    ...(options || {}),
  });
};

/**
 * @param {string} id
 * @param {{ token?: string; [key: string]: any }} [options]
 */
export const deleteProduct = async (id, options) => {
  await request(`/api/products/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
  return { id };
};

export { ApiError };

