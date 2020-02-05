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
    this.setState({ watchlist: response.data })
    console.log(response)
  }

  buildMovieCards = () => {
    let movies = _.map(this.state.watchlist, movie => {
      return (
        <MovieCard
          title={movie.title}
          overview={movie.overview}
          onClickAdd={() => this.addMovieToWatchlist(movie.id)}
          onClickRemove={() => this.removeMovieFromWatchlist(movie.id)} />
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