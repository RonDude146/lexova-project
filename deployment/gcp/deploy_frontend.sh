#!/bin/bash

# Lexova Platform - Google Cloud Platform Frontend Deployment Script
# This script deploys the Lexova frontend to Firebase Hosting

set -e

# Configuration
GCP_PROJECT_ID="lexova-platform"
FIREBASE_PROJECT_ID=${GCP_PROJECT_ID}
DOMAIN_NAME="lexova.com"

# Check if gcloud CLI is installed
if ! command -v gcloud &> /dev/null; then
    echo "Google Cloud SDK is not installed. Please install it first."
    exit 1
fi

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "Firebase CLI is not installed. Installing..."
    npm install -g firebase-tools
fi

# Ensure GCP credentials are configured
echo "Checking GCP credentials..."
gcloud auth print-access-token > /dev/null || {
    echo "GCP credentials not configured. Please run 'gcloud auth login' first."
    exit 1
}

# Set GCP project
echo "Setting GCP project..."
gcloud config set project ${GCP_PROJECT_ID}

# Enable required APIs
echo "Enabling required APIs..."
gcloud services enable firebasehosting.googleapis.com
gcloud services enable firebaseauth.googleapis.com

# Login to Firebase
echo "Logging in to Firebase..."
firebase login --no-localhost

# Build the React application
echo "Building React application..."
cd ../frontend/lexova_frontend
npm install
npm run build
cd -

# Initialize Firebase if not already initialized
if [ ! -f "../frontend/lexova_frontend/firebase.json" ]; then
    echo "Initializing Firebase..."
    cd ../frontend/lexova_frontend
    firebase init hosting --project ${FIREBASE_PROJECT_ID}
    cd -
fi

# Update firebase.json for SPA routing
echo "Updating firebase.json for SPA routing..."
cat > ../frontend/lexova_frontend/firebase.json << EOF
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp|ico|woff|woff2|ttf|eot)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "404.html",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=300"
          }
        ]
      },
      {
        "source": "index.html",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=300"
          }
        ]
      }
    ]
  }
}
EOF

# Create .env.production file
echo "Creating .env.production file..."
cat > ../frontend/lexova_frontend/.env.production << EOF
REACT_APP_API_URL=https://lexova-backend-${GCP_REGION}.a.run.app/api
REACT_APP_ENVIRONMENT=production
EOF

# Deploy to Firebase Hosting
echo "Deploying to Firebase Hosting..."
cd ../frontend/lexova_frontend
firebase deploy --only hosting
cd -

# Connect custom domain if provided
if [ ! -z "$DOMAIN_NAME" ]; then
    echo "Connecting custom domain..."
    firebase hosting:sites:create ${DOMAIN_NAME}
    firebase hosting:sites:update ${DOMAIN_NAME} --project ${FIREBASE_PROJECT_ID}
    firebase hosting:channel:deploy production --site ${DOMAIN_NAME}
    
    echo "Please add the following DNS records for your domain:"
    firebase hosting:sites:get ${DOMAIN_NAME}
    
    echo "After adding DNS records, run the following command to verify domain ownership:"
    echo "firebase hosting:sites:update ${DOMAIN_NAME} --project ${FIREBASE_PROJECT_ID} --verify"
fi

echo "Deployment completed successfully!"
echo "Your frontend is now available at: https://${FIREBASE_PROJECT_ID}.web.app"
if [ ! -z "$DOMAIN_NAME" ]; then
    echo "Once DNS propagates, it will also be available at: https://${DOMAIN_NAME}"
fi

exit 0

