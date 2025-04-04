import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleArticles, fetchArticleComments, deleteComment } from "../src/api";
import ArticlesCard, { PostComment } from "./ArticlesCard";
import CommentsCard from "./CommentsCard";
import Loading from "./Loading";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSingleArticles(article_id)
      .then((res) => {
        setArticle(res.article);
        return fetchArticleComments(article_id);
      })
      .then((commentsRes) => {
        const storedIds = JSON.parse(localStorage.getItem("newComments")) || [];
        const updated = commentsRes.map((c) => ({
          ...c,
          isNew: storedIds.includes(c.comment_id),
        }));
        setComments(updated);
      })
      .finally(() => setIsLoading(false));
  }, [article_id]);

  const handleNewComment = (newComment) => {
    setComments([...comments, { ...newComment, isNew: true }]);
    const ids = JSON.parse(localStorage.getItem("newComments")) || [];
    localStorage.setItem("newComments", JSON.stringify([...ids, newComment.comment_id]));
  };

  const handleDeleteComment = (comment_id) => {
    setComments(comments.filter((c) => c.comment_id !== comment_id));
    const ids = JSON.parse(localStorage.getItem("newComments")) || [];
    localStorage.setItem("newComments", JSON.stringify(ids.filter((id) => id !== comment_id)));
    deleteComment(comment_id);
  };

  if (isLoading) return <Loading />;
  if (!article) return <p>Article not found.</p>;

  return (
    <div className="article">
      <ArticlesCard {...article} />
      <CommentsCard comments={comments} onDelete={handleDeleteComment} />
      <PostComment article_id={article.article_id} onCommentPosted={handleNewComment} />
    </div>
  );
}
