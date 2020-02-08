import React from 'react'
import { Form, Button } from 'react-bootstrap'
import LoginService from '../../Services/LoginService'
import CookieUtils from '../../Utils/Cookies'

export default class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
    this.email = React.createRef()
    this.password = React.createRef()
  }

  async login(e) {
    e.preventDefault()
    let response = await LoginService.login({
      email: this.state.email,
      password: this.state.password
    })
    if(response.data.success) {
      CookieUtils.setCookie("jwt", response.data.token)
      CookieUtils.setCookie('userId', response.data._id)
      this.props.history.push('/')
      window.location.reload()
    }
  }

  onEmailChange = () => {
    this.setState({email: this.email.current.value})
  }

  onPasswordChange = () => {
    this.setState({password: this.password.current.value})
  }

  render() {
    return (
      <div>
        <Form onSubmit={(e) => this.login(e)}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={this.email} onChange={this.onEmailChange} />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={this.password} onChange={this.onPasswordChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}