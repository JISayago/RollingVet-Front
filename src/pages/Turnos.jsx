import  { useState, useEffect } from 'react';
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import clienteAxios from '../helpers/axios.config';

const Turnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [seReserva,setSeReserva] = useState(false)

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
      setTurnos(response.data);
    } catch (error) {
      alert('Error al cargar los turnos');
    }
  }

  useEffect(() => {
    cargarrTurnosBD()
    setSeReserva(false)
  }, [selectedDate,seReserva]);
  const convertAFormatoFecha = (dia) => {
    let diaConvertido = new Date(dia); 
    
    let d = diaConvertido.getUTCDate(); 
    let m = diaConvertido.getUTCMonth() + 1; 
    let a = diaConvertido.getUTCFullYear(); 
    
    let formattedDate = `${d.toString().padStart(2, '0')}/${m.toString().padStart(2, '0')}/${a}`;
    return formattedDate; 
    
  }
  const handleReserva = (e, idTurno) => {
    e.preventDefault();
   reservar(idTurno)
  }
  const reservar = async (idTurno) => {
    try {
      const tok = JSON.parse(sessionStorage.getItem("token"));
      const result = await clienteAxios.post(
        `/turnos/reserva/${idTurno}`,
        {},
        {headers: {
            "Content-Type": "application/json",
            "auth": tok
          }}
      );
      if (result && result.status === 200) {
        alert("Turno reservado con éxito.");
        setSeReserva(true)
      } else {
        alert("Error inesperado al intentar registrar.");
      }
    } catch (error) {
      if (error.response) {
        alert("Error: " + (error.response.data.message || "Ha ocurrido un error."));
      } else if (error.request) {
        alert("No se pudo conectar al servidor. Por favor, inténtalo más tarde.");
      } else {
        alert("Hubo un error al configurar la solicitud.");
      }
    }
  };

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
        ))}
      </Row>
    </Container>
  );
};

export default Turnos;
