#!/bin/bash

# Pull the latest changes from GitHub
git pull origin main

# Install any new dependencies
npm install

# Rebuild the Next.js application
npm run build

# Restart the application using PM2
pm2 restart timeline-dina-nashiir
