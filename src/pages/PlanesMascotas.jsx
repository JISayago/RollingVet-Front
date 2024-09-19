// PlanesDeSuscripcion.js

import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

const PlanesDeSuscripcion = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Información de los planes
  const planes = [
    {
      id: 'primeros-pasos',
      nombre: 'Plan Primeros Pasos',
      edad: '0-5 años',
      descripcion: 'Este plan está diseñado para cachorros y mascotas jóvenes. Incluye vacunas básicas, chequeos regulares y consejos para su desarrollo.',
    },
    {
      id: 'madurando',
      nombre: 'Plan Madurando',
      edad: '5-10 años',
      descripcion: 'Para mascotas en la etapa media de su vida, este plan incluye chequeos más frecuentes, vacunas y tratamientos preventivos.',
    },
    {
      id: 'adultos',
      nombre: 'Plan Adultos',
      edad: 'más de 10 años',
      descripcion: 'Este plan es ideal para mascotas mayores. Ofrece chequeos geriátricos, pruebas de salud y atención especializada.',
    },
  ];

  return (
    <Container>
      <h2>Planes de Suscripción para Mascotas</h2>
      <Row className="mb-4">
        {planes.map(plan => (
          <Col md={4} key={plan.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{plan.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Edad: {plan.edad}</Card.Subtitle>
                <Card.Text>{plan.descripcion}</Card.Text>
                <Button 
                  variant="primary" 
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  Más Información
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedPlan && (
        <div className="mt-4">
          <h3>Contacto para {planes.find(plan => plan.id === selectedPlan).nombre}</h3>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu nombre" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" placeholder="Ingresa tu correo electrónico" />
            </Form.Group>
            <Form.Group controlId="formReferenceNumber">
              <Form.Label>Número de Referencia</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu número de referencia" />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Escribe tu mensaje aquí" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
          <p className="mt-3">¡Pronto nos pondremos en contacto contigo!</p>
        </div>
      )}
    </Container>
  );
};

export default PlanesDeSuscripcion;
