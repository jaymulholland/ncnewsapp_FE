
import { Link } from "react-router";

export default function ArticlesCard({ title, body, topic, created_at, votes, article_id, comment_count }) {
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
          <p className="article-body">{body}</p>
      
          <div className="article-meta">
  <div className="meta-item">Topic: {topic}</div>
  <div className="meta-item">Created At: {formattedDate}</div>
  <div className="meta-item">Votes: {votes}</div>
  <div className="meta-item">Comments: {comment_count}</div>
</div>
        </div>
      );
    
}