import { ZodError } from 'zod';

export class ApiError extends Error {
  statusCode: number;
  code?: string;
  details?: unknown;
  validationErrors?: Record<string, string[]>;

  constructor(
    message: string,
    statusCode: number = 500,
    options: {
      code?: string;
      details?: unknown;
      cause?: unknown;
      validationErrors?: Record<string, string[]>;
    } = {}
  ) {
    super(message, { cause: options.cause });
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = options.code;
    this.details = options.details;
    this.validationErrors = options.validationErrors;

    // This is needed to make the stack trace appear in the console
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      code: this.code,
      details: this.details,
      validationErrors: this.validationErrors,
    };
  }

  static fromZodError(error: ZodError): ApiError {
    const validationErrors: Record<string, string[]> = {};
    
    error.errors.forEach((err) => {
      const path = err.path.join('.');
      if (!validationErrors[path]) {
        validationErrors[path] = [];
      }
      validationErrors[path].push(err.message);
    });

    return new ApiError('Validation error', 400, {
      code: 'VALIDATION_ERROR',
      details: 'One or more validation errors occurred',
      validationErrors,
    });
  }

  static fromError(error: unknown): ApiError {
    if (error instanceof ApiError) {
      return error;
    }

    if (error instanceof ZodError) {
      return this.fromZodError(error);
    }

    if (error instanceof Error) {
      return new ApiError(error.message, 500, { cause: error });
    }

    return new ApiError('An unknown error occurred', 500, { cause: error });
  }
}

export function handleApiError(error: unknown): { 
  status: number; 
  message: string; 
  code?: string; 
  details?: unknown;
  validationErrors?: Record<string, string[]>;
} {
  const apiError = error instanceof ApiError ? error : ApiError.fromError(error);
  
  // Log the error for server-side debugging
  if (typeof window === 'undefined') {
    console.error('API Error:', {
      message: apiError.message,
      status: apiError.statusCode,
      code: apiError.code,
      stack: apiError.stack,
      cause: apiError.cause,
    });
  }

  // Don't expose internal errors to the client in production
  const isProduction = process.env.NODE_ENV === 'production';
  const isServerError = apiError.statusCode >= 500;
  
  const response = {
    status: apiError.statusCode,
    message: isProduction && isServerError ? 'Internal server error' : apiError.message,
    code: apiError.code,
  };

  // Only include details in development or for client errors
  if (!isProduction || !isServerError) {
    return {
      ...response,
      details: apiError.details,
      ...(apiError.validationErrors && { validationErrors: apiError.validationErrors }),
    };
  }

  return response;
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError || (error as Error)?.name === 'ApiError';
}

// Helper function to create specific API errors
export const apiErrors = {
  notFound: (message: string = 'Resource not found') =>
    new ApiError(message, 404, { code: 'NOT_FOUND' }),
    
  unauthorized: (message: string = 'Unauthorized') =>
    new ApiError(message, 401, { code: 'UNAUTHORIZED' }),
    
  forbidden: (message: string = 'Forbidden') =>
    new ApiError(message, 403, { code: 'FORBIDDEN' }),
    
  badRequest: (message: string = 'Bad request', details?: unknown) =>
    new ApiError(message, 400, { code: 'BAD_REQUEST', details }),
    
  validationError: (errors: Record<string, string[]>) =>
    new ApiError('Validation error', 400, {
      code: 'VALIDATION_ERROR',
      validationErrors: errors,
    }),
    
  internalServerError: (message: string = 'Internal server error') =>
    new ApiError(message, 500, { code: 'INTERNAL_SERVER_ERROR' }),
    
  notImplemented: (message: string = 'Not implemented') =>
    new ApiError(message, 501, { code: 'NOT_IMPLEMENTED' }),
    
  serviceUnavailable: (message: string = 'Service unavailable') =>
    new ApiError(message, 503, { code: 'SERVICE_UNAVAILABLE' }),
};

// Type guard for API error responses
export interface ApiErrorResponse {
  status: number;
  message: string;
  code?: string;
  details?: unknown;
  validationErrors?: Record<string, string[]>;
}

export function isApiErrorResponse(obj: unknown): obj is ApiErrorResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'status' in obj &&
    'message' in obj
  );
}
