import { useState, useEffect } from "react";

export default function PostComment() {
    const [postUsername, setpostUsername] = useState('User');
    const [postComment, setComment] = useState('');
  return (
    <div>
    <br />
    <div className="comment-input">

    <div className="postComment-head"> 
Username: &nbsp;
<input readOnly={true} value={postUsername} />
</div>    
      <label>
      
        <textarea  name="postContent" />
      </label>
      <br />
      <button className="button-submit">Post a comment...</button>
      <br />
      <br />
    </div>
    </div>
  );
}
