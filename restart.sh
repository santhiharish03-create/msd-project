#!/bin/bash
echo "Killing existing processes..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:5000 | xargs kill -9 2>/dev/null

echo "Starting backend..."
cd backend && npm run dev &

echo "Waiting 3 seconds..."
sleep 3

echo "Starting frontend..."
cd ../timetable && npm run dev &

echo "System restarted!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:5000"