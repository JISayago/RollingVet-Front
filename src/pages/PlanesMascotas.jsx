import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import clienteAxios from '../helpers/axios.config';
import { configHeaders } from '../helpers/extra.config';

const PlanesDeSuscripcion = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    numero: '',
    mensaje: '',
    plan: '',
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePlanSelect = (planId) => {
    const selectedPlan = planes.find((plan) => plan.id === planId);
    setFormData((prevData) => ({
      ...prevData,
      plan: selectedPlan.nombre,
    }));
  };


  const envioMail = async() => {
    const { nombre, email, numero, mensaje, plan } = formData;

    if (!nombre || !email || !numero || !mensaje || !plan) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    try {
      await clienteAxios.post(
        '/mensajes/pedido-plan',
        formData,
        configHeaders
      );
      alert('Formulario enviado correctamente.');
      // Reinicia el formulario después de enviarlo
      setFormData({
        nombre: '',
        email: '',
        numero: '',
        mensaje: '',
        plan: '',
      });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error al enviar el formulario. Por favor, inténtalo nuevamente.');
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    envioMail()
    
  };

  return (
    <Container>
      <h2>Planes de Suscripción para Mascotas</h2>
      <Row className="mb-4">
        {planes.map((plan) => (
          <Col md={4} key={plan.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{plan.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Edad: {plan.edad}</Card.Subtitle>
                <Card.Text>{plan.descripcion}</Card.Text>
                <Button variant="primary" onClick={() => handlePlanSelect(plan.id)}>
                  Más Información
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {formData.plan && (
        <Container className="mt-4">
          <h3>Contacto para {formData.plan}</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu correo electrónico"
                required
              />
            </Form.Group>
            <Form.Group controlId="formReferenceNumber">
              <Form.Label>Número de Referencia</Form.Label>
              <Form.Control
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                placeholder="Ingresa tu número de referencia"
                required
              />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Container>
      )}
    </Container>
  );
};

export default PlanesDeSuscripcion;
