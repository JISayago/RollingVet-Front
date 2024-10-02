// TurnosComponent.js
import  { useState, useEffect } from 'react';
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import clienteAxios from '../helpers/axios.config';

const Turnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());

  // Obtener la fecha actual en formato YYYY-MM-DD
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const cargarrTurnosBD = async () => {
    try {
      const response = await clienteAxios.get(`/turnos/${selectedDate}`);
      console.log("dentro de try response",response)
      setTurnos(response.data);
    } catch (error) {
      console.error('Error al cargar los turnos:', error);
    }
  }
  // Cargar los turnos desde la base de datos
  useEffect(() => {
    cargarrTurnosBD()
  }, [selectedDate]);
  const convertAFormatoFecha = (dia) => {
    let diaConvertido = new Date(dia); 
    
    let d = diaConvertido.getUTCDate(); 
    let m = diaConvertido.getUTCMonth() + 1; 
    let a = diaConvertido.getUTCFullYear(); 
    
    let formattedDate = `${d.toString().padStart(2, '0')}/${m.toString().padStart(2, '0')}/${a}`;
    return formattedDate; 
    
  }


  return (
    <Container>
      <h2>Reserva de Turnos</h2>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="formDate">
            <Form.Label>Selecciona una fecha</Form.Label>
            <Form.Control 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)} 
            />
          </Form.Group>
        </Col>
         </Row>

      <Row>
        {turnos.map(turno => (
          <Col md={4} key={turno._id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{turno.motivo}</Card.Title>
                <Card.Text>
                  <strong>Fecha:</strong> {convertAFormatoFecha(turno.dia)} <br />
                  <strong>Hora:</strong> {turno.hora} <br />
                  <strong>Profesional:</strong> {turno.responsable} <br />
                  <strong>Motivo:</strong> {turno.motivo}
                  <strong>Reservado:</strong> {turno.reservado ? "Reservado":"Disponible"} <br />
                </Card.Text>
                <Button variant="primary" disabled={turno.reservado}>Agendar Turno</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Turnos;
