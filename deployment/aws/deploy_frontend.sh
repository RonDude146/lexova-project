#!/bin/bash

# Lexova Platform - AWS Frontend Deployment Script
# This script deploys the Lexova frontend to AWS S3 and CloudFront

set -e

# Configuration
AWS_REGION="us-east-1"
S3_BUCKET_NAME="lexova-frontend"
CLOUDFRONT_DISTRIBUTION_ID=""  # Will be set after creation
DOMAIN_NAME="lexova.com"
CERTIFICATE_ARN=""  # Will be set after creation

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "AWS CLI is not installed. Please install it first."
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

# Build the React application
echo "Building React application..."
cd ../frontend/lexova_frontend
npm install
npm run build
cd -

# Create S3 bucket if it doesn't exist
echo "Creating S3 bucket if it doesn't exist..."
aws s3api head-bucket --bucket ${S3_BUCKET_NAME} --region ${AWS_REGION} 2>/dev/null || {
    echo "Creating S3 bucket: ${S3_BUCKET_NAME}"
    aws s3api create-bucket --bucket ${S3_BUCKET_NAME} --region ${AWS_REGION}
}

# Configure S3 bucket for static website hosting
echo "Configuring S3 bucket for static website hosting..."
aws s3 website s3://${S3_BUCKET_NAME} --index-document index.html --error-document index.html

# Set bucket policy to allow public read access
echo "Setting bucket policy..."
cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${S3_BUCKET_NAME}/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy --bucket ${S3_BUCKET_NAME} --policy file://bucket-policy.json

# Upload files to S3
echo "Uploading files to S3..."
aws s3 sync ../frontend/lexova_frontend/build/ s3://${S3_BUCKET_NAME}/ --delete

# Request SSL certificate if not already provided
if [ -z "$CERTIFICATE_ARN" ]; then
    echo "Requesting SSL certificate..."
    CERTIFICATE_ARN=$(aws acm request-certificate \
        --domain-name ${DOMAIN_NAME} \
        --validation-method DNS \
        --region ${AWS_REGION} \
        --output json | jq -r '.CertificateArn')
    
    echo "Certificate ARN: ${CERTIFICATE_ARN}"
    echo "Please add the DNS validation records and press Enter when validation is complete..."
    read -p "Press Enter to continue..."
fi

# Create CloudFront distribution if it doesn't exist
if [ -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    echo "Creating CloudFront distribution..."
    
    # Create CloudFront distribution configuration
    cat > cloudfront-config.json << EOF
{
    "CallerReference": "lexova-$(date +%s)",
    "Aliases": {
        "Quantity": 1,
        "Items": ["${DOMAIN_NAME}"]
    },
    "DefaultRootObject": "index.html",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-${S3_BUCKET_NAME}",
                "DomainName": "${S3_BUCKET_NAME}.s3.amazonaws.com",
                "S3OriginConfig": {
                    "OriginAccessIdentity": ""
                }
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-${S3_BUCKET_NAME}",
        "ViewerProtocolPolicy": "redirect-to-https",
        "AllowedMethods": {
            "Quantity": 2,
            "Items": ["GET", "HEAD"],
            "CachedMethods": {
                "Quantity": 2,
                "Items": ["GET", "HEAD"]
            }
        },
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {
                "Forward": "none"
            }
        },
        "MinTTL": 0,
        "DefaultTTL": 86400,
        "MaxTTL": 31536000
    },
    "CustomErrorResponses": {
        "Quantity": 1,
        "Items": [
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 300
            }
        ]
    },
    "Comment": "Lexova Frontend Distribution",
    "Enabled": true,
    "ViewerCertificate": {
        "ACMCertificateArn": "${CERTIFICATE_ARN}",
        "SSLSupportMethod": "sni-only",
        "MinimumProtocolVersion": "TLSv1.2_2019"
    }
}
EOF

    # Create CloudFront distribution
    DISTRIBUTION_INFO=$(aws cloudfront create-distribution --distribution-config file://cloudfront-config.json --region ${AWS_REGION})
    CLOUDFRONT_DISTRIBUTION_ID=$(echo ${DISTRIBUTION_INFO} | jq -r '.Distribution.Id')
    CLOUDFRONT_DOMAIN_NAME=$(echo ${DISTRIBUTION_INFO} | jq -r '.Distribution.DomainName')
    
    echo "CloudFront Distribution ID: ${CLOUDFRONT_DISTRIBUTION_ID}"
    echo "CloudFront Domain Name: ${CLOUDFRONT_DOMAIN_NAME}"
    
    echo "Please create a DNS record for ${DOMAIN_NAME} pointing to ${CLOUDFRONT_DOMAIN_NAME}"
else
    # Update existing CloudFront distribution
    echo "Updating CloudFront distribution..."
    
    # Get current distribution config
    aws cloudfront get-distribution-config --id ${CLOUDFRONT_DISTRIBUTION_ID} --region ${AWS_REGION} > distribution-config.json
    
    # Extract ETag
    ETAG=$(jq -r '.ETag' distribution-config.json)
    
    # Update distribution config
    jq '.DistributionConfig' distribution-config.json > updated-config.json
    
    # Update CloudFront distribution
    aws cloudfront update-distribution --id ${CLOUDFRONT_DISTRIBUTION_ID} --distribution-config file://updated-config.json --if-match ${ETAG} --region ${AWS_REGION}
    
    # Invalidate CloudFront cache
    echo "Invalidating CloudFront cache..."
    aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths "/*" --region ${AWS_REGION}
fi

echo "Deployment completed successfully!"
echo "Your frontend is now available at: https://${DOMAIN_NAME}"

# Clean up
rm -f bucket-policy.json cloudfront-config.json distribution-config.json updated-config.json

exit 0

