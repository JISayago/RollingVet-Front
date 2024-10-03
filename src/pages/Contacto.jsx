import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import clienteAxios from '../helpers/axios.config';
import "../css/contacto_sucursales.css";

import { configHeaders } from '../helpers/extra.config';

const Contacto = () => {
  const [sucursales, setSucursales] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    asunto: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const envioMail = async () => {
    try {
      const result = await clienteAxios.post(
        '/mensajes/contacto',
        formData,
        configHeaders
      );
      alert("Mensaje enviado correctamente!");
      setFormData({
        email: '',
        asunto: '',
        mensaje: '',
      });
    } catch (error) {
      alert("Error al enviar el mensaje. Inténtelo de nuevo.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    envioMail();
  };

  const obtenerSucursales = async () => {
    const sucursalesBD = await clienteAxios.get("/sucursales");
    setSucursales(sucursalesBD.data);
  };

  useState(() => {
    obtenerSucursales();
  }, []);

  return (
    <Container fluid style={{ padding: '2rem' }}>
      <Row>
        <Col xs={12} className="mt-4">
          <h2 className="text-center">Sucursales</h2>
          <Row className="justify-content-center">
            {sucursales.map(s => (
              <Col key={s.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="text-center" style={{ width: '100%', height: '100%' }}>
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <Card.Title>{s.nombre}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Dirección</Card.Subtitle>
                    <Card.Text>{s.direccion}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Número de Contacto</Card.Subtitle>
                    <Card.Text>{s.numeroContacto}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Correo de Contacto</Card.Subtitle>
                    <Card.Text>{s.correo}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Atención de Emergencias 24 hs</Card.Subtitle>
                    <Card.Text>{s.atiendeEmergencia24H ? 'Sí' : 'No'}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col xs={12} md={8} lg={6} className="mx-auto mb-4">
          <Container className='contacto-form mb-5'>
            <h2 className="text-center">Formulario de Contacto</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ingrese su correo electrónico"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formReason">
                <Form.Label>Asunto</Form.Label>
                <Form.Control
                  as="select"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un asunto</option>
                  <option value="consulta">Consulta</option>
                  <option value="sugerencia">Sugerencia</option>
                  <option value="reclamo">Reclamo</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formMessage">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Ingrese su mensaje"
                  required
                />
              </Form.Group>

              <Container className="d-flex justify-content-center mt-3">
                <Button type="submit" className="contacto-form-boton">
                  Enviar
                </Button>
              </Container>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;
