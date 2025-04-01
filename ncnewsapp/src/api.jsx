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
        console.log(data.comments, "<<comments???")
      return data.comments;
    });
  };
  