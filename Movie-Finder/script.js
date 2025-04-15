//importing api key
import { apiKey } from "./ignore/key.js";

//get user query (name of movie to search)
const movieName = "spiderman";





const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiKey}`
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));



//search for movies based on a filter?
//then run an api request based on that filter and display the information?

//first figure out how to display the data
//have an option to search for movies
//then when the movie is searched for, show recommended movies along with it