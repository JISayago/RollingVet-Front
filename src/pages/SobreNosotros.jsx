import { Container, Row, Col, Card } from 'react-bootstrap';

const SobreNosotros = () => {
  return (
    <Container fluid style={{ padding: '2rem', textAlign: 'center' }}>
      <h2 className="mb-4" style={{ color: '#f45e00' }}>Sobre Nosotros</h2>
      <p className="mb-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
        Soy Juan Ignacio Sayago, encargado de realizar esta página. Por cuestiones personales solicité realizarlo solo, aunque por el tamaño de la aplicación, me apoyé en Chat-GPT para que me ayudara con el armado de algunos componentes para poder cumplir con los plazos.
        El proyecto se trata de una página web para gestión de una veterinaria, enfocada en los turnos y mascotas. Siendo la venta de productos una idea a desarrollar e incorporar en un futuro.
        Si hay algo que defina mi programación es: Lo más importante es que ande, después el resto.
      </p>
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={4} className="mb-4">
          <Card>
            <Card.Img 
              variant="top" 
              src="https://res.cloudinary.com/dqhdgsolz/image/upload/v1727968281/perfil_chwiui.png" 
              style={{ height: '200px', objectFit: 'contain' }} 
            />
            <Card.Body className="text-center">
              <Card.Title>Juan Ignacio Sayago</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SobreNosotros;
