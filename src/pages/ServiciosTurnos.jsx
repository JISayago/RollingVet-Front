import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Array de servicios basado en el NavDropdown
const servicios = [
  {
    id: 1,
    titulo: 'Consulta Veterinaria',
    descripcion: 'Consulta general para el cuidado y bienestar de tu mascota.',
  },
  {
    id: 2,
    titulo: 'Cirugías',
    descripcion: 'Realizamos cirugías de todo tipo, garantizando el mejor cuidado.',
  },
  {
    id: 3,
    titulo: 'Peluquería',
    descripcion: 'Servicio completo de peluquería para mascotas.',
  },
  {
    id: 4,
    titulo: 'Visitas a Domicilio',
    descripcion: 'Nos encargamos de cuidar a tu mascota en la comodidad de tu hogar.',
  },
];

// Componente de Servicios
const ServiciosCards = () => {
  return (
    <Container className="my-5">
      {/* Título centralizado */}
      <h2 className="text-center mb-4">Nuestros Servicios</h2>
      
      {/* Tarjetas de Servicios */}
      <Row className="gy-4">
        {servicios.map((servicio) => (
          <Col xs={12} md={6} lg={4} key={servicio.id}>
            <Card className="h-100 text-center"> {/* Centramos el contenido de la card */}
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>{servicio.titulo}</Card.Title>
                <Card.Text>{servicio.descripcion}</Card.Text>
                <Button variant="primary">Sacar turno</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ServiciosCards;
