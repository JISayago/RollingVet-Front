import React from 'react'
import { Card } from 'react-bootstrap'

function ConsultaMascotaPerfilUsuario({ficha }) {
  return (
    <Card key={ficha._id} className="mb-3">
    <Card.Body>
      <Card.Title>{ficha.vistoPor}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">Fecha {ficha.fecha}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">Motivo: {ficha.motivo}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">Mascota: {ficha.mascotaNombre}</Card.Subtitle>
    </Card.Body>
  </Card>
  )
}

export default ConsultaMascotaPerfilUsuario