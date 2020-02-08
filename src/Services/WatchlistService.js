import axios from 'axios';
import { API_ENDPOINT } from '../config'
import { Cookies } from 'react-cookie'

const userId = new Cookies()
class WatchlistService {
  addMovie(data, config) {
    return axios.patch(API_ENDPOINT + '/api/watchlist/' + userId.get("userId"), data, config)
  }
  removeMovie(config) {
    return axios.delete(API_ENDPOINT + '/api/watchlist/' + userId.get("userId"), config)
  }
  getWatchlist(config) {
    return axios.get(API_ENDPOINT + '/api/watchlist/' + userId.get("userId"), config)
  }
}

const watchlistService = new WatchlistService()
export default watchlistService