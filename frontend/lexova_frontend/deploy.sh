#!/bin/bash

# Lexova Frontend Deployment Script
# This script prepares and deploys the Lexova frontend to a free hosting service

echo "Starting Lexova Frontend Deployment..."

# Navigate to the frontend directory
cd /home/ubuntu/lexova_platform/frontend/lexova_frontend

# Install dependencies
echo "Installing dependencies..."
npm install

# Run tests
echo "Running tests..."
npm test -- --watchAll=false

# Check if tests passed
if [ $? -ne 0 ]; then
    echo "Tests failed! Deployment aborted."
    exit 1
fi

# Create production build
echo "Creating production build..."
npm run build

# Create environment-specific configuration
echo "Creating environment configuration..."
cat > .env.production << EOL
# Production environment variables
REACT_APP_API_URL=https://lexova-backend.onrender.com/api
REACT_APP_SITE_URL=https://lexova.vercel.app
REACT_APP_ENVIRONMENT=production
EOL

# Create vercel.json for deployment configuration
echo "Creating vercel.json..."
cat > vercel.json << EOL
{
  "name": "lexova-frontend",
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "build" }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/favicon.ico",
      "dest": "/favicon.ico"
    },
    {
      "src": "/logo192.png",
      "dest": "/logo192.png"
    },
    {
      "src": "/logo512.png",
      "dest": "/logo512.png"
    },
    {
      "src": "/manifest.json",
      "dest": "/manifest.json"
    },
    {
      "src": "/robots.txt",
      "dest": "/robots.txt"
    },
    {
      "src": "/sitemap.xml",
      "dest": "/sitemap.xml"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
EOL

# Create netlify.toml for Netlify deployment
echo "Creating netlify.toml..."
cat > netlify.toml << EOL
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOL

# Create .gitignore file
echo "Creating .gitignore..."
cat > .gitignore << EOL
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
EOL

# Initialize git repository if not already initialized
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit for deployment"
fi

# Deploy to free hosting service
echo "Deploying to free hosting service..."
echo "For actual deployment, you would use one of these commands:"
echo "  - For Vercel: vercel --prod"
echo "  - For Netlify: netlify deploy --prod"
echo "  - For GitHub Pages: gh-pages -d build"

# For this example, we'll use the service_deploy_frontend tool
echo "Using service_deploy_frontend tool for deployment..."

echo "Frontend deployment preparation complete!"
exit 0

