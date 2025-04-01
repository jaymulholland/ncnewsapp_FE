export default function CommentsCard({ comments }) {
    return (
      <div className="comments-section">
        <h3>Comments</h3>
        {comments.map((comment) => {
          const formattedDate = new Date(comment.created_at).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          return (
            <div key={comment.comment_id} className="comment">
              <div className="comment-details">
                <strong>By: {comment.author}</strong>
                <p>{formattedDate}</p>
                <p>{comment.votes} votes</p>
              </div>
              <p className="comment-body">{comment.body}</p>
            </div>
          );
        })}
      </div>
    );
  }
  