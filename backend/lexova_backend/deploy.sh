#!/bin/bash

# Lexova Backend Deployment Script
# This script prepares and deploys the Lexova backend to a free hosting service

echo "Starting Lexova Backend Deployment..."

# Navigate to the backend directory
cd /home/ubuntu/lexova_platform/backend/lexova_backend

# Activate virtual environment
source venv/bin/activate

# Install production dependencies
echo "Installing production dependencies..."
pip install gunicorn
pip install -r requirements.txt

# Run tests
echo "Running tests..."
python -m unittest discover -s tests

# Check if tests passed
if [ $? -ne 0 ]; then
    echo "Tests failed! Deployment aborted."
    exit 1
fi

# Create production configuration
echo "Creating production configuration..."
cat > src/config.py << EOL
"""
Production configuration for Lexova backend
"""

import os
from datetime import timedelta

# MongoDB configuration
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/lexova_db')

# JWT configuration
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'lexova-jwt-secret-key-2024')
JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)

# OpenAI configuration
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', '')

# Application configuration
DEBUG = False
TESTING = False
EOL

# Create Procfile for deployment
echo "Creating Procfile..."
cat > Procfile << EOL
web: gunicorn --chdir src main:app
EOL

# Create runtime.txt for Python version
echo "Creating runtime.txt..."
echo "python-3.11.0" > runtime.txt

# Create app.json for deployment configuration
echo "Creating app.json..."
cat > app.json << EOL
{
  "name": "Lexova Backend",
  "description": "AI-powered legal services platform backend",
  "repository": "https://github.com/lexova/lexova-platform",
  "keywords": ["python", "flask", "mongodb", "legal", "ai"],
  "env": {
    "MONGO_URI": {
      "description": "MongoDB connection URI",
      "value": "mongodb://localhost:27017/lexova_db"
    },
    "JWT_SECRET_KEY": {
      "description": "Secret key for JWT token generation",
      "generator": "secret"
    },
    "OPENAI_API_KEY": {
      "description": "OpenAI API key for AI features",
      "value": ""
    }
  },
  "buildpacks": [
    {
      "url": "heroku/python"
    }
  ]
}
EOL

# Create .gitignore file
echo "Creating .gitignore..."
cat > .gitignore << EOL
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
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

# Virtual Environment
venv/
ENV/

# IDE files
.idea/
.vscode/
*.swp
*.swo

# Environment variables
.env

# Logs
*.log
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
echo "  - For Heroku: git push heroku main"
echo "  - For Render: git push render main"
echo "  - For Vercel: vercel --prod"

# For this example, we'll use the service_deploy_backend tool
echo "Using service_deploy_backend tool for deployment..."

echo "Backend deployment preparation complete!"
exit 0

