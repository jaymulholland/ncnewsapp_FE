import { useState, useEffect } from "react";
import ArticlesCard from "./ArticlesCard";
import CommentsCard from "./CommentsCard";
import { fetchArticles, fetchSingleArticles, fetchArticleComments, deleteComment } from "../src/api";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { PostComment } from "./ArticlesCard";

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
          const newCommentIds = JSON.parse(localStorage.getItem("newComments")) ;
          const updatedComments = commentsResponse.map((comment) => ({
            ...comment,
            isNew: newCommentIds.includes(comment.comment_id),
          }));
          setComments(updatedComments);
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

 
  const handleNewComment = (newComment) => {
    const updatedComments = [...comments, { ...newComment, isNew: true }];
    setComments(updatedComments);

    const newCommentIds = JSON.parse(localStorage.getItem("newComments") );
    newCommentIds.push(newComment.comment_id);
    localStorage.setItem("newComments", JSON.stringify(newCommentIds));
  };

 
  const handleDeleteComment = (comment_id) => {
   
    const updatedComments = comments.filter((comment) => comment.comment_id !== comment_id);
    setComments(updatedComments);

    
    const storedNewComments = JSON.parse(localStorage.getItem("newComments")) || [];
    const filteredComments = storedNewComments.filter((id) => id !== comment_id);
    localStorage.setItem("newComments", JSON.stringify(filteredComments));

   
    deleteComment(comment_id).then(() => {
     
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="general">
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.article_id} className="article">
            <ArticlesCard {...article} />
            {article_id && (
              <>
                <CommentsCard
                  comments={comments}
                  onDelete={handleDeleteComment} 
                />
                <PostComment
                  article_id={article.article_id}
                  onCommentPosted={handleNewComment} 
                />
              </>
            )}
            <br />
          </div>
        ))
      ) : (
        <p>No article found.</p>
      )}
    </div>
  );
}

export default Articles;
