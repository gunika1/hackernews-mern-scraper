import React from "react";
import { useEffect, useState } from "react";
import API from "../api/api";
import StoryCard from "../components/StoryCard";

export default function Home() {
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/stories?page=${page}&limit=10`);
      setStories(data.stories || []);
      setPages(data.pagination?.pages || 1);
    } finally {
      setLoading(false);
    }
  };

  const scrapeNow = async () => {
    setScraping(true);
    try {
      await API.post("/scrape");
      await fetchStories();
    } finally {
      setScraping(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [page]);

  return (
    <main className="container">
      <section className="hero">
        <div>
          <p className="tag">MERN Assignment</p>
          <h1>Hacker News Top Stories</h1>
          <p>
            A full-stack MERN app that scrapes the top Hacker News stories, stores them in MongoDB,
            and lets authenticated users save their favorite links.
          </p>
        </div>
        <button onClick={scrapeNow} disabled={scraping}>{scraping ? "Scraping..." : "Scrape Latest"}</button>
      </section>

      {loading ? (
        <div className="loading">Loading latest stories...</div>
      ) : (
        stories.map((story) => <StoryCard key={story._id} story={story} />)
      )}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {pages}</span>
        <button disabled={page === pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </main>
  );
}
