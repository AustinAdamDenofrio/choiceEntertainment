const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjFkZTcwZjE2Y2ZmYjFmNDBhNDgzYTJhZDI5NTgwMCIsInN1YiI6IjY2MTk4MDYwMTIxOTdlMDE2NGJiYjU1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n0SrW4YbNjv9FK3kd14-xiKD_qoNqirRWsPKXDEQoMg'

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
            let data = response.json();
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
    let movies = await getPopularMovies
    displayMovies(movies);
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

        let movieImgElement = movieCard.querySelector('card-img-top');
        movieImgElement.setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);

        let infoButton = movieCard.querySelector('.btn-primary');
        infoButton.setAttribute('data-movieId', movie.id);

        let favoriteButton = movieCard.querySelector('.btn-outline-primary');
        favoriteButton.setAttribute('data-movieId' , movie.id);

        // add it to the page
        movieRow.appendChild(movieCard);

    }
}