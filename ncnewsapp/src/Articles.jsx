import { useState, useEffect } from "react";
import ArticlesCard from "./ArticlesCard";
import { fetchArticles } from "./api";
import { useParams, Link } from "react-router-dom";

function Articles() {
  const [articles, setArticles] = useState([]);
  const { article_id } = useParams(); 

  useEffect(() => {
    if (article_id) {
      fetchArticles(article_id)  
        .then((response) => {
          setArticles([response]);  
        })
        
    } else {
      fetchArticles()  
        .then((response) => {
          setArticles(response.articles);  
        })
       
    }
  }, [article_id]);

  return (
    <div className="general">
      <h2>All Articles</h2>
      {articles.map((article) => (
        <div key={article.article_id} className="article">
          <ArticlesCard {...article} />
          <Link to={`/articles/${article.article_id}`}>View Article</Link>  {/* Navigate to the article detail */}
        </div>
      ))}
    </div>
  );
}

export default Articles;
