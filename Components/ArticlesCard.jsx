import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { postCommentAPI, VoteOnArticle } from "../src/api";

export function PostComment({ onCommentPosted }) {
  const { article_id } = useParams();  
  const [postUsername, setPostUsername] = useState("tickle122");
  const [postComment, setPostComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (!postComment.trim()) return;
    setIsPosting(true);
    setError(null);

    let formattedComment = { 
      author: postUsername,
      body: postComment,
    
    };

    postCommentAPI(article_id, formattedComment)  
      .then((newComment) => {
        console.log("Comment posted successfully:", newComment);
        setPostComment("");
        if (onCommentPosted) onCommentPosted(newComment);
      })
      .catch((error) => {
        console.error("Failed to post comment:", error);
        setError("Failed to post comment. Please try again.");
      })
      .finally(() => {
        setIsPosting(false);
      });
  };

  return (
    <div>
      <div className="comment-input">
        <div className="postComment-head">
          Username: &nbsp;
          <input readOnly value={postUsername} />
        </div>
        <label>
          <textarea
            name="postContent"
            value={postComment}
            onChange={(e) => setPostComment(e.target.value)}
            disabled={isPosting}
          />
        </label>
        <button
          className="button-submit"
          onClick={handleSubmit}
          disabled={isPosting || !postComment.trim()}
        >
          {isPosting ? "Posting..." : "Post a comment"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

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

    VoteOnArticle(article_id).catch(() => {
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
        <div className="meta-item">Author: {author}</div>
        <div className="meta-item">Topic: {topic}</div>
        <div className="meta-item">Posted: {formattedDate}</div>
        <div className="meta-item">Votes: {currentVotes}</div>
        {!routeArticleId && <div className="meta-item">Comments: {comment_count}</div>}
        {routeArticleId && <ArticleVote article_id={article_id} initialVotes={votes} updateVotes={setCurrentVotes} />}
      </div>
      {routeArticleId === article_id.toString() && <p className="article-body">{body}</p>}
    </div>
  );
}
