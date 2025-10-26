#!/bin/bash

echo "Starting CoolAir Development Environment..."
echo "========================================"

echo "Starting Backend API..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

sleep 5

echo "Starting Main Website..."
npm run dev &
MAIN_PID=$!

sleep 5

echo "Starting Admin Panel..."
cd admin-panel
npm run dev &
ADMIN_PID=$!
cd ..

echo "========================================"
echo "All services started successfully!"
echo "Main Website: http://localhost:3000"
echo "Admin Panel: http://localhost:3001"
echo "Backend API: http://localhost:5000"
echo "========================================"

# Function to stop all processes on exit
cleanup() {
    echo "Stopping all services..."
    kill $BACKEND_PID $MAIN_PID $ADMIN_PID 2>/dev/null
    echo "All services stopped."
    exit 0
}

# Trap exit signals
trap cleanup EXIT INT TERM

# Wait for processes to complete
wait $BACKEND_PID $MAIN_PID $ADMIN_PID