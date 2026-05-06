import axios from "axios";
import * as cheerio from "cheerio";
import Story from "../models/Story.js";

const HN_URL = "https://news.ycombinator.com";

const normalizeUrl = (url) => {
  if (!url) return HN_URL;
  if (url.startsWith("item?id=")) return `${HN_URL}/${url}`;
  return url;
};

export const scrapeHackerNews = async () => {
  const { data } = await axios.get(HN_URL, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });

  const $ = cheerio.load(data);
  const stories = [];

  $("tr.athing").slice(0, 10).each((_, element) => {
    const storyRow = $(element);
    const subtextRow = storyRow.next();

    const title = storyRow.find(".titleline > a").text().trim();
    const url = normalizeUrl(storyRow.find(".titleline > a").attr("href"));
    const pointsText = subtextRow.find(".score").text().replace(" points", "").trim();
    const points = Number(pointsText) || 0;
    const author = subtextRow.find(".hnuser").text().trim() || "unknown";
    const postedAt = subtextRow.find(".age").text().trim();

    if (title && url) {
      stories.push({ title, url, points, author, postedAt });
    }
  });

  for (const story of stories) {
    await Story.findOneAndUpdate(
      { url: story.url },
      story,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  return stories;
};
