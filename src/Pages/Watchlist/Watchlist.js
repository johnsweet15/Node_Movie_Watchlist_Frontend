import React from 'react'
import WatchlistService from '../../Services/WatchlistService'
import CookieUtils from '../../Utils/Cookies'
import LayoutUtils from '../../Utils/Layout'
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

  render() {
    return (
      <div>
        <h1>Watchlist</h1>
        {this.state.watchlist.length > 0 &&
          <div>{LayoutUtils.buildMovieCards(this.state.watchlist, "watchlist")}</div>
        }
      </div>
    )
  }
}