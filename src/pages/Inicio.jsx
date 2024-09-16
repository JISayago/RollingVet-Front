import { Card, Col, Container, Row } from "react-bootstrap"
import ButtonOption from "../components/ButtonOption"

function Inicio() {
  const cardData = [
    {
      logo: 'https://via.placeholder.com/100',  // Reemplaza con la URL de tu logo
      title: 'Título 1',
      description: 'Descripción de la primera card.'
    },
    {
      logo: 'https://via.placeholder.com/100',
      title: 'Título 2',
      description: 'Descripción de la segunda card.'
    },
    {
      logo: 'https://via.placeholder.com/100',
      title: 'Título 3',
      description: 'Descripción de la tercera card.'
    },
    {
      logo: 'https://via.placeholder.com/100',
      title: 'Título 4',
      description: 'Descripción de la cuarta card.'
    },
    {
      logo: 'https://via.placeholder.com/100',
      title: 'Título 5',
      description: 'Descripción de la quinta card.'
    },
    {
      logo: 'https://via.placeholder.com/100',
      title: 'Título 6',
      description: 'Descripción de la sexta card.'
    },
  ];
  return (
    <Container fluid className="flex-grow-1">
    {/* Aquí va el contenido principal */}
    <Container fluid className="py-4">
  <Row className="text-center">
    <Col md={3} className="mb-3">
      <ButtonOption route="/ruta1" text="Sacar Turno" />
    </Col>
    <Col md={3} className="mb-3">
      <ButtonOption route="/ruta2" text="Nuestros Especialistas" />
    </Col>
    <Col md={3} className="mb-3">
      <ButtonOption route="/ruta3" text="Planes disponibles para mascotas" />
    </Col>
    <Col md={3} className="mb-3">
      <ButtonOption route="/ruta4" text="Sucursales" />
    </Col>
  </Row>
    </Container>
    
    <Container className="py-5">
  <Row>
    {cardData.map((card, index) => (
      <Col key={index} sm={12} md={6} lg={4} className="mb-4">
        <Card className="h-100">
          <Card.Img variant="top" src={card.logo} alt={`Logo ${index + 1}`} />
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.description}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>
);
  </Container>
  )
}

export default Inicio