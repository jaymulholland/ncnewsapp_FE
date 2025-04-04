import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArticleVote from "./ArticleVote";
import PostComment from "./PostComment";

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
        {routeArticleId && (
          <ArticleVote article_id={article_id} initialVotes={votes} updateVotes={setCurrentVotes} />
        )}
      </div>
      {routeArticleId === article_id.toString() && <p className="article-body">{body}</p>}
    </div>
  );
}

export { PostComment };
