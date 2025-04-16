import { apiKey } from "./ignore/key.js";

const searchInput = document.getElementById("searchBar");

//sets movieName variable so searching can also be done by clicking the magnifying glass image
let movieName;
searchInput.addEventListener("keyup", (event) => {
  //binds input to the movieName variable
  movieName = event.target.value;
})

//get user query (name of movie to search) and searches for the movie
//once the api call is ran, 
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const jsonMovieData = searchMovie(searchInput.value);
    displayMoiveData(jsonMovieData);
    
  }
})

//searches movie when search icon is clicked
const searchImg = document.getElementById("searchImage");
searchImg.addEventListener('click', () => {
  const jsonMovieData = searchMovie(movieName);
  displayMoiveData(jsonMovieData);
  
});


//searches movie based on name and returns json object with movies
async function searchMovie(movieName) {
  //sets url and options for the fetch function call
  const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    }
  };
  
  //runs api call, gets reponse, then converts data to json to be returned
  try {
    const response = await fetch(url, options);
    return await response.json();
    //catches error if it occurs
  } catch (error) {
    console.error(error);
  }
}


//display movie data
function displayMoiveData(jsonMovieData) {
  console.log(jsonMovieData)

  //can display image of movie, release date/year, overview, genres/movie title/average rating out of 10 with total vote count
  
  //format with css
}



//search for movies based on a filter?
//then run an api request based on that filter and display the information?

//first figure out how to display the data
//have an option to search for movies
//then when the movie is searched for, show recommended movies along with it