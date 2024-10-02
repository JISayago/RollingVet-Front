import { Card, Container, Row, Col } from 'react-bootstrap';

const profesionales = {
  veterinariosClinicos: [
    { nombre: 'Dr. Juan Pérez', especialidad: 'Medicina General', descripcion: 'Experto en cuidado de mascotas.', imagen: 'veterinario1.jpg' },
    { nombre: 'Dra. María González', especialidad: 'Diagnóstico y Tratamiento', descripcion: 'Amplia experiencia en diagnósticos clínicos.', imagen: 'veterinario2.jpg' },
  ],
  cirujanos: [
    { nombre: 'Dr. Carlos Martínez', especialidad: 'Cirugía General', descripcion: 'Especialista en cirugías complejas.', imagen: 'cirujano1.jpg' },
  ],
  pasantesEstudiantiles: [
    { nombre: 'Ana López', especialidad: 'Asistente Veterinaria', descripcion: 'Apoyando en la clínica durante sus estudios.', imagen: 'pasante1.jpg' },
  ],
  peluquerosCaninos: [
    { nombre: 'Javier Pérez', especialidad: 'Estética Canina', descripcion: 'Especialista en corte y estilismo canino.', imagen: 'peluquero1.jpg' },
  ]
};

function Especialistas() {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Nuestro Equipo de Profesionales</h2>
      <h3 className="text-center mb-3">Veterinarios Clínicos</h3>
      <Row className="justify-content-center">
        {profesionales.veterinariosClinicos.map((vet, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4 d-flex justify-content-center">
            <Card className="h-100 text-center" style={{ width: '18rem' }}>
              <Card.Img variant="top" src={vet.imagen} alt={vet.nombre} />
              <Card.Body>
                <Card.Title>{vet.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{vet.especialidad}</Card.Subtitle>
                <Card.Text>{vet.descripcion}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h3 className="text-center mb-3">Cirujanos</h3>
      <Row className="justify-content-center">
        {profesionales.cirujanos.map((cirujano, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4 d-flex justify-content-center">
            <Card className="h-100 text-center" style={{ width: '18rem' }}>
              <Card.Img variant="top" src={cirujano.imagen} alt={cirujano.nombre} />
              <Card.Body>
                <Card.Title>{cirujano.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{cirujano.especialidad}</Card.Subtitle>
                <Card.Text>{cirujano.descripcion}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h3 className="text-center mb-3">Pasantes Estudiantiles</h3>
      <Row className="justify-content-center">
        {profesionales.pasantesEstudiantiles.map((pasante, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4 d-flex justify-content-center">
            <Card className="h-100 text-center" style={{ width: '18rem' }}>
              <Card.Img variant="top" src={pasante.imagen} alt={pasante.nombre} />
              <Card.Body>
                <Card.Title>{pasante.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{pasante.especialidad}</Card.Subtitle>
                <Card.Text>{pasante.descripcion}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h3 className="text-center mb-3">Peluqueros Caninos</h3>
      <Row className="justify-content-center">
        {profesionales.peluquerosCaninos.map((peluquero, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4 d-flex justify-content-center">
            <Card className="h-100 text-center" style={{ width: '18rem' }}>
              <Card.Img variant="top" src={peluquero.imagen} alt={peluquero.nombre} />
              <Card.Body>
                <Card.Title>{peluquero.nombre}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{peluquero.especialidad}</Card.Subtitle>
                <Card.Text>{peluquero.descripcion}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Especialistas;
