# Lexova Platform Deployment

This directory contains all the necessary scripts and documentation for deploying the Lexova platform to various cloud providers.

## Directory Structure

- **aws/**: Deployment scripts for Amazon Web Services
- **gcp/**: Deployment scripts for Google Cloud Platform
- **azure/**: Deployment scripts for Microsoft Azure
- **docs/**: Comprehensive documentation for migration and deployment
- **.github/workflows/**: CI/CD pipeline configuration for GitHub Actions

## Deployment Options

### AWS Deployment

The AWS deployment uses the following services:
- **Frontend**: Amazon S3 + CloudFront
- **Backend**: Amazon ECS (Elastic Container Service)
- **Database**: MongoDB Atlas (AWS)
- **File Storage**: Amazon S3

To deploy to AWS:
```bash
# Deploy backend
cd aws
./deploy_backend.sh

# Deploy frontend
./deploy_frontend.sh
```

### Google Cloud Platform Deployment

The GCP deployment uses the following services:
- **Frontend**: Firebase Hosting
- **Backend**: Google Cloud Run
- **Database**: MongoDB Atlas (GCP)
- **File Storage**: Google Cloud Storage

To deploy to GCP:
```bash
# Deploy backend
cd gcp
./deploy_backend.sh

# Deploy frontend
./deploy_frontend.sh
```

### Azure Deployment

The Azure deployment uses the following services:
- **Frontend**: Azure Static Web Apps
- **Database**: MongoDB Atlas (Azure)
- **Backend**: Azure Container Apps
- **File Storage**: Azure Blob Storage

To deploy to Azure:
```bash
# Deploy backend
cd azure
./deploy_backend.sh

# Deploy frontend
./deploy_frontend.sh
```

## Database Migration

To migrate your MongoDB database from a local or free-tier instance to a managed cloud instance:

```bash
./migrate_mongodb.sh
```

You will be prompted to enter the target MongoDB URI.

## CI/CD Pipeline

The repository includes GitHub Actions workflows for continuous integration and deployment:

- **Backend Tests**: Run unit and integration tests for the backend
- **Frontend Tests**: Run unit tests and linting for the frontend
- **Backend Build**: Build and push Docker image for the backend
- **Frontend Build**: Build the React application
- **Deployment**: Deploy to development, staging, or production environments

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- **migration_guide.md**: Detailed guide for migrating from free hosting to paid hosting
- **cloud_cost_estimation.md**: Cost estimates for different cloud providers

## Prerequisites

Before deploying, ensure you have the following:

1. **AWS Deployment**:
   - AWS CLI installed and configured
   - Docker installed
   - jq installed

2. **GCP Deployment**:
   - Google Cloud SDK installed and configured
   - Docker installed
   - Firebase CLI installed

3. **Azure Deployment**:
   - Azure CLI installed and configured
   - Docker installed

## Security Considerations

- All scripts use environment variables or prompt for sensitive information
- No credentials are hardcoded in the scripts
- Cloud provider secrets management services are used for storing sensitive information
- HTTPS is enforced for all endpoints

## Support

For any issues or questions regarding deployment, please contact the Lexova platform support team.

