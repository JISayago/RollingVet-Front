import  { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import clienteAxios from '../helpers/axios.config';
import "../css/contacto_sucursales.css";
import { useNavigate } from 'react-router-dom';

const ServiciosCards = () => {
  const [servicios, setServicios] = useState([]);
  const navigate = useNavigate();
  const obtenerServicios = async () => {
    const servciosBD = await clienteAxios.get('/servicios')
    setServicios(servciosBD.data);
  }
  const handleRedirect = () => {
  navigate('/turnos')
  }
  useEffect(() => {
    obtenerServicios();
  },[])
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Nuestros Servicios</h2>
      <Row className="gy-4">
        {servicios.map((servicio) => (
          <Col xs={12} md={6} lg={4} key={servicio.id}>
            <Card className="h-100 text-center">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>{servicio.nombre}</Card.Title>
                <Card.Text>{servicio.descripcion}</Card.Text>
                <Button variant="primary" className='contacto-form-boton' onClick={handleRedirect}>Sacar turno</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ServiciosCards;
