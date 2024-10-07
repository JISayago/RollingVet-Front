import React from 'react'
import { Card } from 'react-bootstrap'

function CardProximoTurnoPerfilUsuario({turnoMasProximo }) {
    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    return (
    <Card className="mt-3" style={{ width: '100%' }}>
    <Card.Body>
      <Card.Title>Próximo Turno</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{`Día: ${getCurrentDate(turnoMasProximo.dia)}`}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">{`Hora: ${turnoMasProximo.hora}`}</Card.Subtitle>
      <Card.Text>Motivo: {turnoMasProximo.motivo}</Card.Text>
    </Card.Body>
  </Card>
  )
}

export default CardProximoTurnoPerfilUsuario