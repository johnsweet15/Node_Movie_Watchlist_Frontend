import React from 'react'
import { Button } from 'react-bootstrap'
import './Button.scss'

export default function MovieButton(props) {
  return(
    <Button className="buttonBody" onClick={props.onClick} >
      {props.children}
    </Button>
  )
}