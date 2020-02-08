import React from 'react'
import { MovieCard } from '../UILibrary/Card/Card'
import WatchlistUtils from '../Utils/Watchlist'
import { Link } from 'react-router-dom'
import _ from 'lodash'

class LayoutUtils {
  buildMovieCards = (list, type) => {
    let movies = _.map(list, (movie, index) => {
      return (
        <Link to={"/details?movieId=" + movie.id}>
          <MovieCard
            key={index}
            poster={"https://image.tmdb.org/t/p/w600_and_h900_bestv2" + movie.poster_path}
            title={movie.title}
            overview={movie.overview}
            onClickAdd={type === "watchlist" ? null : () => WatchlistUtils.addMovieToWatchlist(movie)}
            onClickRemove={type === "watchlist" ? () => WatchlistUtils.removeMovieFromWatchlist(list, movie.id, index) : null} />
        </Link>
      )
    })
    return movies
  }
}

const layoutUtils = new LayoutUtils()
export default layoutUtils