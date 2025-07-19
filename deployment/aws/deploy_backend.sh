#!/bin/bash

# Lexova Platform - AWS Backend Deployment Script
# This script deploys the Lexova backend to AWS ECS

set -e

# Configuration
AWS_REGION="us-east-1"
ECR_REPOSITORY_NAME="lexova-backend"
ECS_CLUSTER_NAME="lexova-cluster"
ECS_SERVICE_NAME="lexova-backend-service"
ECS_TASK_FAMILY="lexova-backend-task"
CONTAINER_NAME="lexova-backend"
CONTAINER_PORT=5000
HOST_PORT=80
CPU_UNITS=256
MEMORY=512
DESIRED_COUNT=2

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install it first."
    exit 1
fi

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "jq is not installed. Please install it first."
    exit 1
fi

# Ensure AWS credentials are configured
echo "Checking AWS credentials..."
aws sts get-caller-identity > /dev/null || {
    echo "AWS credentials not configured. Please run 'aws configure' first."
    exit 1
}

# Create ECR repository if it doesn't exist
echo "Creating ECR repository if it doesn't exist..."
aws ecr describe-repositories --repository-names ${ECR_REPOSITORY_NAME} --region ${AWS_REGION} > /dev/null 2>&1 || {
    echo "Creating ECR repository: ${ECR_REPOSITORY_NAME}"
    aws ecr create-repository --repository-name ${ECR_REPOSITORY_NAME} --region ${AWS_REGION}
}

# Get ECR repository URI
ECR_REPOSITORY_URI=$(aws ecr describe-repositories --repository-names ${ECR_REPOSITORY_NAME} --region ${AWS_REGION} | jq -r '.repositories[0].repositoryUri')
echo "ECR Repository URI: ${ECR_REPOSITORY_URI}"

# Login to ECR
echo "Logging in to ECR..."
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPOSITORY_URI}

# Build Docker image
echo "Building Docker image..."
docker build -t ${ECR_REPOSITORY_NAME}:latest ../backend/lexova_backend

# Tag and push Docker image
echo "Tagging and pushing Docker image..."
docker tag ${ECR_REPOSITORY_NAME}:latest ${ECR_REPOSITORY_URI}:latest
docker push ${ECR_REPOSITORY_URI}:latest

# Create ECS cluster if it doesn't exist
echo "Creating ECS cluster if it doesn't exist..."
aws ecs describe-clusters --clusters ${ECS_CLUSTER_NAME} --region ${AWS_REGION} | jq -r '.clusters[] | select(.status == "ACTIVE")' > /dev/null 2>&1 || {
    echo "Creating ECS cluster: ${ECS_CLUSTER_NAME}"
    aws ecs create-cluster --cluster-name ${ECS_CLUSTER_NAME} --region ${AWS_REGION}
}

# Create task definition
echo "Creating ECS task definition..."
cat > task-definition.json << EOF
{
    "family": "${ECS_TASK_FAMILY}",
    "networkMode": "awsvpc",
    "executionRoleArn": "arn:aws:iam::$(aws sts get-caller-identity | jq -r '.Account'):role/ecsTaskExecutionRole",
    "containerDefinitions": [
        {
            "name": "${CONTAINER_NAME}",
            "image": "${ECR_REPOSITORY_URI}:latest",
            "essential": true,
            "portMappings": [
                {
                    "containerPort": ${CONTAINER_PORT},
                    "hostPort": ${HOST_PORT},
                    "protocol": "tcp"
                }
            ],
            "environment": [
                {
                    "name": "MONGO_URI",
                    "value": "mongodb://mongodb.lexova.internal:27017/lexova_db"
                },
                {
                    "name": "JWT_SECRET_KEY",
                    "value": "lexova-jwt-secret-key-2024"
                },
                {
                    "name": "OPENAI_API_KEY",
                    "value": ""
                }
            ],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-group": "/ecs/${ECS_TASK_FAMILY}",
                    "awslogs-region": "${AWS_REGION}",
                    "awslogs-stream-prefix": "ecs"
                }
            }
        }
    ],
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "cpu": "${CPU_UNITS}",
    "memory": "${MEMORY}"
}
EOF

# Register task definition
echo "Registering task definition..."
TASK_DEFINITION_ARN=$(aws ecs register-task-definition --cli-input-json file://task-definition.json --region ${AWS_REGION} | jq -r '.taskDefinition.taskDefinitionArn')
echo "Task definition ARN: ${TASK_DEFINITION_ARN}"

# Check if service exists
SERVICE_EXISTS=$(aws ecs describe-services --cluster ${ECS_CLUSTER_NAME} --services ${ECS_SERVICE_NAME} --region ${AWS_REGION} | jq -r '.services[] | select(.status == "ACTIVE") | .serviceName')

if [ -z "$SERVICE_EXISTS" ]; then
    # Create service
    echo "Creating ECS service..."
    aws ecs create-service \
        --cluster ${ECS_CLUSTER_NAME} \
        --service-name ${ECS_SERVICE_NAME} \
        --task-definition ${TASK_DEFINITION_ARN} \
        --desired-count ${DESIRED_COUNT} \
        --launch-type FARGATE \
        --network-configuration "awsvpcConfiguration={subnets=[subnet-12345678,subnet-87654321],securityGroups=[sg-12345678],assignPublicIp=ENABLED}" \
        --region ${AWS_REGION}
else
    # Update service
    echo "Updating ECS service..."
    aws ecs update-service \
        --cluster ${ECS_CLUSTER_NAME} \
        --service ${ECS_SERVICE_NAME} \
        --task-definition ${TASK_DEFINITION_ARN} \
        --desired-count ${DESIRED_COUNT} \
        --region ${AWS_REGION}
fi

echo "Deployment completed successfully!"
echo "Note: You need to replace subnet IDs and security group IDs with your actual values."
echo "You may also need to set up a load balancer for your service."

# Clean up
rm task-definition.json

exit 0

