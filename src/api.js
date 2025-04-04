import axios from "axios";


const api = axios.create({
    baseURL: "https://nc-news-app-2ozn.onrender.com/api",
  });

  export const fetchTopics = () => {

    return api.get("/topics").then(({data}) =>{
       
        return data;
    });

  }

  export const fetchArticles = () => {

    return api.get("/articles").then(({data}) =>{
       
        return data;
    });

  }

  export const fetchSingleArticles = (id) => {
    if (id){
        return api.get(`/articles/${id}`).then(({data}) =>{
            return data;
        })
    }
    
}

export const fetchArticleComments = (id) => {
    return api.get(`/articles/${id}/comments`).then(({ data }) => {
        
      return data.comments;
    });
  };

  export const VoteOnArticle = (id) => {
    return api
      .patch(`/articles/${id}`, { inc_votes: 1 }) 
      .then(({ data }) => data.article) 
  };


 export const postCommentAPI = (article_id, comment) => {
  
    return api
    .post(`/articles/${article_id}/comments`, comment)
      .then(({ data }) => data.comment);
  };

  export const deleteComment = (comment_id) => {

return api.delete(`/comments/${comment_id}`)

  }
  
