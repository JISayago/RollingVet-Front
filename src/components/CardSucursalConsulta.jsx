import React from 'react'
import { Card, Col } from 'react-bootstrap'

function CardSucursalConsulta({sucursal }) {
  return (
    <Col key={sucursal.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
    <Card className="text-center" style={{ width: '100%', height: '100%' }}>
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <Card.Title>{sucursal.nombre}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Dirección</Card.Subtitle>
        <Card.Text>{sucursal.direccion}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Número de Contacto</Card.Subtitle>
        <Card.Text>{sucursal.numeroContacto}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Correo de Contacto</Card.Subtitle>
        <Card.Text>{sucursal.correo}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Atención de Emergencias 24 hs</Card.Subtitle>
        <Card.Text>{sucursal.atiendeEmergencia24H ? 'Sí' : 'No'}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
  )
}

export default CardSucursalConsulta