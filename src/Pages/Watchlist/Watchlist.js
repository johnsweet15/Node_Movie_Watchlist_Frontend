import React from 'react'
import MovieCard from '../../UILibrary/Card/Card'
import WatchlistService from '../../Services/WatchlistService'
import CookieUtils from '../../Utils/Cookies'
import _ from 'lodash'

export default class Watchlist extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      watchlist: []
    }
  }

  componentDidMount() {
    this.getWatchlist()
  }

  getWatchlist = async () => {
    let jwt = CookieUtils.getCookie("jwt")
    let response = await WatchlistService.getWatchlist({ headers: { "auth-token": jwt } })
    this.setState({ watchlist: _.reverse(response.data) })
  }

  async removeMovieFromWatchlist(movieId, index) {
    let jwt = CookieUtils.getCookie("jwt")
    let response = await WatchlistService.removeMovie({ headers: { "auth-token": jwt }, data: { id: movieId } })

    if(response.status === 200) {
      let watchlist = this.state.watchlist
      watchlist.splice(index, 1)
      this.setState({watchlist: watchlist})
    }
  }

  buildMovieCards = () => {
    let movies = _.map(this.state.watchlist, (movie, index) => {
      return (
        <MovieCard
          key={index}
          poster={"https://image.tmdb.org/t/p/w600_and_h900_bestv2" + movie.poster_path}
          title={movie.title}
          overview={movie.overview}
          onClickRemove={() => this.removeMovieFromWatchlist(movie.id, index)} />
      )
    })
    return movies
  }

  render() {
    return (
      <div>
        <h1>Watchlist</h1>
        {this.state.watchlist.length > 0 &&
          <div>{this.buildMovieCards()}</div>
        }
      </div>
    )
  }
}