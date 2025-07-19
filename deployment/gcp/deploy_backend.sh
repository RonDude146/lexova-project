#!/bin/bash

# Lexova Platform - Google Cloud Platform Backend Deployment Script
# This script deploys the Lexova backend to Google Cloud Run

set -e

# Configuration
GCP_PROJECT_ID="lexova-platform"
GCP_REGION="us-central1"
SERVICE_NAME="lexova-backend"
CONTAINER_REGISTRY="gcr.io"
CONTAINER_IMAGE="${CONTAINER_REGISTRY}/${GCP_PROJECT_ID}/${SERVICE_NAME}"
MIN_INSTANCES=1
MAX_INSTANCES=10
MEMORY="512Mi"
CPU="1"
CONCURRENCY=80
TIMEOUT="300s"

# Check if gcloud CLI is installed
if ! command -v gcloud &> /dev/null; then
    echo "Google Cloud SDK is not installed. Please install it first."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install it first."
    exit 1
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
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable secretmanager.googleapis.com

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

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 src.main:app
EOF
fi

# Create .dockerignore if it doesn't exist
if [ ! -f "../backend/lexova_backend/.dockerignore" ]; then
    echo "Creating .dockerignore..."
    cat > ../backend/lexova_backend/.dockerignore << EOF
Dockerfile
.dockerignore
.git
.gitignore
.env
venv/
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
env/
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
*.egg-info/
.installed.cfg
*.egg
EOF
fi

# Build and push Docker image
echo "Building and pushing Docker image..."
cd ../backend/lexova_backend
gcloud builds submit --tag ${CONTAINER_IMAGE}
cd -

# Create MongoDB Atlas connection string secret
echo "Creating MongoDB connection string secret..."
read -p "Enter MongoDB Atlas connection string: " MONGO_URI
echo -n "${MONGO_URI}" | gcloud secrets create mongodb-uri --data-file=-

# Create JWT secret key
echo "Creating JWT secret key..."
JWT_SECRET_KEY=$(openssl rand -base64 32)
echo -n "${JWT_SECRET_KEY}" | gcloud secrets create jwt-secret-key --data-file=-

# Create OpenAI API key secret
echo "Creating OpenAI API key secret..."
read -p "Enter OpenAI API key: " OPENAI_API_KEY
echo -n "${OPENAI_API_KEY}" | gcloud secrets create openai-api-key --data-file=-

# Deploy to Cloud Run
echo "Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
    --image ${CONTAINER_IMAGE} \
    --platform managed \
    --region ${GCP_REGION} \
    --min-instances ${MIN_INSTANCES} \
    --max-instances ${MAX_INSTANCES} \
    --memory ${MEMORY} \
    --cpu ${CPU} \
    --concurrency ${CONCURRENCY} \
    --timeout ${TIMEOUT} \
    --set-secrets=MONGO_URI=mongodb-uri:latest,JWT_SECRET_KEY=jwt-secret-key:latest,OPENAI_API_KEY=openai-api-key:latest \
    --allow-unauthenticated

# Get service URL
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --platform managed --region ${GCP_REGION} --format 'value(status.url)')
echo "Service deployed successfully to: ${SERVICE_URL}"

# Create Cloud Run service account
echo "Creating Cloud Run service account..."
SERVICE_ACCOUNT="${SERVICE_NAME}-sa"
gcloud iam service-accounts create ${SERVICE_ACCOUNT} \
    --display-name="Service Account for ${SERVICE_NAME}"

# Grant permissions to service account
echo "Granting permissions to service account..."
gcloud projects add-iam-policy-binding ${GCP_PROJECT_ID} \
    --member="serviceAccount:${SERVICE_ACCOUNT}@${GCP_PROJECT_ID}.iam.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor"

# Update service to use service account
echo "Updating service to use service account..."
gcloud run services update ${SERVICE_NAME} \
    --platform managed \
    --region ${GCP_REGION} \
    --service-account ${SERVICE_ACCOUNT}@${GCP_PROJECT_ID}.iam.gserviceaccount.com

echo "Deployment completed successfully!"
echo "Backend API is available at: ${SERVICE_URL}"

exit 0

