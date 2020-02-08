import WatchlistService from '../Services/WatchlistService'
import CookieUtils from '../Utils/Cookies'

class WatchlistUtils {
  async addMovieToWatchlist(movie) {
    let jwt = CookieUtils.getCookie("jwt")
    let movieObj = {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path
    }
    await WatchlistService.addMovie(movieObj, { headers: { "auth-token": jwt } })
  }

  async removeMovieFromWatchlist(watchlist, movieId, index) {
    let jwt = CookieUtils.getCookie("jwt")
    let response = await WatchlistService.removeMovie({ headers: { "auth-token": jwt }, data: { id: movieId } })

    if(response.status === 200) {
      watchlist.splice(index, 1)
      return watchlist
    }
    else {
      return []
    }
  }
}

const watchlistUtils = new WatchlistUtils()
export default watchlistUtils