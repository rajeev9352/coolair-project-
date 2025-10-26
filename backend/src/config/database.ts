import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Use PostgreSQL for development and production
const sequelize = new Sequelize(
  process.env.DB_NAME || 'coolair_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    dialect: 'postgres',
    logging: console.log, // Enable logging to see SQL queries
    define: {
      timestamps: true, // Adds createdAt and updatedAt
      underscored: false, // Use camelCase instead of snake_case
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export default sequelize;
