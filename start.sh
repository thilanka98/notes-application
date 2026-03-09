#!/bin/bash

# Notes App Startup Script

echo "🚀 Starting Notes App..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "Please create a .env file with the required environment variables."
    echo "See README.md for details."
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

echo "📦 Building and starting containers..."
docker-compose up --build -d

echo "⏳ Waiting for services to be ready..."
sleep 10

echo "✅ Application is running!"
echo "🌐 Frontend: http://localhost"
echo "🔌 API: http://localhost/api/"
echo "👨‍💼 Admin: http://localhost/admin/"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop: docker-compose down"