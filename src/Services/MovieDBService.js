import axios from 'axios'
import { TMDB_KEY, TMDB_ENDPOINT } from '../config'

class MovieDBService {
  getFeaturedMovies() {
    return axios.get(TMDB_ENDPOINT + '/trending/all/week?api_key=' + TMDB_KEY)
  }
  getSearchedMovies(search, count) {
    return axios.get(TMDB_ENDPOINT + '/search/multi?&api_key=' + TMDB_KEY + '&language=en-US&query=' + search + '&page=' + count + '&include_adult=false')
  }
  getMovieById(movieId) {
    return axios.get(TMDB_ENDPOINT + '/movie/' + movieId + '?api_key=' + TMDB_KEY)
  }
}

const movieDBService = new MovieDBService()
export default movieDBService