import React from 'react'
import { Card, Col } from 'react-bootstrap'

function CardPresentacionInicio({card,index }) {
  return (
    <Col key={index} sm={12} md={6} lg={4} className="mb-4">
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={card.logo}
        alt={`Logo ${index + 1}`}
        style={{ width: '100px', height: '100px', objectFit: 'contain', margin: '0 auto', padding: '20px' }}
      />
      <Card.Body>
        <Card.Title className="text-center">{card.title}</Card.Title>
        <Card.Text className="p-4">{card.description}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
  )
}

export default CardPresentacionInicio