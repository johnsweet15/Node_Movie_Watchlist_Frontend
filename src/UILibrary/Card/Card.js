import React from 'react'
import { Card, Button } from 'react-bootstrap'

export default function MovieCard(props) {
  return (
    <Card>
      <h3>{props.title}</h3>
      <p>{props.overview}</p>
      <Button onClick={props.onClickAdd}>Add</Button>
      <Button onClick={props.onClickRemove}>Remove</Button>
    </Card>
  )
}