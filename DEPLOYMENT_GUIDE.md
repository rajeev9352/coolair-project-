# CoolAir Project Deployment Guide

This guide explains how to deploy the CoolAir project with separate URLs for the main website and admin panel.

## Project Structure

- Main Website: Root directory (Next.js app)
- Admin Panel: `/admin-panel` directory (Next.js app)
- Backend API: `/backend` directory (Express.js server)

## Deployment Options

### Option 1: Vercel Deployment (Recommended)

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
1. You can deploy the backend to platforms like:
   - Render
   - Heroku
   - DigitalOcean App Platform
   - AWS Elastic Beanstalk
   - Google Cloud Run

2. Environment variables needed:
   ```
   PORT=5000
   USE_POSTGRESQL=false  # or true if using PostgreSQL
   JWT_SECRET=your_jwt_secret_key
   CORS_ORIGIN=https://your-main-app.vercel.app,https://your-admin-panel.vercel.app
   ```

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

### Main Website (.env.local)
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
BACKEND_URL=http://localhost:5000
```

### Admin Panel (.env.local)
```
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
BACKEND_URL=http://localhost:5000
```

### Backend (.env)
```
PORT=5000
USE_POSTGRESQL=false
JWT_SECRET=coolair_jwt_secret
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
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

## Additional Notes

- The project uses an in-memory database by default for development
- For production, it's recommended to use PostgreSQL
- Make sure to set strong JWT secrets in production