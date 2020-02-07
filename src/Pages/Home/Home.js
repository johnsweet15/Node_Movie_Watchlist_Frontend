import React from 'react'
import { Button } from 'react-bootstrap';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <Button onClick={() => this.props.history.push('/login')}>Login</Button>
      </div>
    )
  }
}