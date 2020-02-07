import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import Button from '../../UILibrary/Button/Button'
import './Card.scss'

export default function MovieCard(props) {
  return (
    <Card className="cardBody my-3 p-3" key={props.key}>
      <Row>
        <Col lg={2} className="my-2">
          <img className="mw-100" alt="movie_poster" src={props.poster} />
        </Col>
        <Col lg={10} className="my-2">
          <div className="m-3">
            <h3>{props.title}</h3>
            <p>{props.overview}</p>
            {props.onClickAdd && <Button onClick={props.onClickAdd}>Add to Watchlist</Button>}
            {props.onClickRemove && <Button onClick={props.onClickRemove}>Remove</Button>}
          </div>
        </Col>
      </Row>
    </Card>
  )
}