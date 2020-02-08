import React from 'react'
import { Nav, Form, FormControl, Navbar } from 'react-bootstrap'
import Button from '../../UILibrary/Button/Button'
import './Navbar.scss'
import { Cookies } from 'react-cookie';


export default class MovieNavbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      pageCount: 2
    }

    this.search = React.createRef()
  }

  goToSearch = async (e) => {
    e.preventDefault()
    this.props.history.push('/search?search=' + this.state.search + "&pageCount=" + this.state.pageCount)
  }

  onSearchChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  logout() {
    let cookies = new Cookies()
    cookies.remove("jwt")
    cookies.remove("userId")
    window.location.reload()
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" className="navBody py-3 navbar-dark">
        <Navbar.Brand href="/">MovieApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navbar-toggle navbar-toggler" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {this.props.isLoggedIn ?
              <React.Fragment>
                <Nav.Link href="/featured">Featured</Nav.Link>
                <Nav.Link href="/watchlist">Watchlist</Nav.Link>
                <Nav.Link onClick={this.logout}>Logout</Nav.Link>
              </React.Fragment> :
              <React.Fragment>
                <Nav.Link href="/featured">Featured</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </React.Fragment>
            }
          </Nav>
          <Form inline className="navForm" onSubmit={(e) => this.goToSearch(e)}>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" ref={this.search} onChange={(e) => this.onSearchChange(e)} />
            <Button variant="outline-info" onClick={(e) => this.goToSearch(e)}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}