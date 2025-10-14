#!/bin/bash

# Docker deployment script for Totunik.ro
# This script helps manage the Docker containers and ensures uploads are properly mounted

set -e

echo "🚀 Totunik.ro Docker Deployment Script"
echo "======================================"

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo "❌ Docker is not running. Please start Docker and try again."
        exit 1
    fi
    echo "✅ Docker is running"
}

# Function to ensure uploads directory exists
ensure_uploads_dir() {
    if [ ! -d "./apps/cms/public/uploads" ]; then
        echo "📁 Creating uploads directory..."
        mkdir -p ./apps/cms/public/uploads
        chmod 755 ./apps/cms/public/uploads
    fi
    echo "✅ Uploads directory exists: $(ls -la ./apps/cms/public/uploads | wc -l) files"
}

# Function to stop and remove existing containers
cleanup_containers() {
    echo "🧹 Cleaning up existing containers..."
    docker-compose down --remove-orphans || true

    # Remove any dangling containers
    docker container prune -f || true
    echo "✅ Cleanup complete"
}

# Function to build images
build_images() {
    echo "🔨 Building Docker images..."
    docker-compose build --no-cache
    echo "✅ Images built successfully"
}

# Function to start containers
start_containers() {
    echo "🚀 Starting containers..."
    docker-compose up -d
    echo "✅ Containers started"
}

# Function to show container status
show_status() {
    echo ""
    echo "📊 Container Status:"
    echo "==================="
    docker-compose ps

    echo ""
    echo "📁 Uploads Directory Status:"
    echo "============================"
    echo "Host directory: $(ls -la ./apps/cms/public/uploads | wc -l) files"

    # Check if CMS container is running and show uploads inside container
    if docker-compose ps cms | grep -q "Up"; then
        echo "Container directory: $(docker-compose exec cms ls -la /app/public/uploads | wc -l) files"
    else
        echo "Container directory: CMS container not running"
    fi
}

# Function to show logs
show_logs() {
    echo ""
    echo "📋 Recent Logs:"
    echo "==============="
    docker-compose logs --tail=20
}

# Main deployment function
deploy() {
    check_docker
    ensure_uploads_dir
    cleanup_containers
    build_images
    start_containers

    # Wait a moment for containers to start
    echo "⏳ Waiting for containers to start..."
    sleep 5

    show_status

    echo ""
    echo "🎉 Deployment complete!"
    echo ""
    echo "🌐 Services available at:"
    echo "  - CMS (Strapi): http://localhost:20001"
    echo "  - Web (Next.js): http://localhost:20002"
    echo ""
    echo "📝 To view logs: docker-compose logs -f"
    echo "🛑 To stop: docker-compose down"
}

# Parse command line arguments
case "${1:-deploy}" in
    "deploy")
        deploy
        ;;
    "status")
        show_status
        ;;
    "logs")
        show_logs
        ;;
    "stop")
        echo "🛑 Stopping containers..."
        docker-compose down
        echo "✅ Containers stopped"
        ;;
    "restart")
        echo "🔄 Restarting containers..."
        docker-compose restart
        show_status
        ;;
    "clean")
        echo "🧹 Performing deep cleanup..."
        docker-compose down --volumes --remove-orphans
        docker system prune -f
        echo "✅ Deep cleanup complete"
        ;;
    *)
        echo "Usage: $0 [deploy|status|logs|stop|restart|clean]"
        echo ""
        echo "Commands:"
        echo "  deploy   - Full deployment (default)"
        echo "  status   - Show container and uploads status"
        echo "  logs     - Show recent container logs"
        echo "  stop     - Stop all containers"
        echo "  restart  - Restart all containers"
        echo "  clean    - Deep cleanup (removes volumes)"
        exit 1
        ;;
esac
