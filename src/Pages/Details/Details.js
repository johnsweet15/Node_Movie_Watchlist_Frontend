import React from 'react';
import MovieBDService from '../../Services/MovieDBService'
import { DetailsCard } from '../../UILibrary/Card/Card'

export default class Details extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      movie: {}
    }
  }

  componentDidMount() {
    this.parseURL()
  }

  parseURL() {
    let url = new URL(window.location.href)
    let movieId = url.searchParams.get("movieId")
    this.getMovie(movieId)
  }

  async getMovie(movieId) {
    let response = await MovieBDService.getMovieById(movieId)
    if (response.status === 200) {
      this.setState({ movie: response.data })
    }
  }

  buildMovieCard = () => {
    let movie = this.state.movie
    return (
      <DetailsCard
        background={"https://image.tmdb.org/t/p/original" + movie.backdrop_path}
        poster={"https://image.tmdb.org/t/p/w600_and_h900_bestv2" + movie.poster_path}
        title={movie.title}
        overview={movie.overview}
        releaseDate={movie.release_date} />
    )
  }

  render() {
    return (
      <div>
        <h1>Details</h1>
        {this.buildMovieCard()}
      </div>
    )
  }
}