import { z } from 'zod';
import { ApiError } from './api-error';

type RequestOptions = {
  method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
  // Add any other options you want to support
};

type RequestOptionsWithBody = {
  body?: BodyInit | Record<string, unknown> | unknown[] | null;
  json?: boolean;
  [key: string]: unknown;
};

// Extend the default fetch options with our custom ones
type FetchOptions = RequestInit & RequestOptionsWithBody;

// Helper function to build URL with query parameters
function buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
  const url = new URL(path, getBaseUrl());
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
}

// Get the base URL based on the environment
function getBaseUrl(): string {
  // In the browser, use a relative URL
  if (typeof window !== 'undefined') {
    return '';
  }
  
  // In Node.js (server-side), use the environment variable or default to localhost
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
}

// The main API client function
async function apiClient<T = unknown>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    params,
    body,
    json = true,
    ...fetchOptions
  } = options as RequestOptions & RequestOptionsWithBody;

  // Set up the request config
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...fetchOptions,
  };

  // Add the request body if provided
  if (body !== undefined && method !== 'GET' && method !== 'HEAD') {
    config.body = json ? JSON.stringify(body) : (body as BodyInit);
  }

  // Build the URL with query parameters
  const url = buildUrl(path, params as Record<string, string | number | boolean | undefined> | undefined);

  try {
    const response = await fetch(url, config);
    
    // Handle non-successful responses
    if (!response.ok) {
      let errorData;
      
      try {
        // Try to parse the error response as JSON
        errorData = await response.json().catch(() => ({}));
      } catch {
        // If parsing fails, use the status text as the error message
        errorData = { message: response.statusText };
      }
      
      throw new ApiError(
        errorData.message || 'An error occurred',
        response.status,
        { details: errorData }
      );
    }

    // For 204 No Content responses, return null
    if (response.status === 204) {
      return null as T;
    }

    // Parse the response as JSON
    return (await response.json()) as T;
  } catch (error) {
    // Re-throw the error if it's already an ApiError
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network errors
    if (error instanceof TypeError) {
      throw new ApiError(
        'Network error. Please check your internet connection and try again.',
        0,
        { code: 'NETWORK_ERROR' }
      );
    }
    
    // For any other errors, re-throw them
    throw error;
  }
}

// Type-safe API client with Zod validation
export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {},
  schema?: z.ZodType<T>
): Promise<T> {
  const response = await apiClient<T>(path, options);
  
  // If a schema is provided, validate the response
  if (schema) {
    const result = schema.safeParse(response);
    
    if (!result.success) {
      console.error('API response validation failed:', result.error);
      throw new ApiError(
        'Invalid response format from the server',
        500,
        { 
          code: 'VALIDATION_ERROR',
          details: result.error 
        }
      );
    }
    
    return result.data;
  }
  
  return response as T;
}

