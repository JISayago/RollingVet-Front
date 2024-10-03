import  { useState, useEffect } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import clienteAxios from '../helpers/axios.config';
import CardTurno from '../components/CardTurno';
import { useNavigate } from "react-router-dom";

const Turnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [seReserva, setSeReserva] = useState(false)
  const navigate = useNavigate();

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
  }, [selectedDate, seReserva]);

  const handleReserva = (e, idTurno) => {
    e.preventDefault();
    reservar(idTurno)
  }
  const reservar = async (idTurno) => {
    try {
      const tok = JSON.parse(sessionStorage.getItem("token"));
      if (tok) {
        const result = await clienteAxios.post(
          `/turnos/reserva/${idTurno}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "auth": tok
            }
          }
        );
        if (result && result.status === 200) {
          alert("Turno reservado con éxito.");
          setSeReserva(true)
        } else {
          alert("Error inesperado al intentar registrar.");
        }
      } else {
        alert("Por favor ingresa al sistema si quieres reservar un turno.");
        navigate('/')
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
          <CardTurno key={turno._id} turno={turno} handleReserva={handleReserva} />
        ))}
      </Row>
    </Container>
  );
}
export default Turnos;
