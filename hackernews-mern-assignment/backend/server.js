import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";
import { scrapeHackerNews } from "./utils/scraper.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hackernews-mern-frontend.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hacker News MERN API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api", storyRoutes);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, async () => {
      console.log(`Server running on port ${PORT}`);

      try {
        const stories = await scrapeHackerNews();
        console.log(
          `Scraped ${stories.length} Hacker News stories on startup`
        );
      } catch (error) {
        console.error("Startup scraping failed:", error.message);
      }
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

startServer();