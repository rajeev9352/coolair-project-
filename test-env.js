const { z } = require('zod');

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

// Test with example values
const testEnv = {
  NODE_ENV: 'development',
  NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
  NEXT_PUBLIC_API_BASE_URL: 'http://localhost:3000',
  BACKEND_URL: 'http://localhost:5000',
  NEXTAUTH_SECRET: 'your_nextauth_secret_here_min_32_chars_long',
  NEXTAUTH_URL: 'http://localhost:3000',
  DATABASE_URL: 'postgresql://postgres:password@localhost:5432/coolair_db',
  RESEND_API_KEY: 'your_resend_api_key_here',
  EMAIL_FROM: 'noreply@yourdomain.com',
  NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-XXXXXXXXXX',
  NEXT_PUBLIC_GTM_ID: 'GTM-XXXXXXX',
  SENTRY_DSN: 'your_sentry_dsn_here',
  NEXT_PUBLIC_ENABLE_FEATURE_X: 'false',
  STRIPE_SECRET_KEY: 'your_stripe_secret_key_here',
  STRIPE_WEBHOOK_SECRET: 'your_stripe_webhook_secret_here',
  ADMIN_EMAIL: 'admin@yourdomain.com',
  CONTACT_EMAIL: 'contact@yourdomain.com',
  SUPPORT_EMAIL: 'support@yourdomain.com',
  NEXT_PUBLIC_MOCK_API: 'false'
};

try {
  const result = envSchema.parse(testEnv);
  console.log('Environment validation passed:', result);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('Environment validation failed:');
    error.errors.forEach(err => {
      console.error(`  - ${err.path.join('.')}: ${err.message}`);
    });
  } else {
    console.error('Unexpected error:', error);
  }
}