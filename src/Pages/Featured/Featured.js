import React from 'react'
import MovieDBService from '../../Services/MovieDBService'
import LayoutUtils from '../../Utils/Layout'
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

  render() {
    return (
      <div>
        <h1>Featured</h1>
        {this.state.featuredMovies.length > 0 &&
          <div>{LayoutUtils.buildMovieCards(this.state.featuredMovies, "featured")}</div>
        }
      </div>
    )
  }
}