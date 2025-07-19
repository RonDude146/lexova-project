#!/bin/bash

# Lexova Platform - Azure Backend Deployment Script
# This script deploys the Lexova backend to Azure Container Apps

set -e

# Configuration
AZURE_SUBSCRIPTION=""
AZURE_RESOURCE_GROUP="lexova-rg"
AZURE_LOCATION="eastus"
AZURE_CONTAINER_REGISTRY="lexovaregistry"
AZURE_CONTAINER_APP_NAME="lexova-backend"
AZURE_CONTAINER_APP_ENV="lexova-env"
CONTAINER_IMAGE_NAME="lexova-backend"
CONTAINER_IMAGE_TAG="latest"
MIN_REPLICAS=1
MAX_REPLICAS=10
CPU="1.0"
MEMORY="2Gi"

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "Azure CLI is not installed. Please install it first."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install it first."
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

# Create Azure Container Registry if it doesn't exist
echo "Creating Azure Container Registry if it doesn't exist..."
az acr show --name "$AZURE_CONTAINER_REGISTRY" --resource-group "$AZURE_RESOURCE_GROUP" > /dev/null 2>&1 || {
    echo "Creating Azure Container Registry: $AZURE_CONTAINER_REGISTRY"
    az acr create --name "$AZURE_CONTAINER_REGISTRY" --resource-group "$AZURE_RESOURCE_GROUP" --sku Basic --admin-enabled true
}

# Get ACR credentials
echo "Getting ACR credentials..."
ACR_USERNAME=$(az acr credential show --name "$AZURE_CONTAINER_REGISTRY" --resource-group "$AZURE_RESOURCE_GROUP" --query "username" -o tsv)
ACR_PASSWORD=$(az acr credential show --name "$AZURE_CONTAINER_REGISTRY" --resource-group "$AZURE_RESOURCE_GROUP" --query "passwords[0].value" -o tsv)
ACR_LOGIN_SERVER=$(az acr show --name "$AZURE_CONTAINER_REGISTRY" --resource-group "$AZURE_RESOURCE_GROUP" --query "loginServer" -o tsv)

# Login to ACR
echo "Logging in to ACR..."
echo "$ACR_PASSWORD" | docker login "$ACR_LOGIN_SERVER" -u "$ACR_USERNAME" --password-stdin

# Create Dockerfile if it doesn't exist
if [ ! -f "../backend/lexova_backend/Dockerfile" ]; then
    echo "Creating Dockerfile..."
    cat > ../backend/lexova_backend/Dockerfile << EOF
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONPATH=/app
ENV FLASK_APP=src/main.py
ENV FLASK_ENV=production

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "--threads", "2", "src.main:app"]
EOF
fi

# Build and push Docker image
echo "Building and pushing Docker image..."
cd ../backend/lexova_backend
docker build -t "$ACR_LOGIN_SERVER/$CONTAINER_IMAGE_NAME:$CONTAINER_IMAGE_TAG" .
docker push "$ACR_LOGIN_SERVER/$CONTAINER_IMAGE_NAME:$CONTAINER_IMAGE_TAG"
cd -

# Create Key Vault for secrets
echo "Creating Key Vault for secrets..."
KEYVAULT_NAME="lexova-kv"
az keyvault show --name "$KEYVAULT_NAME" --resource-group "$AZURE_RESOURCE_GROUP" > /dev/null 2>&1 || {
    echo "Creating Key Vault: $KEYVAULT_NAME"
    az keyvault create --name "$KEYVAULT_NAME" --resource-group "$AZURE_RESOURCE_GROUP" --location "$AZURE_LOCATION"
}

# Create secrets in Key Vault
echo "Creating secrets in Key Vault..."
read -p "Enter MongoDB connection string: " MONGO_URI
az keyvault secret set --vault-name "$KEYVAULT_NAME" --name "MONGO-URI" --value "$MONGO_URI"

JWT_SECRET_KEY=$(openssl rand -base64 32)
az keyvault secret set --vault-name "$KEYVAULT_NAME" --name "JWT-SECRET-KEY" --value "$JWT_SECRET_KEY"

read -p "Enter OpenAI API key: " OPENAI_API_KEY
az keyvault secret set --vault-name "$KEYVAULT_NAME" --name "OPENAI-API-KEY" --value "$OPENAI_API_KEY"

# Enable Container Apps extension
echo "Enabling Container Apps extension..."
az extension add --name containerapp --upgrade

# Create Container Apps environment if it doesn't exist
echo "Creating Container Apps environment if it doesn't exist..."
az containerapp env show --name "$AZURE_CONTAINER_APP_ENV" --resource-group "$AZURE_RESOURCE_GROUP" > /dev/null 2>&1 || {
    echo "Creating Container Apps environment: $AZURE_CONTAINER_APP_ENV"
    az containerapp env create --name "$AZURE_CONTAINER_APP_ENV" --resource-group "$AZURE_RESOURCE_GROUP" --location "$AZURE_LOCATION"
}

# Create managed identity for Container App
echo "Creating managed identity for Container App..."
IDENTITY_NAME="$AZURE_CONTAINER_APP_NAME-identity"
IDENTITY_ID=$(az identity create --name "$IDENTITY_NAME" --resource-group "$AZURE_RESOURCE_GROUP" --query "id" -o tsv)

# Grant Key Vault access to managed identity
echo "Granting Key Vault access to managed identity..."
IDENTITY_PRINCIPAL_ID=$(az identity show --name "$IDENTITY_NAME" --resource-group "$AZURE_RESOURCE_GROUP" --query "principalId" -o tsv)
az keyvault set-policy --name "$KEYVAULT_NAME" --object-id "$IDENTITY_PRINCIPAL_ID" --secret-permissions get list

# Deploy to Container Apps
echo "Deploying to Container Apps..."
az containerapp create \
    --name "$AZURE_CONTAINER_APP_NAME" \
    --resource-group "$AZURE_RESOURCE_GROUP" \
    --environment "$AZURE_CONTAINER_APP_ENV" \
    --image "$ACR_LOGIN_SERVER/$CONTAINER_IMAGE_NAME:$CONTAINER_IMAGE_TAG" \
    --registry-server "$ACR_LOGIN_SERVER" \
    --registry-username "$ACR_USERNAME" \
    --registry-password "$ACR_PASSWORD" \
    --target-port 5000 \
    --ingress external \
    --min-replicas $MIN_REPLICAS \
    --max-replicas $MAX_REPLICAS \
    --cpu $CPU \
    --memory $MEMORY \
    --user-assigned "$IDENTITY_ID" \
    --secrets "mongoUri=keyvault:https://$KEYVAULT_NAME.vault.azure.net/secrets/MONGO-URI" \
    --secrets "jwtSecretKey=keyvault:https://$KEYVAULT_NAME.vault.azure.net/secrets/JWT-SECRET-KEY" \
    --secrets "openaiApiKey=keyvault:https://$KEYVAULT_NAME.vault.azure.net/secrets/OPENAI-API-KEY" \
    --env-vars "MONGO_URI=secretref:mongoUri" "JWT_SECRET_KEY=secretref:jwtSecretKey" "OPENAI_API_KEY=secretref:openaiApiKey"

# Get Container App URL
APP_URL=$(az containerapp show --name "$AZURE_CONTAINER_APP_NAME" --resource-group "$AZURE_RESOURCE_GROUP" --query "properties.configuration.ingress.fqdn" -o tsv)
echo "Deployment completed successfully!"
echo "Backend API is available at: https://$APP_URL"

exit 0

