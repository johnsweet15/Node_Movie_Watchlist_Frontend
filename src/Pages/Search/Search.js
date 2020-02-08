import React from 'react'
import MovieDBService from '../../Services/MovieDBService'
import LayoutUtils from '../../Utils/Layout'

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
      for(var i = pageCount; i > 0; i--) {
        let response = await MovieDBService.getSearchedMovies(search, i)
        searchList = response.data.results.concat(searchList)
      }
      this.setState({searchedMovies: searchList})
    }
  }

  render() {
    return (
      <div>
        <h1>Search</h1>
        {this.state.searchedMovies.length > 0 &&
          <div>{LayoutUtils.buildMovieCards(this.state.searchedMovies, "searched")}</div>
        }
      </div>
    )
  }
}