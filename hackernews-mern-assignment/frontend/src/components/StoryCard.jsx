import React from "react";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function StoryCard({ story, onBookmarkChange }) {
  const { user, updateBookmarks } = useAuth();
  const isBookmarked = user?.bookmarks?.some((bookmark) => {
    const id = bookmark?._id || bookmark;
    return id === story._id;
  });

  const handleBookmark = async () => {
    if (!user) {
      alert("Please login to bookmark stories");
      return;
    }

    const { data } = await API.post(`/stories/${story._id}/bookmark`);
    updateBookmarks(data.bookmarks);
    onBookmarkChange?.(data.bookmarks);
  };

  return (
    <article className="story-card">
      <div>
        <a href={story.url} target="_blank" rel="noreferrer" className="story-title">
          {story.title}
        </a>
        <p className="meta">
          <span>▲ {story.points || 0} points</span>
          <span>👤 {story.author || "unknown"}</span>
          <span>🕒 {story.postedAt || "recently"}</span>
        </p>
      </div>

      <button className={isBookmarked ? "bookmark active" : "bookmark"} onClick={handleBookmark}>
        {isBookmarked ? "★ Saved" : "☆ Save"}
      </button>
    </article>
  );
}
