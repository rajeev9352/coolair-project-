@echo off
echo =====================================
echo    CoolAir PostgreSQL Setup Guide
echo =====================================
echo.

REM Check if PostgreSQL is already installed
psql --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ PostgreSQL is already installed!
    psql --version
    echo.
    goto :create_db
) else (
    echo ❌ PostgreSQL is not installed.
    goto :install_postgres
)

:install_postgres
echo.
echo 📥 Installing PostgreSQL...
echo.
echo Please follow these steps:
echo 1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
echo 2. Run the installer with default settings
echo 3. Remember the password you set for 'postgres' user
echo 4. After installation, restart this script
echo.
echo Press any key to open the download page...
pause
start https://www.postgresql.org/download/windows/
goto :end

:create_db
echo.
echo 🗄️  Creating database...
echo.
echo Please run these SQL commands in pgAdmin or psql:
echo.
echo CREATE DATABASE coolair_db;
echo GRANT ALL PRIVILEGES ON DATABASE coolair_db TO postgres;
echo.
echo Then update your backend/.env file with your PostgreSQL password:
echo DB_PASS=your_actual_password
echo DATABASE_URL=postgresql://postgres:your_actual_password@localhost:5432/coolair_db
echo.
echo After updating the password, set:
echo USE_POSTGRESQL=true
echo.
echo Then restart your backend server!
echo.

:end
echo.
echo 📝 Need help? Check backend/DATABASE_SETUP.md for detailed instructions.
echo.
pause