# CoolAir Project Deployment Guide

This guide explains how to deploy the CoolAir project with separate URLs for the main website and admin panel.

## Prerequisites

Before deploying, make sure you have:
1. A GitHub account with the repository
2. Domain names for your main website and admin panel (optional but recommended)
3. A hosting provider for the backend API
4. Database credentials if using PostgreSQL

## Project Structure

- Main Website: Root directory (Next.js app)
- Admin Panel: `/admin-panel` directory (Next.js app)
- Backend API: `/backend` directory (Express.js server)

## Deployment Options

### Option 1: Vercel Deployment (Recommended)

Vercel is the ideal platform for deploying Next.js applications. Here are specific instructions for deploying each component:

#### Prerequisites
1. Create accounts on [Vercel](https://vercel.com) and [Render](https://render.com) (for backend)
2. Link your GitHub account to Vercel
3. Purchase domain names for your main website and admin panel (optional but recommended)

#### Prerequisites
1. GitHub account with the project repository
2. Vercel account

#### Deploy Main Website
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository (`coolair-project-`)
4. Keep root directory as `/`
5. Set environment variables:
   ```
   NEXT_PUBLIC_APP_URL=https://your-main-app.vercel.app
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com
   BACKEND_URL=https://your-backend-url.com
   ```
6. Click "Deploy"

#### Deploy Admin Panel
1. In Vercel, click "New Project"
2. Import the same GitHub repository
3. Set root directory to `/admin-panel`
4. Set environment variables:
   ```
   NEXT_PUBLIC_APP_URL=https://your-admin-panel.vercel.app
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com
   BACKEND_URL=https://your-backend-url.com
   ```
5. Click "Deploy"

#### Deploy Backend API

We recommend using Render for deploying the backend API due to its simplicity and PostgreSQL support.

1. Sign up at [Render](https://render.com)
2. Click "New Web Service"
3. Connect your GitHub repository
4. Set the following configuration:
   - Build command: `cd backend && npm install && npm run build`
   - Start command: `cd backend && npm start`
   - Environment: Node
   - Plan: Free or Starter
5. Add environment variables:
   ```
   PORT=5000
   USE_POSTGRESQL=true
   DB_NAME=your_production_database_name
   DB_USER=your_database_user
   DB_PASS=your_secure_database_password
   DB_HOST=your_database_host
   DB_PORT=5432
   JWT_SECRET=your_secure_jwt_secret_min_32_chars_long
   CORS_ORIGIN=https://your-main-website-domain.com,https://your-admin-panel-domain.com
   ```
6. Click "Create Web Service"

### Option 2: Manual Deployment

#### Prerequisites
- Node.js installed on the server
- npm or yarn package manager

#### Deploy Backend
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Start the server:
   ```bash
   npm start
   ```
   or for development:
   ```bash
   npm run dev
   ```

#### Deploy Main Website
1. From root directory, install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Start the server:
   ```bash
   npm start
   ```
   or for development:
   ```bash
   npm run dev
   ```

#### Deploy Admin Panel
1. Navigate to admin-panel directory:
   ```bash
   cd admin-panel
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Start the server:
   ```bash
   npm start
   ```
   or for development:
   ```bash
   npm run dev
   ```

## Environment Variables

Production environment files have been created in the repository:

1. Main Website: `.env.production` in the root directory
2. Admin Panel: `.env.production` in the `/admin-panel` directory
3. Backend API: `.env.production` in the `/backend` directory

Update these files with your actual values before deployment.

### Main Website (.env.production)
```
NEXT_PUBLIC_APP_URL=https://your-main-website-domain.com
NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain.com
BACKEND_URL=https://your-backend-domain.com
```

### Admin Panel (.env.production)
```
NEXT_PUBLIC_APP_URL=https://your-admin-panel-domain.com
NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain.com
BACKEND_URL=https://your-backend-domain.com
```

### Backend (.env.production)
```
PORT=5000
USE_POSTGRESQL=true
DB_NAME=your_production_database_name
DB_USER=your_database_user
DB_PASS=your_secure_database_password
DB_HOST=your_database_host
DB_PORT=5432
JWT_SECRET=your_secure_jwt_secret_min_32_chars_long
CORS_ORIGIN=https://your-main-website-domain.com,https://your-admin-panel-domain.com
```

## Running Applications

After deployment, you will have three separate services running:

1. **Main Website**: Usually on port 3000
2. **Admin Panel**: Usually on port 3001
3. **Backend API**: Usually on port 5000

Make sure to configure your reverse proxy or load balancer to route traffic to the correct services based on the URL paths.

## Troubleshooting

1. **CORS Issues**: Make sure CORS_ORIGIN includes all your frontend URLs
2. **Environment Variables**: Ensure all required environment variables are set
3. **Database Connection**: Verify database credentials if using PostgreSQL
4. **Build Errors**: Check Node.js version compatibility
5. **API Connection Issues**: Verify BACKEND_URL is correctly set in frontend applications
6. **Vercel Deployment Failures**: Check build logs in Vercel dashboard for specific error messages
7. **Mixed Content Errors**: Ensure all URLs use HTTPS in production
8. **Authentication Issues**: Verify JWT_SECRET is consistent between backend and frontend configurations
9. **TypeScript/ESLint Errors**: If builds fail due to TypeScript or ESLint errors, you can temporarily disable ESLint during builds by adding `eslint: { ignoreDuringBuilds: true }` to your next.config.js file

## Additional Notes

- The project uses an in-memory database by default for development
- For production, it's recommended to use PostgreSQL
- Make sure to set strong JWT secrets in production
- Always use HTTPS in production environments
- Regularly update dependencies to ensure security

## Conclusion

After following these deployment instructions, you will have:
1. Main website running on its own domain/subdomain
2. Admin panel running on a separate domain/subdomain
3. Backend API running on its own domain/subdomain

Each component can be scaled and managed independently, providing flexibility for future development and maintenance.