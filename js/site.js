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















// Movie Details
// Step1: When the user clicks the more info button show the modal
// Step2: Call API. Make sure the data is coming back aka in the network tab
// Step 3 modify the modal.
async function showMovieDetails(button){

    let movieId = button.getAttribute('data-movieId');
    let movie = await getMovieDetail(movieId);
    displayMovieDetails(movie)
}

// call the tmdb to get the movie detail as an object
async function getMovieDetail(movieId){
    
    try{
        const movieDetailUrl = `https://api.themoviedb.org/3/movie/popular${movieId}`;

        alert(`the movie id is ${movieId}`)


        let response = await fetch(movieDetailUrl, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
    
    
        // return a movie object.
        if(response.ok){
            let data = await response.json();
            return data.results;
        }else{
            return [];
        }

        // try error catch
    } catch(error){
        console.log(error)
        return [];
    }
}

// Display Modal with info.
function displayMovieDetails(movie){
    
    // Bootstrap handles the displaying of the modal, we do not need to handle, but the content
    // needs to be dynamically changed.

    // Store the modal in a variable to be changed later.
    let movieModal = document.getElementById('projectOneModal');
    // Store all the content inside a variable
    let movieModalContent = movieModal.content.cloneNode(true);


    // Modify the Modal:

    let titleElement = movieModalContent.querySelector('.modal-title-name');
    titleElement.textContent = movie.title;

    // let descriptionElement = movieCard.querySelector('.card-text');
    // descriptionElement.textContent = movie.overview;

    // let movieImgElement = movieCard.querySelector('.card-img-top');
    // movieImgElement.setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);

    // let infoButton = movieCard.querySelector('.btn-primary');
    // infoButton.setAttribute('data-movieId', movie.id);

    // let favoriteButton = movieCard.querySelector('.btn-outline-primary');
    // favoriteButton.setAttribute('data-movieId', movie.id);




}