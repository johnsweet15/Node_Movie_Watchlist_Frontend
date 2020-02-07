import React from 'react'
import MovieDBService from '../../Services/MovieDBService'
import MovieCard from '../../UILibrary/Card/Card'
import WatchlistService from '../../Services/WatchlistService'
import CookieUtils from '../../Utils/Cookies'
import _ from 'lodash'

export default class Featured extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      featuredMovies: []
    }
  }

  componentDidMount() {
    this.getFeaturedMovies()
  }

  getFeaturedMovies = async () => {
    let response = await MovieDBService.getFeaturedMovies()

    let movies = response.data.results;
    _.sortBy(movies, (o) => o.popularity)

    this.setState({
      featuredMovies: movies,
    })
  }

  async addMovieToWatchlist(movie) {
    let jwt = CookieUtils.getCookie("jwt")
    let movieObj = {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path
    }
    let response = await WatchlistService.addMovie(movieObj, { headers: { "auth-token": jwt } })
    console.log(response)
  }

  async removeMovieFromWatchlist(movieId) {
    let jwt = CookieUtils.getCookie("jwt")
    let response = await WatchlistService.removeMovie({ headers: { "auth-token": jwt }, data: { id: movieId } })
    console.log(response)
  }

  buildMovieCards = () => {
    let movies = _.map(this.state.featuredMovies, (movie, index) => {
      return (
        <MovieCard
          key={index}
          poster={"https://image.tmdb.org/t/p/w600_and_h900_bestv2" + movie.poster_path}
          title={movie.title}
          overview={movie.overview}
          onClickAdd={() => this.addMovieToWatchlist(movie)}
          onClickRemove={() => this.removeMovieFromWatchlist(movie.id)} />
      )
    })
    return movies
  }

  render() {
    return (
      <div>
        <h1>Featured</h1>
        {this.state.featuredMovies.length > 0 &&
          <div>{this.buildMovieCards()}</div>
        }
      </div>
    )
  }
}