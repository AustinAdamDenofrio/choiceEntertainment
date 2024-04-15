


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
// #endregion                                                     ****************  Get a list of movies to populate page  *******************



//  #region                                         **************** Make dynamic MODAL that will display individual movie details  *******************
// Movie Details
// Step1: When the user clicks the more info button show the modal
// Step2: Call API. Make sure the data is coming back aka in the network tab
// Step 3 modify the modal.
async function showMovieDetails(button){

    let movieId = button.getAttribute('data-movieId');
    let movie = await getMovieDetail(movieId);
    displayMovieDetails(movie);
}

// call the tmdb to get the movie detail as an object
async function getMovieDetail(movieId){
    

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
            let data = await response.json();
            // moviesObjectArray = data.results;
            results = data;
            return results;
        }else{
            return [];
        }

    } catch(error){
        console.log(error)
        return [];
    }

    // const movieObject = moviesObjectArray.
}


// Display Modal with info.
function displayMovieDetails(movie){
    
    const projectOneModal = document.getElementById('projectOneModal');

    // Add title and header
    let titleElement = projectOneModal.querySelector('h1');
    titleElement.textContent = movie.title;
    titleElement = projectOneModal.querySelector('h3');
    titleElement.textContent = movie.title;

    // Add image
    let movieImgElement = projectOneModal.querySelector('#moviePoster');
    movieImgElement.setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`);

    // Add Subheader
    let subtitleElement = projectOneModal.querySelector('#titleMovieSection > p');
    subtitleElement.textContent = movie.tagline;

    // Add Synopsis section
    let descriptionElement = projectOneModal.querySelector('#synopsisMovieSection > p');
    descriptionElement.textContent = movie.overview;

          // Production details
    // Ratings
    let ratingsElement = projectOneModal.querySelector('#detailedMovieSection div:nth-child(1) p');
    ratingsElement.innerHTML = `${movie.vote_average.toFixed(1)} \&#x2605;\ `;
    // Release Date
    let releaseDateElement = projectOneModal.querySelector('#detailedMovieSection div:nth-child(2) p');
    releaseDateSymbolElement = releaseDateElement;
    releaseDateElement.innerHTML = `${movie.release_date} <i class="bi bi-calendar"></i>`;
     // Budget
    let budgetElement = projectOneModal.querySelector('#detailedMovieSection div:nth-child(3) p');
    let formatedBudget = new Intl.NumberFormat( {style: "currency", currency: 'USD', maximumSignificantDigits: 4 }).format(movie.budget,);
    budgetElement.innerHTML = `$${formatedBudget} <i class="bi bi-database-up"></i>`;
    // Runtime 
        // *Note: Need to split the API property:value into minutes and hours then generating the html and populating with data
    let runtimeElement = projectOneModal.querySelector('#detailedMovieSection div:nth-child(4) p');
    let totalInMinutes = movie.runtime;
    let parsedHours = Math.floor(totalInMinutes / 60);
    let parsedMinutes = totalInMinutes % 60;
    runtimeElement.innerHTML = `<span class="small">${parsedHours} Hours</span><span class="small"> ${parsedMinutes} Minutes</span> <i class="bi bi-clock"></i>`;


    // Production Companies

    // Path to the object that holds the array of objects we want to grab the productions from

    let productionCompaniesObjs = movie.production_companies;
    let productionImgElement = document.getElementById('productionMovieSection');    
    productionImgElement.innerHTML = '';

    for (const productionCompanyObj of productionCompaniesObjs){

        let productionLogo = productionCompanyObj.logo_path;
        let productionCompanyName = productionCompanyObj.name;

        productionImgElement.innerHTML += `<div class="col"> <img src="https://image.tmdb.org/t/p/w500${productionLogo}" alt="${productionCompanyName}" /> </div>`;

    }

}

//  #endregion                                   **************** Make dynamic MODAL that will display individual movie details  *******************