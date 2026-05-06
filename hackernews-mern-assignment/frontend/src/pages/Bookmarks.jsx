import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import StoryCard from "../components/StoryCard";

export default function Bookmarks() {
  const { user } = useAuth();
  const bookmarks = user?.bookmarks || [];

  return (
    <main className="container">
      <section className="hero small">
        <p className="tag">Protected Page</p>
        <h1>Your Saved Stories</h1>
        <p>All your bookmarked Hacker News stories appear here after login.</p>
      </section>

      {bookmarks.length === 0 ? (
        <div className="empty-card">
          <h2>No bookmarks yet</h2>
          <p>Save stories from the home page and they will show up here.</p>
          <Link to="/">Browse Stories</Link>
        </div>
      ) : (
        bookmarks.map((story) => <StoryCard key={story._id} story={story} />)
      )}
    </main>
  );
}
