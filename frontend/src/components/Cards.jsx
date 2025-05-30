import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const Cards = (props) => {
  
  return (
    <div>
       <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.logo} />
      <Card.Body>
        <Card.Title>{props.company}</Card.Title>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {new Date(props.datePosted).toLocaleDateString()}
        </Card.Text>
        <Button variant="primary">Details</Button>
        </Card.Body>
    </Card>
    </div>
  )
}

export default Cards
