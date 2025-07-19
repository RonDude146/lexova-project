# Lexova Platform Deployment Guide for Free Hosting

This guide provides instructions for deploying the Lexova platform on various free hosting providers.

## Replit Deployment

### Backend Deployment

1. Create a new Repl and select "Import from GitHub"
2. Enter the repository URL or upload the backend folder
3. Select "Node.js" as the language
4. Add the following to the `.replit` file:

```
run = "cd backend/lexova_backend && pip install -r requirements.txt && python src/main.py"
```

5. Create a `.env` file based on the `.env.example` and add your environment variables
6. Click "Run" to start the backend server

### Frontend Deployment

1. Create a new Repl and select "Import from GitHub"
2. Enter the repository URL or upload the frontend folder
3. Select "Node.js" as the language
4. Add the following to the `.replit` file:

```
run = "cd frontend/lexova_frontend && npm install && npm start"
```

5. Create a `.env` file based on the `.env.example` and update the API URL to point to your backend Repl
6. Click "Run" to start the frontend server

## Vercel Deployment

### Frontend Deployment

1. Fork the repository to your GitHub account
2. Log in to Vercel and click "New Project"
3. Import the repository from GitHub
4. Configure the project:
   - Framework Preset: Create React App
   - Root Directory: frontend/lexova_frontend
   - Build Command: npm run build
   - Output Directory: build
5. Add environment variables from `.env.example`
6. Click "Deploy"

### Backend Deployment (Alternative: Railway)

Since Vercel is primarily for frontend applications, you can use Railway for the backend:

1. Log in to Railway and click "New Project"
2. Select "Deploy from GitHub"
3. Import the repository
4. Configure the project:
   - Root Directory: backend/lexova_backend
   - Start Command: python src/main.py
5. Add environment variables from `.env.example`
6. Click "Deploy"

## Railway Deployment

Railway can host both the frontend and backend:

### Backend Deployment

1. Log in to Railway and click "New Project"
2. Select "Deploy from GitHub"
3. Import the repository
4. Configure the project:
   - Root Directory: backend/lexova_backend
   - Start Command: python src/main.py
5. Add environment variables from `.env.example`
6. Click "Deploy"

### Frontend Deployment

1. Create a new project in Railway
2. Select "Deploy from GitHub"
3. Import the repository
4. Configure the project:
   - Root Directory: frontend/lexova_frontend
   - Build Command: npm run build
   - Start Command: npx serve -s build
5. Add environment variables from `.env.example`, updating the API URL to point to your backend service
6. Click "Deploy"

## MongoDB Setup

For all deployments, you'll need a MongoDB database:

1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string
5. Add the connection string to your backend environment variables as `MONGO_URI`

## Important Notes

1. Update the `REACT_APP_API_URL` in the frontend `.env` file to point to your deployed backend URL
2. Ensure CORS is properly configured in the backend to accept requests from your frontend domain
3. For production deployments, use secure JWT secrets and API keys
4. MongoDB Atlas free tier has limitations on storage and connections

