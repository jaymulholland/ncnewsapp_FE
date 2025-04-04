import { useState } from "react";
import { useParams } from "react-router-dom";
import { postCommentAPI } from "../src/api";

export default function PostComment({ onCommentPosted }) {
  const { article_id } = useParams();
  const [postUsername, setPostUsername] = useState("tickle122");
  const [postComment, setPostComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (!postComment.trim()) return;

    setIsPosting(true);
    setError(null);

    const formattedComment = {
      author: postUsername,
      body: postComment,
    };

    postCommentAPI(article_id, formattedComment)
      .then((newComment) => {
        setPostComment("");
        onCommentPosted?.(newComment);
      })
      .catch(() => setError("Failed to post comment. Please try again."))
      .finally(() => setIsPosting(false));
  };

  return (
    <div className="comment-input">
      <div className="postComment-head">
        Username: <input readOnly value={postUsername} />
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
  );
}
