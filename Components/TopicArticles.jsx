import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticles } from "../src/api";
import ArticlesCard from "./ArticlesCard";
import Loading from "./Loading";

export default function TopicArticles() {
  const { topic_slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then((res) => {
        const filtered = res.articles.filter((a) => a.topic === topic_slug);
        setArticles(filtered);
      })
      .finally(() => setIsLoading(false));
  }, [topic_slug]);

  if (isLoading) return <Loading />;

  return (
    <div className="general">
      <h2>Articles on {topic_slug}</h2>
      {articles.length ? (
        articles.map((article) => (
          <ArticlesCard key={article.article_id} {...article} />
        ))
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
}
