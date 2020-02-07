import React from 'react'
import CookieUtils from '../../Utils/Cookies'
import LoginService from '../../Services/LoginService'

export default class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      profile: null
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
        <h1>Home</h1>
        {this.props.isLoggedIn &&
          <div>
            <h4>{"Welcome " + this.props.profile.name + "!"}</h4>
          </div>
        }
      </div>
    )
  }
}