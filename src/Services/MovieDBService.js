import axios from 'axios'
import {TMDB_KEY, TMDB_ENDPOINT} from '../config'

class MovieDBService {
  getFeaturedMovies() {
    return axios.get(TMDB_ENDPOINT + '/trending/all/week?api_key=' + TMDB_KEY)
  }
}

const movieDBService = new MovieDBService()
export default movieDBService