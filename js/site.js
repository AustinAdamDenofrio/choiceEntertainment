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



