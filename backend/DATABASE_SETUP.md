# PostgreSQL Database Setup for CoolAir

## Prerequisites
1. Install PostgreSQL on your system
2. Install pgAdmin (optional, for GUI database management)

## Setup Steps

### 1. Start PostgreSQL Service
Make sure PostgreSQL is running on your system.

### 2. Create Database
Open pgAdmin or use psql command line:

```sql
-- Connect to PostgreSQL as superuser
-- Create database
CREATE DATABASE coolair_db;

-- Create user (optional, you can use default postgres user)
CREATE USER coolair_user WITH PASSWORD 'password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE coolair_db TO coolair_user;
```

### 3. Update Environment Variables
Edit `backend/.env` file with your PostgreSQL credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=coolair_db
DB_USER=postgres
DB_PASS=your_password_here
```

### 4. Default Configuration
Current configuration uses:
- Host: localhost
- Port: 5432
- Database: coolair_db
- User: postgres
- Password: password

### 5. Start Backend
```bash
cd backend
npm run dev
```

The backend will automatically:
- Connect to PostgreSQL
- Create the `users` table
- Sync the database schema

### 6. View Data in pgAdmin
1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Navigate to: Servers > PostgreSQL > Databases > coolair_db > Schemas > public > Tables > users
4. Right-click on `users` table > View/Edit Data > All Rows

## Troubleshooting

### Connection Issues
- Ensure PostgreSQL service is running
- Check if the database `coolair_db` exists
- Verify username and password in `.env` file
- Check if PostgreSQL is listening on port 5432

### Common Commands
```sql
-- List all databases
\l

-- Connect to database
\c coolair_db

-- List all tables
\dt

-- View users table structure
\d users

-- View all users
SELECT * FROM users;
```