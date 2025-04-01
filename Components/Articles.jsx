import { useState, useEffect } from "react";
import ArticlesCard from "./ArticlesCard";
import CommentsCard from "./CommentsCard";
import { fetchArticles, fetchSingleArticles, fetchArticleComments } from "../src/api";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const { article_id } = useParams(); 
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);

    if (article_id) {
      fetchSingleArticles(article_id)
        .then((response) => {
          setArticles([response.article]); 
          return fetchArticleComments(article_id);
        })
        .then((commentsResponse) => {
          setComments(commentsResponse);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      fetchArticles()
        .then((response) => {
          setArticles(response.articles);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [article_id]);

  if (isLoading) return <Loading />;

  return (
    <div className="general">
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.article_id} className="article">
            <ArticlesCard {...article} />
            
            {article_id && <CommentsCard comments={comments} />}
            <br></br>
            <br></br>
          </div>
        ))
      ) : (
        <p>No article found.</p>
      )}
    </div>
  );
}

export default Articles;
