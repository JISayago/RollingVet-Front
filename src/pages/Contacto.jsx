import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Datos de las sucursales
const branches = [
  { 
    id: 1,
    name: 'Sucursal Centro',
    address: 'Av. Principal 123, Ciudad',
    contactNumber: '+123456789',
    contactEmail: 'centro@empresa.com',
    emergency24h: true
  },
  { 
    id: 2,
    name: 'Sucursal Norte',
    address: 'Calle Secundaria 456, Ciudad',
    contactNumber: '+987654321',
    contactEmail: 'norte@empresa.com',
    emergency24h: false
  },
  { 
    id: 3,
    name: 'Sucursal Sur',
    address: 'Avenida Tercera 789, Ciudad',
    contactNumber: '+456789123',
    contactEmail: 'sur@empresa.com',
    emergency24h: true
  },
  // Se han duplicado varias sucursales en los datos originales, eliminamos los duplicados aquí
];

const Contacto = () => {
  const [formData, setFormData] = useState({
    reason: '',
    message: '',
    branch: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulario enviado');
    // Aquí podrías añadir la lógica para enviar el formulario
  };

  return (
    <Container fluid style={{ padding: '2rem' }}>
      <Row>
        {/* Formulario de contacto */}
        <Col xs={12} md={8} lg={6} className="mx-auto mb-4">
          <div style={{
            backgroundColor: '#007bff', // Fondo azul
            padding: '2rem',
            borderRadius: '8px',
            color: '#fff'
          }}>
            <h2 className="text-center">Formulario de Contacto</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formReason">
                <Form.Label>Motivo</Form.Label>
                <Form.Control
                  as="select"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un motivo</option>
                  <option value="consulta">Consulta</option>
                  <option value="sugerencia">Sugerencia</option>
                  <option value="queja">Queja</option>
                </Form.Control>
              </Form.Group>
              
              <Form.Group controlId="formMessage">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              
              <Form.Group controlId="formBranch">
                <Form.Label>Sucursal</Form.Label>
                <Form.Control
                  as="select"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una sucursal</option>
                  {branches.map(branch => (
                    <option key={branch.id} value={branch.name}>{branch.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              
              <div className="d-flex justify-content-center mt-3">
                <Button variant="light" type="submit">
                  Enviar
                </Button>
              </div>
            </Form>
          </div>
        </Col>
        
        {/* Información de sucursales */}
        <Col xs={12} className="mt-4">
          <h2 className="text-center">Sucursales</h2>
          <Row className="justify-content-center">
            {branches.map(branch => (
              <Col key={branch.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="text-center" style={{ width: '100%', height: '100%' }}>
                  <Card.Body>
                    <Card.Title>{branch.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Dirección</Card.Subtitle>
                    <Card.Text>{branch.address}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Número de Contacto</Card.Subtitle>
                    <Card.Text>{branch.contactNumber}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Correo de Contacto</Card.Subtitle>
                    <Card.Text>{branch.contactEmail}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Atención de Emergencias 24 hs</Card.Subtitle>
                    <Card.Text>{branch.emergency24h ? 'Sí' : 'No'}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;
