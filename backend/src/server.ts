import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import sequelize from "./config/database";
import User from "./models/User";
import Newsletter from "./models/Newsletter";
import authRoutes from "./routes/auth";
import contactRoutes from "./routes/contact";
import adminRoutes from "./routes/admin";
import newsletterRoutes from "./routes/newsletter";

// Near the top, after other imports
import Blog from "./models/Blog"; // Add this
import blogRoutes from "./routes/blog"; // Add this

dotenv.config();

const app: Express = express();
const usePostgreSQL: boolean = process.env.USE_POSTGRESQL === "true";

// CORS configuration
const allowedOrigins: string[] = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  process.env.CORS_ORIGIN as string,
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : "*",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/blog", blogRoutes); // Add this

// Health check route
app.get("/health", (_, res: Response) => {
  const dbType: string = usePostgreSQL ? "PostgreSQL" : "In-Memory";
  res.json({
    ok: true,
    message: "Backend is running!",
    database: dbType,
    timestamp: new Date().toISOString(),
  });
});

// Server port
const PORT: number = Number(process.env.PORT) || 5000;

// Database connection + sync + start server
async function startServer(): Promise<void> {
  try {
    if (usePostgreSQL) {
      console.log("🔄 Connecting to PostgreSQL database...");
      await sequelize.authenticate();
      console.log("✅ PostgreSQL connected successfully!");

      console.log("🔄 Synchronizing database models...");
      // Ensure all models are loaded before sync
      await User.sync();
      await Blog.sync();
      await Newsletter.sync();
      await sequelize.sync({ alter: true }); // auto-create/alter tables in dev
      console.log("✅ All models synchronized!");

      app.listen(PORT, () => {
        console.log(`🚀 Backend running at http://localhost:${PORT}`);
        console.log(`📊 Database: PostgreSQL (${process.env.DB_NAME})`);
        console.log(`🔧 Environment: ${process.env.NODE_ENV || "development"}`);
        console.log(
          `📝 View data in pgAdmin: Servers → PostgreSQL → ${process.env.DB_NAME} → Tables → users`
        );
      });
    } else {
      console.log("⚠️ Starting with in-memory database for development...");
      app.listen(PORT, () => {
        console.log(`🚀 Backend running at http://localhost:${PORT}`);
        console.log(`✅ Using in-memory database for development`);
        console.log(`🔧 Environment: ${process.env.NODE_ENV || "development"}`);
        console.log(`📝 To use PostgreSQL, set USE_POSTGRESQL=true in .env`);
      });
    }
  } catch (error) {
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