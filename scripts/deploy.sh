#!/bin/bash

# Sky3D Deployment Script
# This script automates the deployment process for both frontend and backend

set -e  # Exit on error

echo "🚀 Starting Sky3D Deployment..."

# Configuration
PROJECT_DIR="/var/www/sky3d"
FRONTEND_DIR="$PROJECT_DIR/frontend"
BACKEND_DIR="$PROJECT_DIR/backend"

# Frontend deployment
echo "📦 Building frontend..."
cd $FRONTEND_DIR
npm install
npm run build

echo "✅ Frontend build complete"

# Backend deployment
echo "📦 Building backend..."
cd $BACKEND_DIR
npm install --production
NODE_ENV=production npm run build

echo "🔄 Restarting backend..."
pm2 restart sky3d-backend

echo "✅ Backend deployment complete"

# Health check
echo "🏥 Performing health check..."
sleep 3

if pm2 list | grep -q "sky3d-backend.*online"; then
    echo "✅ Backend is running"
else
    echo "❌ Backend failed to start"
    exit 1
fi

echo "🎉 Deployment successful!"
echo "Frontend: Serving from $FRONTEND_DIR/dist"
echo "Backend: Running on PM2"

