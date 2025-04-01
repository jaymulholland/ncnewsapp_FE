import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { VoteOnPost } from "../src/api";
import { useEffect } from "react";




export const ArticleVote = ({ article_id, initialVotes, updateVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const storedVote = localStorage.getItem(`voted-${article_id}`);
    if (storedVote === "true") {
      setHasVoted(true);
    }
  }, [article_id]);
  
  const handleVote = () => {
    if (hasVoted) return;

    setVotes((prevVotes) => prevVotes + 1);
    setHasVoted(true);
    localStorage.setItem(`voted-${article_id}`, "true");
    updateVotes((prevVotes) => prevVotes + 1);

    VoteOnPost(article_id)
      .catch(() => {
        setVotes((prevVotes) => prevVotes - 1);
        setHasVoted(false);
        localStorage.removeItem(`voted-${article_id}`);
        updateVotes((prevVotes) => prevVotes - 1);
      });
  };

  return (
    <button className="button-upvote" onClick={handleVote} disabled={hasVoted}>
      <strong>Upvote</strong> 
    </button>
  );
};

export default function ArticlesCard({
  author,
  title,
  body,
  topic,
  created_at,
  votes,
  article_id,
  comment_count,
}) {
  const { article_id: routeArticleId } = useParams();
  const [currentVotes, setCurrentVotes] = useState(votes);
  const formattedDate = new Date(created_at).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="article-card">
      <h2 className="article-title">
        <Link to={`/articles/${article_id}`}>{title}</Link>
      </h2>

      <div className="article-meta">
        <div className="meta-item">
          <article>Author:</article>&nbsp;{author}
        </div>
        <div className="meta-item">
          <article>Topic:</article>&nbsp;{topic}
        </div>
        <div className="meta-item">
          <article>Posted:</article>&nbsp;{formattedDate}
        </div>
        <div className="meta-item">
          <article>Votes:</article>&nbsp;{currentVotes}
        </div>

        {!routeArticleId && (
          <div className="meta-item">
            <article>Comments:</article>&nbsp; {comment_count}
          </div>
        )}
        {routeArticleId && (
          <ArticleVote article_id={article_id} initialVotes={votes} updateVotes={setCurrentVotes} />
        )}
      </div>
      {routeArticleId === article_id.toString() && (
        <p className="article-body">{body}</p>
      )}
    </div>
  );
}
