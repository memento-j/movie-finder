import { apiKey } from "./ignore/key.js";

const searchInput = document.getElementById("searchBar");
const moviesContainer = document.querySelector(".moviesContainer")

//sets movieName variable so searching can also be done by clicking the magnifying glass image
let movieName;
searchInput.addEventListener("keyup", (event) => {
  //binds input to the movieName variable
  movieName = event.target.value;
})


//searches movie based on name and stores info on the top 60 results (3 pages) in an array
async function searchMovie(movieInput) {
  let moviesData = []
  //loops through 3 pages and stores up to 60 items
  for (let i = 0; i < 3; i++) {
    //sets url and options for the fetch function call
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieInput}&include_adult=false&language=en-US&page=${i+1}`;
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    };

    //runs api call, gets reponse, then converts data to json to be returned
    try {
      const response = await fetch(url, options);
      //if array is empty, end the loop since there is nothing more to add
      const responseJson = await response.json();
      if (responseJson["results"].length === 0) {
        break;
      }
      //add json object to moviesData array
      moviesData.push(responseJson);

      //catches error if it occurs
    } catch (error) {
      console.error(error);
    }
  }
  return moviesData;
}


//display movie data
function displayMoiveData(responseData) {

  //loops through each movie
  for (let i = 0; i < responseData.length; i++) {
    responseData[i]["results"].forEach(movie => {

      //create the div to store the movie and its information
      const movieHolder = document.createElement("div");
      movieHolder.classList.add("movie");
      moviesContainer.appendChild(movieHolder);
      //add image
      const movieImage = document.createElement("img");
      movieImage.classList.add("movieImage");
      movieImage.src = `https://image.tmdb.org/t/p/w200/${movie["poster_path"]}`;
      movieImage.alt = "No image available..." 
      movieHolder.appendChild(movieImage);
      //add title
      const movieTitle = document.createElement("p");
      movieTitle.classList.add("movieTitle");
      movieTitle.textContent = movie["original_title"];
      movieHolder.appendChild(movieTitle);
      //add relase date
      const movieReleaseDate = document.createElement("p");
      movieReleaseDate.textContent = `Released: ${movie["release_date"]}`;
      movieHolder.appendChild(movieReleaseDate);
      //add rating out of 10 and the number of people that reviewed
      const movieRating = document.createElement("p");
      movieRating.textContent = `Rating: ${movie["vote_average"]}/10 from ${movie["vote_count"]} voters`;
      movieHolder.appendChild(movieRating);
      //add overview
      /*const movieOverview = document.createElement("p");
      movieOverview.textContent = movie["overview"];
      movieHolder.appendChild(movieOverview); */
    });
  }
}



//get user query (name of movie to search) and searches for the movie
//once the api call is ran, 
searchInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    //remove old page contents
    moviesContainer.innerHTML = "";
    //get data for new page
    const responseData = await searchMovie(searchInput.value);
    //display data on page
    displayMoiveData(responseData);
  }
})

//searches movie when search icon is clicked
const searchImg = document.getElementById("searchImage");
searchImg.addEventListener('click', async () => {
  //remove old page contents
  moviesContainer.innerHTML = "";
  //get data for new page
  const responseData = await searchMovie(movieName);
  //display data on page
  displayMoiveData(responseData);
});