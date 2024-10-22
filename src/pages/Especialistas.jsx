import { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import clienteAxios from '../helpers/axios.config';

function Especialistas() {
  const [veterinarios, setVeterinarios] = useState([]);

  const cargarVeterinarios = async () => {
    try {
      const veterinarios = await clienteAxios.get('/usuarios/veterinarios');
      setVeterinarios(veterinarios.data);
    } catch (error) {
      alert("Ocurrió un error al cargar los Veterinarios.");
    }
  };

  useEffect(() => {
    cargarVeterinarios();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Nuestro Equipo de Profesionales</h2>
      <Row className="justify-content-center">
        {veterinarios.map((vet, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4 d-flex justify-content-center">
            <Card className="h-100 text-center" style={{ width: '18rem' }}>
              <Card.Img 
                variant="top" 
                src={vet.imagen} 
                alt={vet.nombre} 
                style={{ height: '250px', objectFit: 'contain' }} 
              />
              <Card.Body>
                <Card.Title>Dr. {vet.nombre}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Especialistas;
