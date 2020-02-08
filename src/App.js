import React from 'react';
import './App.scss';
import { Route } from 'react-router-dom';
import CookieUtils from './Utils/Cookies';
import LoginService from './Services/LoginService'
import Featured from './Pages/Featured/Featured';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Watchlist from './Pages/Watchlist/Watchlist';
import MovieNavbar from './UILibrary/Navbar/Navbar';
import Search from './Pages/Search/Search';
import Details from './Pages/Details/Details';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      profile: {}
    }
  }
  componentDidMount() {
    this.authenticate()
  }

  async authenticate() {
    let jwt = CookieUtils.getCookie("jwt")
    if (jwt) {
      let response = await LoginService.getProfile({ headers: { "jwt": jwt } })
      if (response.status === 200 && response.data.profile) {
        this.setState({ profile: response.data.profile, isLoggedIn: true })
      }
    }
  }

  render() {
    return (
      <div>
        <MovieNavbar {...this.props} isLoggedIn={this.state.isLoggedIn} profile={this.state.profile} />
        <div className='bodyWrapper mx-auto'>

          <Route path="/" exact render={(props) =>
            <Home {...props}
              isLoggedIn={this.state.isLoggedIn}
              profile={this.state.profile} />
          } />
          <Route path="/login" exact render={(props) =>
            <Login {...props} />
          } />
          <Route path="/featured" exact render={(props) =>
            <Featured {...props} />
          } />
          <Route path="/watchlist" exact render={(props) =>
            <Watchlist  {...props} />
          } />
          <Route path="/search" exact render={(props) =>
            <Search  {...props} />
          } />
          <Route path="/details" exact render={(props) =>
            <Details  {...props} />
          } />
        </div>
      </div>
    )
  }
}
