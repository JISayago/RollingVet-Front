import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { convertAFormatoFecha } from '../../helpers/funcionesUtiles'

function CardTurno({turno,handleReserva }) {
        
  return (
    <Col md={4} key={turno._id} className="mb-3">
    <Card>
      <Card.Body >
        <Card.Title>{turno.motivo}</Card.Title>
        <Card.Text>
          <strong>Fecha:</strong> {convertAFormatoFecha(turno.dia)} <br />
          <strong>Hora:</strong> {turno.hora} <br />
          <strong>Profesional:</strong> {turno.responsable} <br />
          <strong>Motivo:</strong> {turno.motivo}
          <strong>Reservado:</strong> {turno.reservado ? "Reservado":"Disponible"} <br />
        </Card.Text>
        <Button onClick={(e) => handleReserva(e,turno._id)} style={{backgroundColor:'#09336b'}} disabled={turno.reservado}>{`${turno.reservado ? "Reservado":"Agendar Turno"}`}</Button>
      </Card.Body>
    </Card>
  </Col>
  )
}

export default CardTurno