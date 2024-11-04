const apiKey = '42d17bac4dcb37391ec870a4ab496e5b'
let genreMap = {}

async function loadGenres() {
    const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
    try {
        const response = await axios.get(genreUrl);
        response.data.genres.forEach(genre => {
            genreMap[genre.id] = genre.name
        });
        console.log('Géneros cargados:', genreMap)
    } catch (error) {
        console.error('Error cargando los géneros:', error)
    }
}

async function searchMovies() {
    const query = document.getElementById('movieInput').value
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`

    try {
        const response = await axios.get(url)
        const movies = response.data.results
        displayMovies(movies)
    } catch (error) {
        console.error('Error al buscar películas:', error)
    }
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('moviesContainer')
    moviesContainer.innerHTML = ''

    movies.forEach(movie => {
        const movieCard = document.createElement('div')
        movieCard.classList.add('movie-card');

        const movieImage = document.createElement('img')
        movieImage.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image';
        movieCard.appendChild(movieImage)

        const movieInfo = document.createElement('div')
        movieInfo.classList.add('movie-info')

        const movieTitle = document.createElement('p')
        movieTitle.classList.add('movie-title')
        movieTitle.textContent = movie.title
        movieInfo.appendChild(movieTitle)

        const movieDescription = document.createElement('p')
        movieDescription.classList.add('movie-description')
        movieDescription.textContent = movie.overview || 'Sin descripción disponible.'
        movieInfo.appendChild(movieDescription)

        const movieGenre = document.createElement('p')
        movieGenre.classList.add('movie-genre')
        const genreNames = movie.genre_ids.map(id => genreMap[id] || 'Desconocido').join(', ')
        movieGenre.textContent = `Género(s): ${genreNames}`
        movieInfo.appendChild(movieGenre)

        movieCard.appendChild(movieInfo)
        moviesContainer.appendChild(movieCard)
    })
}

loadGenres()
document.getElementById('searchButton').addEventListener('click', searchMovies)
