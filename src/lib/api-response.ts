import { NextResponse } from 'next/server';
import { ApiError, handleApiError } from './api-error';
import { z, ZodType } from 'zod';

type SuccessResponse<T> = {
  success: true;
  data: T;
};

type ErrorResponse = {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: unknown;
    validationErrors?: Record<string, string[]>;
  };
};

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// Helper function to create a success response
export function successResponse<T>(data: T, status: number = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true as const,
      data,
    },
    { status }
  );
}

// Helper function to create an error response
export function errorResponse(
  error: unknown,
  status: number = 500
): NextResponse<ErrorResponse> {
  const { message, code, details, validationErrors } = handleApiError(error);
  
  return NextResponse.json(
    {
      success: false as const,
      error: {
        message,
        code,
        details,
        validationErrors,
      },
    },
    { status }
  );
}

// Helper function to handle API route handlers with proper error handling
export async function withApiHandler<T>(
  handler: () => Promise<NextResponse<ApiResponse<T>>>
): Promise<NextResponse<ApiResponse<T>>> {
  try {
    return await handler();
  } catch (error) {
    console.error('API Handler Error:', error);
    return errorResponse(error);
  }
}

// Helper function to parse and validate request body
export async function parseRequestBody<T>(
  request: Request,
  schema: ZodType<T>
): Promise<{ success: true; data: T } | { success: false; response: NextResponse<ErrorResponse> }> {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors: Record<string, string[]> = {};
      
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        if (!validationErrors[path]) {
          validationErrors[path] = [];
        }
        validationErrors[path].push(err.message);
      });
      
      return {
        success: false,
        response: NextResponse.json(
          {
            success: false,
            error: {
              message: 'Validation error',
              code: 'VALIDATION_ERROR',
              validationErrors,
            },
          },
          { status: 400 }
        ),
      };
    }
    
    return {
      success: false,
      response: errorResponse(new Error('Invalid request body'), 400),
    };
  }
}

// Helper function to create paginated responses
export function paginatedResponse<T>(
  data: T[], 
  total: number, 
  page: number, 
  limit: number
) {
  const totalPages = Math.ceil(total / limit);
  
  return {
    data,
    pagination: {
      total,
      totalPages,
      page,
      limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

// Helper function to get query parameters from URL
export function getQueryParams<T extends Record<string, string | string[] | undefined>>(
  request: Request
): T {
  const { searchParams } = new URL(request.url);
  const params: Record<string, string | string[]> = {};
  
  for (const [key, value] of searchParams.entries()) {
    if (params[key]) {
      // Convert to array if multiple values for the same key
      params[key] = Array.isArray(params[key])
        ? [...(params[key] as string[]), value]
        : [params[key] as string, value];
    } else {
      params[key] = value;
    }
  }
  
  return params as T;
}

// Helper function to validate query parameters
export function validateQueryParams<T>(
  params: unknown,
  schema: ZodType<T>
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(params);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  return { success: false, error: result.error };
}

// Helper function to set cache headers
export function withCacheHeaders(
  response: NextResponse,
  options: {
    maxAge?: number;
    swr?: number;
    staleWhileRevalidate?: number;
    public?: boolean;
    private?: boolean;
    noStore?: boolean;
    noCache?: boolean;
    mustRevalidate?: boolean;
    immutable?: boolean;
  } = {}
): NextResponse {
  const {
    maxAge,
    swr,
    staleWhileRevalidate,
    public: isPublic = true,
    private: isPrivate = false,
    noStore = false,
    noCache = false,
    mustRevalidate = false,
    immutable = false,
  } = options;

  const cacheControl = [];

  if (noStore) {
    cacheControl.push('no-store');
  } else if (noCache) {
    cacheControl.push('no-cache');
  } else {
    if (isPublic) cacheControl.push('public');
    if (isPrivate) cacheControl.push('private');
    if (maxAge !== undefined) cacheControl.push(`max-age=${maxAge}`);
    if (staleWhileRevalidate !== undefined) {
      cacheControl.push(`stale-while-revalidate=${staleWhileRevalidate}`);
    }
    if (swr !== undefined) cacheControl.push(`s-maxage=${swr}`);
    if (mustRevalidate) cacheControl.push('must-revalidate');
    if (immutable) cacheControl.push('immutable');
  }

  response.headers.set('Cache-Control', cacheControl.join(', '));
  
  return response;
}

// Helper to create a response with CORS headers
export function withCors(
  response: NextResponse,
  options: {
    origin?: string | string[];
    methods?: string[];
    allowedHeaders?: string[];
    exposedHeaders?: string[];
    credentials?: boolean;
    maxAge?: number;
  } = {}
): NextResponse {
  const {
    origin = '*',
    methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders = ['Content-Type', 'Authorization'],
    exposedHeaders = [],
    credentials = false,
    maxAge,
  } = options;

  const headers = new Headers(response.headers);
  
  // Handle multiple origins
  const allowedOrigins = Array.isArray(origin) ? origin : [origin];
  const requestOrigin = headers.get('origin');
  const responseOrigin = requestOrigin && allowedOrigins.includes(requestOrigin)
    ? requestOrigin
    : allowedOrigins[0];

  headers.set('Access-Control-Allow-Origin', responseOrigin);
  
  if (credentials) {
    headers.set('Access-Control-Allow-Credentials', 'true');
  }
  
  if (exposedHeaders.length > 0) {
    headers.set('Access-Control-Expose-Headers', exposedHeaders.join(','));
  }
  
  // Handle preflight requests
  if (response.status === 204 || response.status === 200) {
    headers.set('Access-Control-Allow-Methods', methods.join(','));
    headers.set('Access-Control-Allow-Headers', allowedHeaders.join(','));
    
    if (maxAge !== undefined) {
      headers.set('Access-Control-Max-Age', maxAge.toString());
    }
  }
  
  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
