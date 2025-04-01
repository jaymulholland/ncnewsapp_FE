
import { Link , useParams} from "react-router";

export default function ArticlesCard({ title, body, topic, created_at, votes, article_id, comment_count }) {
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
          
          {routeArticleId === article_id.toString() && <p className="article-body">{body}</p>}
      
          <div className="article-meta">
  <div className="meta-item"><article>Topic:</article>&nbsp;{topic}</div>
  <div className="meta-item"><article>Posted:</article>&nbsp;{formattedDate}</div>
  <div className="meta-item"><article>Votes:</article>&nbsp;{votes}</div>
  <div className="meta-item"><article>Comments:</article>&nbsp;{comment_count}</div>
</div>
        </div>
      );
    
}