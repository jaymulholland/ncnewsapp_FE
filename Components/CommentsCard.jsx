export default function CommentsCard({ comments, onDelete }) {
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
              <strong>{comment.author}</strong>
              <p>{formattedDate}</p>
              <p>{comment.votes} votes</p>
              
              {comment.isNew && (
                <button className="button-upvote" onClick={() => onDelete(comment.comment_id)}>delete</button>
              )}
            </div>
            <p className="comment-body">{comment.body}</p>
          </div>
        );
      })}
    </div>
  );
}
