import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import Button from '../../UILibrary/Button/Button'
import './Card.scss'

export default function MovieCard(props) {
  return (
    <Card className="cardBody my-3 p-3">
      <Row>
        <Col lg={2} className="mb-3">
          <img className="mw-100" alt="movie_poster" src={props.poster} />
        </Col>
        <Col lg={10} className="mb-3">
          <React.Fragment className="m-3">
            <h3>{props.title}</h3>
            <p>{props.overview}</p>
            <Button onClick={props.onClickAdd}>Add</Button>
            <Button onClick={props.onClickRemove}>Remove</Button>
          </React.Fragment>
        </Col>
      </Row>
    </Card>
  )
}