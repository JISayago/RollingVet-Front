import { Container, } from 'react-bootstrap';
import ImagenError from '../assets/Logo/Error404Imagen.png'

const Error404 = () => {
  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '50vh', textAlign: 'center' }}>
      <h1 className="mb-4" style={{color:'#f45e00'}}>¡Lo sentimos, página no encontrada!</h1>
      <img src={ImagenError} alt="Página no encontrada" className="error-image" />
    </Container>
  );
};

export default Error404;
