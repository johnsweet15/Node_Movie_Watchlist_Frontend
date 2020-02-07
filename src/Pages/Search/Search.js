import React from 'react'
import MovieCard from '../../UILibrary/Card/Card'
import WatchlistService from '../../Services/WatchlistService'
import MovieDBService from '../../Services/MovieDBService'
import CookieUtils from '../../Utils/Cookies'
import _ from 'lodash'

export default class Search extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      searchedMovies: []
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.search !== this.props.location.search) {
      this.parseURL()
    }
  }

  componentDidMount() {
    this.parseURL()
  }

  parseURL() {
    let url = new URL(window.location.href)
    let search = url.searchParams.get("search")
    let pageCount = url.searchParams.get("pageCount")
    this.getSearchedMovies(search, pageCount)
  }

  getSearchedMovies = async (search, pageCount) => {
    if(pageCount <= 5) {
      let searchList = []
      for(var i = 1; i <= pageCount; i++) {
        let response = await MovieDBService.getSearchedMovies(search)
        searchList = response.data.results.concat(searchList)
      }
      this.setState({searchedMovies: searchList})
    }
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

  buildMovieCards = () => {
    let movies = _.map(this.state.searchedMovies, (movie, index) => {
      return (
        <MovieCard
          key={index}
          poster={"https://image.tmdb.org/t/p/w600_and_h900_bestv2" + movie.poster_path}
          title={movie.title}
          overview={movie.overview}
          onClickAdd={() => this.addMovieToWatchlist(movie)} />
      )
    })
    return movies
  }

  render() {
    return (
      <div>
        <h1>Search</h1>
        {this.state.searchedMovies.length > 0 &&
          <div>{this.buildMovieCards()}</div>
        }
      </div>
    )
  }
}