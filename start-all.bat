@echo off
echo Starting CoolAir Development Environment...
echo ========================================

echo Starting Backend API...
start "Backend API" cmd /k "cd backend && npm run dev"

timeout /t 5 /nobreak >nul

echo Starting Main Website...
start "Main Website" cmd /k "npm run dev"

timeout /t 5 /nobreak >nul

echo Starting Admin Panel...
start "Admin Panel" cmd /k "cd admin-panel && npm run dev"

echo ========================================
echo All services started successfully!
echo Main Website: http://localhost:3000
echo Admin Panel: http://localhost:3001
echo Backend API: http://localhost:5000
echo ========================================