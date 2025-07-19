#!/bin/bash

# Lexova Platform - Azure Frontend Deployment Script
# This script deploys the Lexova frontend to Azure Static Web Apps

set -e

# Configuration
AZURE_SUBSCRIPTION=""
AZURE_RESOURCE_GROUP="lexova-rg"
AZURE_LOCATION="eastus"
AZURE_STATIC_WEB_APP_NAME="lexova-frontend"
DOMAIN_NAME="lexova.com"

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "Azure CLI is not installed. Please install it first."
    exit 1
fi

# Ensure Azure credentials are configured
echo "Checking Azure credentials..."
az account show > /dev/null || {
    echo "Azure credentials not configured. Please run 'az login' first."
    exit 1
}

# Set Azure subscription if provided
if [ ! -z "$AZURE_SUBSCRIPTION" ]; then
    echo "Setting Azure subscription..."
    az account set --subscription "$AZURE_SUBSCRIPTION"
fi

# Create resource group if it doesn't exist
echo "Creating resource group if it doesn't exist..."
az group show --name "$AZURE_RESOURCE_GROUP" > /dev/null 2>&1 || {
    echo "Creating resource group: $AZURE_RESOURCE_GROUP"
    az group create --name "$AZURE_RESOURCE_GROUP" --location "$AZURE_LOCATION"
}

# Build the React application
echo "Building React application..."
cd ../frontend/lexova_frontend
npm install
npm run build
cd -

# Create Azure Static Web App
echo "Creating Azure Static Web App..."
DEPLOYMENT_TOKEN=$(az staticwebapp create \
    --name "$AZURE_STATIC_WEB_APP_NAME" \
    --resource-group "$AZURE_RESOURCE_GROUP" \
    --location "$AZURE_LOCATION" \
    --sku Standard \
    --query "deploymentToken" -o tsv)

# Create staticwebapp.config.json for SPA routing
echo "Creating staticwebapp.config.json for SPA routing..."
cat > ../frontend/lexova_frontend/build/staticwebapp.config.json << EOF
{
  "routes": [
    {
      "route": "/api/*",
      "methods": ["GET", "POST", "PUT", "DELETE"],
      "rewrite": "https://lexova-backend.azurecontainerapps.io/api/:splat"
    },
    {
      "route": "/*",
      "serve": "/index.html",
      "statusCode": 200
    }
  ],
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/images/*.{png,jpg,gif,ico}", "/css/*", "/js/*", "/assets/*"]
  },
  "responseOverrides": {
    "404": {
      "rewrite": "/index.html",
      "statusCode": 200
    }
  },
  "globalHeaders": {
    "content-security-policy": "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://lexova-backend.azurecontainerapps.io; img-src 'self' data: https:; font-src 'self' data: https:;",
    "cache-control": "must-revalidate, max-age=600",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff"
  },
  "mimeTypes": {
    ".json": "application/json",
    ".css": "text/css",
    ".js": "text/javascript",
    ".html": "text/html",
    ".ico": "image/x-icon",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".eot": "application/vnd.ms-fontobject",
    ".ttf": "font/ttf",
    ".woff": "font/woff",
    ".woff2": "font/woff2"
  }
}
EOF

# Deploy to Azure Static Web App using the Azure CLI
echo "Deploying to Azure Static Web App..."
az staticwebapp deploy \
    --name "$AZURE_STATIC_WEB_APP_NAME" \
    --resource-group "$AZURE_RESOURCE_GROUP" \
    --source ../frontend/lexova_frontend/build \
    --token "$DEPLOYMENT_TOKEN" \
    --api-location "" \
    --app-location "" \
    --output-location ""

# Add custom domain if provided
if [ ! -z "$DOMAIN_NAME" ]; then
    echo "Adding custom domain..."
    az staticwebapp hostname add \
        --name "$AZURE_STATIC_WEB_APP_NAME" \
        --resource-group "$AZURE_RESOURCE_GROUP" \
        --hostname "$DOMAIN_NAME"
    
    echo "Please add the following DNS records for your domain:"
    az staticwebapp hostname list \
        --name "$AZURE_STATIC_WEB_APP_NAME" \
        --resource-group "$AZURE_RESOURCE_GROUP" \
        --query "[?hostname=='$DOMAIN_NAME'].validationMethod" -o tsv
    
    echo "After adding DNS records, run the following command to validate domain ownership:"
    echo "az staticwebapp hostname validate --name \"$AZURE_STATIC_WEB_APP_NAME\" --resource-group \"$AZURE_RESOURCE_GROUP\" --hostname \"$DOMAIN_NAME\""
fi

# Get Static Web App URL
APP_URL=$(az staticwebapp show --name "$AZURE_STATIC_WEB_APP_NAME" --resource-group "$AZURE_RESOURCE_GROUP" --query "defaultHostname" -o tsv)
echo "Deployment completed successfully!"
echo "Frontend is available at: https://$APP_URL"
if [ ! -z "$DOMAIN_NAME" ]; then
    echo "Once DNS propagates, it will also be available at: https://$DOMAIN_NAME"
fi

exit 0

