"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const User_1 = __importDefault(require("./models/User"));
const Newsletter_1 = __importDefault(require("./models/Newsletter"));
const auth_1 = __importDefault(require("./routes/auth"));
const contact_1 = __importDefault(require("./routes/contact"));
const admin_1 = __importDefault(require("./routes/admin"));
const newsletter_1 = __importDefault(require("./routes/newsletter"));
// Near the top, after other imports
const Blog_1 = __importDefault(require("./models/Blog")); // Add this
const blog_1 = __importDefault(require("./routes/blog")); // Add this
dotenv_1.default.config();
const app = (0, express_1.default)();
const usePostgreSQL = process.env.USE_POSTGRESQL === "true";
// CORS configuration
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    process.env.CORS_ORIGIN,
].filter((origin) => Boolean(origin));
app.use((0, cors_1.default)({
    origin: allowedOrigins.length > 0 ? allowedOrigins : "*",
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/api/auth", auth_1.default);
app.use("/api/contact", contact_1.default);
app.use("/api/admin", admin_1.default);
app.use("/api/newsletter", newsletter_1.default);
app.use("/api/blog", blog_1.default); // Add this
// Health check route
app.get("/health", (_, res) => {
    const dbType = usePostgreSQL ? "PostgreSQL" : "In-Memory";
    res.json({
        ok: true,
        message: "Backend is running!",
        database: dbType,
        timestamp: new Date().toISOString(),
    });
});
// Server port
const PORT = Number(process.env.PORT) || 5000;
// Database connection + sync + start server
async function startServer() {
    try {
        if (usePostgreSQL) {
            console.log("🔄 Connecting to PostgreSQL database...");
            await database_1.default.authenticate();
            console.log("✅ PostgreSQL connected successfully!");
            console.log("🔄 Synchronizing database models...");
            // Ensure all models are loaded before sync
            await User_1.default.sync();
            await Blog_1.default.sync();
            await Newsletter_1.default.sync();
            await database_1.default.sync({ alter: true }); // auto-create/alter tables in dev
            console.log("✅ All models synchronized!");
            app.listen(PORT, () => {
                console.log(`🚀 Backend running at http://localhost:${PORT}`);
                console.log(`📊 Database: PostgreSQL (${process.env.DB_NAME})`);
                console.log(`🔧 Environment: ${process.env.NODE_ENV || "development"}`);
                console.log(`📝 View data in pgAdmin: Servers → PostgreSQL → ${process.env.DB_NAME} → Tables → users`);
            });
        }
        else {
            console.log("⚠️ Starting with in-memory database for development...");
            app.listen(PORT, () => {
                console.log(`🚀 Backend running at http://localhost:${PORT}`);
                console.log(`✅ Using in-memory database for development`);
                console.log(`🔧 Environment: ${process.env.NODE_ENV || "development"}`);
                console.log(`📝 To use PostgreSQL, set USE_POSTGRESQL=true in .env`);
            });
        }
    }
    catch (error) {
        console.error("❌ Database connection failed:", error);
        console.log("\n📝 Falling back to in-memory database...");
        app.listen(PORT, () => {
            console.log(`🚀 Backend running at http://localhost:${PORT} (fallback mode)`);
            console.log(`⚠️ Using in-memory database due to PostgreSQL connection failure`);
            console.log(`📝 Check PostgreSQL installation and credentials in .env`);
        });
    }
}
startServer();
