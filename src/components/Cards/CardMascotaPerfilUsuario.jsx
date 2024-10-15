import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { calcularEdad } from '../../helpers/funcionesUtiles'

function CardMascotaPerfilUsuario({ mascota }) {
    
  return (
    <Col key={mascota.mascotaId} xs={11} md={6} lg={4} className="mb-3">
    <Card className="h-100" style={{ maxWidth: '250px' }}>
      <Card.Img variant="top" src={mascota.imagen} style={{ height: '150px', objectFit: 'cover' }} />
      <Card.Body className="text-center">
        <Card.Title>{mascota.nombre}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Años: {calcularEdad(mascota.fechaNacimiento)}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Raza: {mascota.raza}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Mascota: {mascota.tipoDeMascota}</Card.Subtitle>
        <Button
         style={{backgroundColor:'#09336b'}} href={`/perfil_mascota/${mascota.mascotaId}`}>Ver Perfil</Button>
      </Card.Body>
    </Card>
  </Col>
  )
}

export default CardMascotaPerfilUsuario