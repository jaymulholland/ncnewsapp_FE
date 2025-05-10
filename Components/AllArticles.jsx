import { useEffect, useState } from "react";
import { fetchArticles } from "../src/api";
import ArticlesCard from "./ArticlesCard";
import Loading from "./Loading";

export default function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then((res) => setArticles(res.articles))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="general">
      <h2>All Articles</h2>
      {articles.map((article) => (
        <ArticlesCard key={article.article_id} {...article} />
      ))}
    </div>
  );
}
