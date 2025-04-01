import { Link, useParams } from "react-router";
import { VoteOnPost } from "../src/api";
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
          <article>Votes:</article>&nbsp;{votes}
        </div>
        {!routeArticleId && (
          <div className="meta-item">
            <strong>Comments:</strong>&nbsp; {comment_count}
          </div>
        )}
        {routeArticleId && (
          <div className="button">
            <button onClick={() => VoteOnPost(article_id)}>
  <strong>+1</strong>
</button>
          </div>
        )}
      </div>
      {routeArticleId === article_id.toString() && (
        <p className="article-body">{body}</p>
      )}
    </div>
  );
}
