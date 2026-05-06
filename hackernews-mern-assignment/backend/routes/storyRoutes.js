import express from "express";
import {
  getStories,
  getStoryById,
  toggleBookmark,
  triggerScrape
} from "../controllers/storyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/scrape", triggerScrape);
router.get("/stories", getStories);
router.get("/stories/:id", getStoryById);
router.post("/stories/:id/bookmark", protect, toggleBookmark);

export default router;
