"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Use PostgreSQL for development and production
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || 'coolair_db', process.env.DB_USER || 'postgres', process.env.DB_PASS || 'password', {
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
});
exports.default = sequelize;
