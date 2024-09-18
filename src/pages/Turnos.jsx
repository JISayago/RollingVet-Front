// TurnosComponent.js

import React, { useState } from 'react';
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';

// Datos de ejemplo actualizados
const turnos = [
  { id: 1, fecha: '2024-09-18', hora: '19:00', tipo: 'Cirugía', profesional: 'Dr. Juan Pérez', especialidad: 'General', reservado: false, sucursal: 'Sucursal A'},
  { id: 2, fecha: '2024-09-23', hora: '09:00', tipo: 'Consulta veterinaria', profesional: 'Dr. Juan Pérez', especialidad: 'General', reservado: true, sucursal: 'Sucursal B'},
  { id: 3, fecha: '2024-09-23', hora: '14:00', tipo: 'Cirugía', profesional: 'Dr. Ana Gómez', especialidad: 'General', reservado: false, sucursal: 'Sucursal A'},
  { id: 4, fecha: '2024-09-24', hora: '09:00', tipo: 'Cirugía', profesional: 'Dr. Luis Fernández', especialidad: 'Cirugía', reservado: false, sucursal: 'Sucursal C'},
  { id: 5, fecha: '2024-09-24', hora: '14:00', tipo: 'Peluquería canina', profesional: 'Dr. Marta Ruiz', especialidad: 'Peluquería', reservado: true, sucursal: 'Sucursal B'},
  // Agrega más turnos aquí
];

const tiposDeTurno = [
  'Consulta veterinaria',
  'Cirugía',
  'Visita veterinaria',
  'Peluquería canina'
];

const sucursales = [
  'Sucursal A',
  'Sucursal B',
  'Sucursal C'
];

const Turnos = () => {
  // Obtener la fecha actual en formato YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Inicializar el estado con la fecha actual
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedTipo, setSelectedTipo] = useState('');
  const [selectedSucursal, setSelectedSucursal] = useState('');

  // Filtra los turnos según la fecha, tipo y sucursal seleccionados
  const filteredTurnos = turnos.filter(turno => 
    (selectedDate ? turno.fecha === selectedDate : true) &&
    (selectedTipo ? turno.tipo === selectedTipo : true) &&
    (selectedSucursal ? turno.sucursal === selectedSucursal : true) &&
    !turno.reservado // Mostrar solo turnos no reservados
  );

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
        <Col md={4}>
          <Form.Group controlId="formTipo">
            <Form.Label>Selecciona tipo de turno</Form.Label>
            <Form.Control 
              as="select"
              value={selectedTipo}
              onChange={(e) => setSelectedTipo(e.target.value)}
            >
              <option value="">Todos</option>
              {tiposDeTurno.map((tipo, index) => (
                <option key={index} value={tipo}>{tipo}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="formSucursal">
            <Form.Label>Selecciona sucursal</Form.Label>
            <Form.Control 
              as="select"
              value={selectedSucursal}
              onChange={(e) => setSelectedSucursal(e.target.value)}
            >
              <option value="">Todas</option>
              {sucursales.map((sucursal, index) => (
                <option key={index} value={sucursal}>{sucursal}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        {filteredTurnos.map(turno => (
          <Col md={4} key={turno.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{turno.tipo}</Card.Title>
                <Card.Text>
                  <strong>Fecha:</strong> {turno.fecha} <br />
                  <strong>Hora:</strong> {turno.hora} <br />
                  <strong>Profesional:</strong> {turno.profesional} <br />
                  <strong>Especialidad:</strong> {turno.especialidad} <br />
                  <strong>Sucursal:</strong> {turno.sucursal}
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
