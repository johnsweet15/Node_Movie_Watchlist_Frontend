import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import CookieUtils from './Utils/Cookies';
import Featured from './Pages/Featured/Featured';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Watchlist from './Pages/Watchlist/Watchlist';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  componentDidMount() {
    let jwt = CookieUtils.getCookie("jwt")
    if(jwt) {
      console.log('signed in')
    }
  }
  render() {
    return (
      <div>
        <Route path="/" exact render={(props) =>
          <Home {...props} />
        } />
        <Route path="/login" exact render={(props) =>
          <Login {...props} />
        } />
        <Route path="/featured" exact render={(props) =>
          <Featured {...props} />
        } />
        <Route path="/watchlist" exact render={(props) =>
          <Watchlist {...props} />
        } />
      </div>
    )
  }
}
