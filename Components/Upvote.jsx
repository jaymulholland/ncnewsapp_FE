import { useState } from "react";
import { VoteOnPost } from "../src/api";

export const ArticleVote = ({ article_id, initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (hasVoted) return; 

    setVotes((prevVotes) => prevVotes + 1);
    setHasVoted(true);

    VoteOnPost(article_id)
      .catch(() => {
        setVotes((prevVotes) => prevVotes - 1);
        setHasVoted(false);
      });
  };

  return (
    <button className="button-upvote" onClick={handleVote} disabled={hasVoted}>
      <strong>Upvote</strong> 
    </button>
  );
};

export default ArticleVote;
