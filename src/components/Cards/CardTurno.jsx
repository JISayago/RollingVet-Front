import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'

function CardTurno({turno,handleReserva }) {
    const convertAFormatoFecha = (dia) => {
        let diaConvertido = new Date(dia);
        
        let d = diaConvertido.getUTCDate();
        let m = diaConvertido.getUTCMonth() + 1;
        let a = diaConvertido.getUTCFullYear();
        
        let formattedDate = `${d.toString().padStart(2, '0')}/${m.toString().padStart(2, '0')}/${a}`;
        return formattedDate;
    }
        
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