


const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjFkZTcwZjE2Y2ZmYjFmNDBhNDgzYTJhZDI5NTgwMCIsInN1YiI6IjY2MTk4MDYwMTIxOTdlMDE2NGJiYjU1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n0SrW4YbNjv9FK3kd14-xiKD_qoNqirRWsPKXDEQoMg'

// #region                                                     ****************  Get a list of movies to populate page  *******************
//Return a list of an array of movies objects or empty array.
async function getPopularMovies() {

    try{
        // Step 1: get URL
        const getPopularMoviesUrl = 'https://api.themoviedb.org/3/movie/popular';

        // Step2: call the API

        //Store whatever the response is, but need a var.
        // var response holds the json response from the fetch.
        let response = await fetch(getPopularMoviesUrl, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        if(response.ok){
            let data = await response.json();
            return data.results;
        }else{
            return [];
        }

    } catch(error){
        console.log(error)
        return [];
    }
    
}

async function displayPopularMovies(){
    let movies = await getPopularMovies();
    displayMovies(movies);
}

function displayFavoriteMovies(){
    let favorite = getFavoriteMovies();
    displayMovies(favorite);
}

function displayMovies(movies){
    // Get movie Card Template from HTML
    const movieCardTemplate = document.getElementById('movie-card-template');

    //find the element where the movie card WILL go 
    const movieRow = document.getElementById('movie-row');

    // resets the html section of the movies
    movieRow.innerHTML = '';

    // we need a card for each movie in the movie array
    for (const movie of movies){

        // Copy of the template between the opening and closing tag
        let movieCard = movieCardTemplate.content.cloneNode(true);

        // modify the template with the current movie
        let titleElement = movieCard.querySelector('.card-body > h5');
        titleElement.textContent = movie.title;

        let descriptionElement = movieCard.querySelector('.card-text');
        descriptionElement.textContent = movie.overview;

        let movieImgElement = movieCard.querySelector('.card-img-top');
        movieImgElement.setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);

        let infoButton = movieCard.querySelector('.btn-primary');
        infoButton.setAttribute('data-movieId', movie.id);

        let favoriteButton = movieCard.querySelector('.btn-outline-primary');
        favoriteButton.setAttribute('data-movieId', movie.id);

        // add it to the page
        movieRow.appendChild(movieCard);
        
    }
}

function removeFavorite(button){
    // get our array of favorite movies
    let favorites = getFavoriteMovies();
    // search for a movie with data-movieId that is on this button
    // remove movie from array
    const movieId = button.getAttribute('data-movieId');
    // filter says return whatever is according to the (parameter)
    let newFavorites = favorites.filter(movie => movie.id != movieId);
    // save back to array
    saveFavoriteMovies(newFavorites);
    // Update on the page
    displayFavoriteMovies();


    // refresh page

}
// #endregion                                                     ****************  Get a list of movies to populate page  *******************



//  #region                                         **************** Make dynamic MODAL that will display individual movie details  *******************
// Movie Details
// Step1: When the user clicks the more info button show the modal
// Step2: Call API. Make sure the data is coming back aka in the network tab
// Step 3 modify the modal.
async function getMovieDetail(movieId){
    
    // API URL for specific movie ID
    const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}`;

    try{
        // call the API
        //Store whatever the response is, but need a var.
        // var response holds the json response from the fetch.
        let response = await fetch(movieDetailUrl, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        if(response.ok){
            let movie = await response.json();
            results = movie;
            return results;
        }else{
            return undefined;
        }

    } catch(error){
        console.log(error)
        return undefined;
    }

    // const movieObject = moviesObjectArray.
}

async function showMovieDetails(button){

    let movieId = button.getAttribute('data-movieId');
    let movie = await getMovieDetail(movieId);

    if (movie != undefined){
        document.getElementById('modal-title').textContent = movie.title;
        document.getElementById('modal-title-name').textContent = movie.title;
        document.getElementById('modal-tagline').textContent = movie.tagline;
        document.getElementById('modal-synopsis').textContent = movie.overview;
        document.getElementById('movie-img').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;


        let movieGenres = document.getElementById('movieGenre');
        movieGenres.innerHTML = '';

        // get the Genre
        movie.genres.forEach(genre => 
            {
                // store in memory
                let badge = document.createElement('span');
                badge.classList.add('badge', 'text-bg-primary');
                badge.textContent = genre.name;
                // alter in html
                movieGenres.appendChild(badge);
            }
        );        
        
    }

    // pop modal
    const modal = bootstrap.Modal.getOrCreateInstance('#movieModal');
    modal.show();

}





//  #endregion                                   **************** Make dynamic MODAL that will display individual movie details  *******************


// Add to favorites
async function addFavoriteMovie(button){
    // get the movie to add to favorites.
    // get the movie ID
    const movieId = button.getAttribute('data-movieId');
    let movies = getFavoriteMovies();

    let duplicateMovie = movies.find(movie => movie.id == movieId);

    // call getMovieDetails
    
    if (duplicateMovie == undefined){
        // get from TMDB
        const favoriteMovie = await getMovieDetail(movieId);
        // convert the movie to a string/json
        if(favoriteMovie != undefined){
            movies.push(favoriteMovie);
            saveFavoriteMovies(movies);
        }

    }


    // let the user know we did it

    // NOTE: What if they press the button more than once
}

function getFavoriteMovies(){
    let movieJSON = localStorage.getItem('ad-favorite-movies');
    let favoriteMovies = [];

    if (movieJSON == null){
        localStorage.setItem('ad-favorite-movies', '[]');
    }else{
        favoriteMovies = JSON.parse(movieJSON);
    }

    return favoriteMovies;
}

function saveFavoriteMovies(favoriteMovies){
    let moviesAsString = JSON.stringify(favoriteMovies);
    localStorage.setItem('ad-favorite-movies', moviesAsString);
}

