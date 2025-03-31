
import { Link } from "react-router";

export default function ArticlesCard({ title, body, topic, created_at, votes, article_id }) {
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
            <span>Topic: {topic}</span>
            <span>Created At: {formattedDate}</span>
            <span>Votes: {votes}</span>
          </div>
        </div>
      );
    
}