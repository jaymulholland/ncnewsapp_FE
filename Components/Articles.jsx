import { useParams } from "react-router-dom";
import SingleArticle from "./SingleArticle";
import TopicArticles from "./TopicArticles";
import AllArticles from "./AllArticles";

function Articles() {
  const { article_id, topic_slug } = useParams();

  if (article_id) return <SingleArticle />;
  if (topic_slug) return <TopicArticles />;
  return <AllArticles />;
}

export default Articles;