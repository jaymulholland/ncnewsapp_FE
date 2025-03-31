import axios from "axios";

const api = axios.create({
    baseURL: "https://nc-news-app-2ozn.onrender.com/api",
  });


  export const fetchArticles = (id) => {

    if (id){
        return api.get(`/articles/${id}`).then(({data}) =>{
            return data;
        })
    }
else {
    return api.get("/articles").then(({data}) =>{
       
        return data;
    });
}
  }