// Convenience methods for common HTTP methods
export const api = {
  get: <T>(path: string, options?: Omit<RequestOptions, 'method'>, schema?: z.ZodType<T>) =>
    apiFetch<T>(path, { ...options, method: 'GET' }, schema),
    
  post: <T>(
    path: string,
    body?: Record<string, unknown> | unknown[] | string | number | boolean | null,
    options?: Omit<RequestOptionsWithBody, 'method' | 'body'>,
    schema?: z.ZodType<T>
  ) => {
    let requestBody: BodyInit | null | undefined;
    const headers = new Headers(
      options?.headers && typeof options.headers === 'object' && !Array.isArray(options.headers)
        ? (options.headers as Record<string, string>)
        : undefined
    );
    
    if (body !== null && body !== undefined) {
      if (typeof body === 'object' && !(body instanceof Blob) && !(body instanceof FormData)) {
        requestBody = JSON.stringify(body);
        headers.set('Content-Type', 'application/json');
      } else if (typeof body === 'string' || body instanceof Blob || body instanceof FormData) {
        requestBody = body;
      } else {
        // Convert primitives to strings
        requestBody = String(body);
      }
    }

    return apiFetch<T>(path, { 
      ...options, 
      method: 'POST', 
      body: requestBody,
      headers: Object.fromEntries(headers.entries())
    }, schema);
  },

  put: <T>(
    path: string,
    body?: Record<string, unknown> | unknown[] | string | number | boolean | null,
    options?: Omit<RequestOptionsWithBody, 'method' | 'body'>,
    schema?: z.ZodType<T>
  ) => {
    let requestBody: BodyInit | null | undefined;
    const headers = new Headers(options?.headers as HeadersInit);
    
    if (body !== null && body !== undefined) {
      if (typeof body === 'object' && !(body instanceof Blob) && !(body instanceof FormData)) {
        requestBody = JSON.stringify(body);
        headers.set('Content-Type', 'application/json');
      } else if (typeof body === 'string' || body instanceof Blob || body instanceof FormData) {
        requestBody = body;
      } else {
        requestBody = String(body);
      }
    }

    return apiFetch<T>(path, { 
      ...options, 
      method: 'PUT', 
      body: requestBody,
      headers: Object.fromEntries(headers.entries())
    }, schema);
  },

  patch: <T>(
    path: string,
    body?: Record<string, unknown> | unknown[] | string | number | boolean | null,
    options?: Omit<RequestOptionsWithBody, 'method' | 'body'>,
    schema?: z.ZodType<T>
  ) => {
    let requestBody: BodyInit | null | undefined;
    const headers = new Headers(options?.headers as HeadersInit);
    
    if (body !== null && body !== undefined) {
      if (typeof body === 'object' && !(body instanceof Blob) && !(body instanceof FormData)) {
        requestBody = JSON.stringify(body);
        headers.set('Content-Type', 'application/json');
      } else if (typeof body === 'string' || body instanceof Blob || body instanceof FormData) {
        requestBody = body;
      } else {
        requestBody = String(body);
      }
    }

    return apiFetch<T>(path, { 
      ...options, 
      method: 'PATCH', 
      body: requestBody,
      headers: Object.fromEntries(headers.entries())
    }, schema);
  },

  delete: <T>(
    path: string,
    options?: Omit<RequestOptions, 'method'>,
    schema?: z.ZodType<T>
  ) => apiFetch<T>(path, { ...options, method: 'DELETE' }, schema),
};

// Helper function to handle API errors in a consistent way
export function handleApiError(error: unknown): { message: string; status?: number } {
  if (error instanceof ApiError) {
    return {
      message: error.message || 'An error occurred',
      status: error.statusCode,
    };
  }
  
  if (error instanceof Error) {
    return { message: error.message };
  }
  
  return { message: 'An unknown error occurred' };
}

// Helper function to create API endpoints
export function createEndpoint<T>(path: string, schema?: z.ZodType<T>) {
  return {
    get: (options?: Omit<RequestOptions, 'method'>) => api.get<T>(path, options, schema),
    post: (body: Record<string, unknown> | unknown[] | string | number | boolean | null, options?: Omit<RequestOptionsWithBody, 'method' | 'body'>) =>
      api.post<T>(path, body, options, schema),
    put: (body: Record<string, unknown> | unknown[] | string | number | boolean | null, options?: Omit<RequestOptionsWithBody, 'method' | 'body'>) =>
      api.put<T>(path, body, options, schema),
    patch: (body: Record<string, unknown> | unknown[] | string | number | boolean | null, options?: Omit<RequestOptionsWithBody, 'method' | 'body'>) =>
      api.patch<T>(path, body, options, schema),
    delete: (options?: Omit<RequestOptions, 'method'>) => api.delete<T>(path, options, schema),
  };
}

// Example usage:
// const userApi = createEndpoint<User>('/api/users', userSchema);
// const user = await userApi.get();
// const newUser = await userApi.post({ name: 'John' });