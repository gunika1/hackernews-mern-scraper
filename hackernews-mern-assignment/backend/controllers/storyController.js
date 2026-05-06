import Story from "../models/Story.js";
import User from "../models/User.js";
import { scrapeHackerNews } from "../utils/scraper.js";

export const triggerScrape = async (req, res) => {
  try {
    const stories = await scrapeHackerNews();
    res.json({ message: "Scraping completed", count: stories.length, stories });
  } catch (error) {
    res.status(500).json({ message: "Scraping failed", error: error.message });
  }
};

export const getStories = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const stories = await Story.find().sort({ points: -1 }).skip(skip).limit(limit);
    const total = await Story.countDocuments();

    res.json({
      stories,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleBookmark = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });

    const user = await User.findById(req.user._id);
    const storyId = story._id.toString();
    const exists = user.bookmarks.some((id) => id.toString() === storyId);

    if (exists) {
      user.bookmarks = user.bookmarks.filter((id) => id.toString() !== storyId);
    } else {
      user.bookmarks.push(story._id);
    }

    await user.save();
    await user.populate("bookmarks");

    res.json({
      message: exists ? "Bookmark removed" : "Bookmark added",
      bookmarks: user.bookmarks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
