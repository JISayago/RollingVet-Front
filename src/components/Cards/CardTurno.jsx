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
  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
    <div>
      <strong>Fecha:</strong> {convertAFormatoFecha(turno.dia)}
    </div>
    <div>
      <strong>Hora:</strong> {turno.hora}
    </div>
    <div>
      <strong>Profesional:</strong> {turno.responsable}
    </div>
    <div>
      <strong>Motivo:</strong> {turno.motivo}
    </div>
    <div>
      <strong>Reservado:</strong> {turno.reservado ? "Reservado" : "Disponible"}
    </div>
  </div>
</Card.Text>

        <Button onClick={(e) => handleReserva(e,turno._id)} style={{backgroundColor:'#09336b'}} disabled={turno.reservado}>{`${turno.reservado ? "Reservado":"Agendar Turno"}`}</Button>
      </Card.Body>
    </Card>
  </Col>
  )
}

export default CardTurno