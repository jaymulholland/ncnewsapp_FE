import axios from "axios";


const api = axios.create({
    baseURL: "https://nc-news-app-2ozn.onrender.com/api",
  });


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

  export const VoteOnPost = (id) => {
    return api
      .patch(`/articles/${id}`, { inc_votes: 1 }) 
      .then(({ data }) => data.article) 
  };
  