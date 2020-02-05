import axios from 'axios';
import { API_ENDPOINT } from '../config'

class WatchlistService {
  constructor() {
    this.userId = sessionStorage.getItem("userId")
  }
  addMovie(data, config) {
    return axios.patch(API_ENDPOINT + '/api/watchlist/' + this.userId, data, config)
  }
  removeMovie(config) {
    return axios.delete(API_ENDPOINT + '/api/watchlist/' + this.userId, config)
  }
  getWatchlist(config) {
    return axios.get(API_ENDPOINT + '/api/watchlist/' + this.userId, config)
  }
}

const watchlistService = new WatchlistService()
export default watchlistService