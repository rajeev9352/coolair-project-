import { z } from 'zod';

// Define the schema for environment variables
const envSchema = z.object({
  // Node Environment
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
    
  // Next.js Public Runtime Config
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_API_BASE_URL: z.string().url().optional(),
  
  // Authentication (e.g., NextAuth, Clerk, etc.)
  // Make optional in dev to avoid failing when not configured
  NEXTAUTH_SECRET: z.string().min(32).optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  
  // Database
  // Make optional in dev
  DATABASE_URL: z.string().url().optional(),
  
  // Email Service (Resend, SendGrid, etc.)
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),
  
  // Analytics & Monitoring
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  
  // Feature Flags
  NEXT_PUBLIC_ENABLE_FEATURE_X: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .optional(),
  
  // API Keys for external services
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  
  // Other environment variables
  ADMIN_EMAIL: z.string().email().optional(),
  CONTACT_EMAIL: z.string().email().optional(),
  SUPPORT_EMAIL: z.string().email().optional(),

  // Backend (server-side proxy base)
  BACKEND_URL: z.string().url().optional(),
  
  // Development overrides
  NEXT_PUBLIC_MOCK_API: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .optional(),
});

// Parse the environment variables
type EnvVars = z.infer<typeof envSchema>;

// This will throw if any required environment variables are missing in production
const getEnvVars = (): EnvVars => {
  try {
    const parsed = envSchema.parse(process.env);

    // In production, enforce presence of critical variables
    if (parsed.NODE_ENV === 'production') {
      const critical: Array<keyof EnvVars> = [
        'NEXT_PUBLIC_APP_URL',
      ];
      const missing: string[] = [];
      for (const key of critical) {
        if (!parsed[key as keyof EnvVars]) missing.push(String(key));
      }
      if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
      }
    }

    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .filter((e) => e.code === 'invalid_type')
        .map((e) => e.path.join('.'));
      
      // Only crash in production; in dev, log a warning and continue
      const nodeEnv = process.env.NODE_ENV || 'development';
      if (missingVars.length > 0 && nodeEnv === 'production') {
        throw new Error(
          `Missing required environment variables: ${missingVars.join(', ')}`
        );
      } else {
        console.warn('[env] Non-fatal env validation issues (development):', missingVars);
        // Return best-effort parsed values using partial parsing
        const partialSchema = envSchema.partial();
        return partialSchema.parse(process.env) as EnvVars;
      }
    }
    
    throw error;
  }
};

// Export the validated environment variables
export const env = getEnvVars();

// Helper function to get runtime environment
export const isProduction = env.NODE_ENV === 'production';
export const isDevelopment = env.NODE_ENV === 'development';
export const isTest = env.NODE_ENV === 'test';

// Helper function to get the full URL for a path
export const getFullUrl = (path: string): string => {
  // Remove leading slash if present
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${env.NEXT_PUBLIC_APP_URL}/${normalizedPath}`;
};

// Helper to get API URL with path
export const getApiUrl = (path: string): string => {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL || env.NEXT_PUBLIC_APP_URL;
  // Remove trailing slash from base URL if present
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  // Remove leading slash from path if present
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${normalizedBase}/api/${normalizedPath}`;
};

// Export a type-safe version of process.env
declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVars {}
  }
}

// This helps with IDE autocompletion for process.env
export {};
