import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import clienteAxios from '../helpers/axios.config';
import "../css/contacto_sucursales.css"


const Contacto = () => {
 const [sucursales,setSucursales] = useState([])

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
  const obtenerSucursales = async () => {
    const sucursalesBD = await clienteAxios.get("/sucursales");
    setSucursales(sucursalesBD.data)
 }
  useState(() => {
    obtenerSucursales();
  })

  return (
    <Container fluid style={{ padding: '2rem' }}>
      <Row>
        {/* Formulario de contacto */}
       
        
        {/* Información de sucursales */}
        <Col xs={12} className="mt-4">
          <h2 className="text-center">Sucursales</h2>
          <Row className="justify-content-center">
            {sucursales.map(s => (
              <Col key={s.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="text-center" style={{ width: '100%', height: '100%' }}>
                  <Card.Body>
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
          <div className='contacto-form'>
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
                  {sucursales.map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              
              <div className="d-flex justify-content-center mt-3">
                <Button  type="submit" className='contacto-form-boton'>
                  Enviar
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;
