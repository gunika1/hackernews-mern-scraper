import axios from 'axios';
import * as cheerio from 'cheerio';
import Story from '../models/Story.js';

const HN_URL = 'https://news.ycombinator.com';

export const scrapeHackerNews = async () => {
  const { data } = await axios.get(HN_URL, {
    headers: { 'User-Agent': 'Mozilla/5.0 MERN Assignment Scraper' },
  });

  const $ = cheerio.load(data);
  const rows = $('.athing').slice(0, 10);
  const scrapedStories = [];

  rows.each((_, row) => {
    const storyRow = $(row);
    const subtextRow = storyRow.next();
    const titleElement = storyRow.find('.titleline > a');
    const rawUrl = titleElement.attr('href') || '';

    const story = {
      title: titleElement.text().trim(),
      url: rawUrl.startsWith('http') ? rawUrl : `${HN_URL}/${rawUrl}`,
      points: parseInt(subtextRow.find('.score').text().replace(' points', ''), 10) || 0,
      author: subtextRow.find('.hnuser').text().trim() || 'unknown',
      postedAt: subtextRow.find('.age').text().trim() || '',
    };

    if (story.title && story.url) scrapedStories.push(story);
  });

  for (const story of scrapedStories) {
    await Story.findOneAndUpdate(
      { url: story.url },
      { $set: story },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  return scrapedStories;
};
