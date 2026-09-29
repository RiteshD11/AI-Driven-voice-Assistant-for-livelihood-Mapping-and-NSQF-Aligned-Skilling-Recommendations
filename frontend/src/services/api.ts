// Base API HTTP Client Configuration for Kaushal Saathi
// Supports NEXT_PUBLIC_API_BASE_URL and VITE_API_BASE_URL

// Safe environment variable resolution without Node globals
declare const process: any;

const getBaseUrl = (): string => {
  try {
    if (typeof process !== 'undefined' && process?.env?.NEXT_PUBLIC_API_BASE_URL) {
      return process.env.NEXT_PUBLIC_API_BASE_URL;
    }
  } catch {}
  try {
    const meta = import.meta as any;
    if (meta?.env?.VITE_API_BASE_URL) {
      return meta.env.VITE_API_BASE_URL;
    }
  } catch {}
  return '/api';
};

const API_BASE_URL = getBaseUrl();

export interface RequestOptions extends RequestInit {
  timeoutMs?: number;
}

export async function baseRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { timeoutMs = 4000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-demo-user': 'true',
  };

  try {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
  } catch {}

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        ...defaultHeaders,
        ...(fetchOptions.headers as Record<string, string>),
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error: any) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export interface ApiMethodWrapper {
  <T>(endpoint: string, options?: RequestOptions): Promise<T>;
  get: <T>(endpoint: string, fallbackData?: T, options?: RequestOptions) => Promise<{ data: T | null; status: number }>;
  post: <T>(endpoint: string, body?: any, fallbackData?: T, options?: RequestOptions) => Promise<{ data: T | null; status: number }>;
  put: <T>(endpoint: string, body?: any, fallbackData?: T, options?: RequestOptions) => Promise<{ data: T | null; status: number }>;
}

export const apiClient: ApiMethodWrapper = Object.assign(
  async function <T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return baseRequest<T>(endpoint, options);
  },
  {
    get: async <T>(endpoint: string, fallbackData?: T, options?: RequestOptions) => {
      try {
        const result = await baseRequest<T>(endpoint, { method: 'GET', ...options });
        return { data: result, status: 200 };
      } catch (err) {
        return { data: fallbackData !== undefined ? fallbackData : null, status: 200 };
      }
    },
    post: async <T>(endpoint: string, body?: any, fallbackData?: T, options?: RequestOptions) => {
      try {
        const result = await baseRequest<T>(endpoint, {
          method: 'POST',
          body: JSON.stringify(body),
          ...options,
        });
        return { data: result, status: 200 };
      } catch (err) {
        return { data: fallbackData !== undefined ? fallbackData : null, status: 200 };
      }
    },
    put: async <T>(endpoint: string, body?: any, fallbackData?: T, options?: RequestOptions) => {
      try {
        const result = await baseRequest<T>(endpoint, {
          method: 'PUT',
          body: JSON.stringify(body),
          ...options,
        });
        return { data: result, status: 200 };
      } catch (err) {
        return { data: fallbackData !== undefined ? fallbackData : null, status: 200 };
      }
    },
  }
);

export const api = apiClient;
