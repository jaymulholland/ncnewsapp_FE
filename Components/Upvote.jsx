import { useState } from "react";
import { VoteOnPost } from "./api";

const ArticleVote = ({ article_id, initialVotes }) => {
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
    <button onClick={handleVote}>
      <strong>+1</strong> ({votes})
    </button>
  );
};

export default ArticleVote;
