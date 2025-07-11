#!/bin/bash

# Byte UI Development Server Auto-Restart Script
# This script automatically restarts the development server if it crashes

echo "🚀 Starting Byte UI Development Server with Auto-Restart..."
echo "📍 URL: http://localhost:9000"
echo "🔄 Auto-restart enabled - Server will restart if it crashes"
echo "🛑 Press Ctrl+C to stop"
echo "----------------------------------------"

# Function to start the server
start_server() {
    echo "🔄 Starting development server..."
    npm run dev &
    SERVER_PID=$!
    echo "✅ Server started with PID: $SERVER_PID"
}

# Function to check if server is running
is_server_running() {
    if curl -s http://localhost:9000 > /dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping development server..."
    if [ ! -z "$SERVER_PID" ]; then
        kill $SERVER_PID 2>/dev/null
    fi
    # Kill any remaining webpack processes
    pkill -f "webpack serve" 2>/dev/null
    echo "✅ Development server stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start the server initially
start_server

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 5

# Monitor loop
while true; do
    if is_server_running; then
        echo "✅ Server is running ($(date))"
    else
        echo "❌ Server is not responding! Restarting..."

        # Kill existing server process
        if [ ! -z "$SERVER_PID" ]; then
            kill $SERVER_PID 2>/dev/null
        fi
        pkill -f "webpack serve" 2>/dev/null

        # Wait a bit before restarting
        sleep 3

        # Restart server
        start_server

        # Wait for restart
        sleep 5
    fi

    # Check every 10 seconds
    sleep 10
done
