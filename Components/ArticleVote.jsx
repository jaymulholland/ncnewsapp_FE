import { useState, useEffect } from "react";
import { VoteOnArticle } from "../src/api";

export default function ArticleVote({ article_id, initialVotes, updateVotes }) {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const storedVote = localStorage.getItem(`voted-${article_id}`);
    if (storedVote === "true") setHasVoted(true);
  }, [article_id]);

  const handleVote = () => {
    if (hasVoted) return;

    setVotes((prev) => prev + 1);
    setHasVoted(true);
    localStorage.setItem(`voted-${article_id}`, "true");
    updateVotes?.((prev) => prev + 1);

    VoteOnArticle(article_id).catch(() => {
      setVotes((prev) => prev - 1);
      setHasVoted(false);
      localStorage.removeItem(`voted-${article_id}`);
      updateVotes?.((prev) => prev - 1);
    });
  };

  return (
    <button className="button-upvote" onClick={handleVote} disabled={hasVoted}>
      <strong>Upvote</strong>
    </button>
  );
}
