import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function FooterBar() {
  return (
    <footer className="bg-dark text-white py-4">
      <Container fluid>
        <Row className="text-center">
          {/* Primera columna: Contacto y redes sociales */}
          <Col lg={4} md={12} className="d-flex flex-column align-items-center">
            <h6 className="mb-2">Contacto</h6>
            <p className="mb-1">Teléfono: +54 11 1234-5678</p>
            <p className="mb-1">Email: contacto@empresa.com</p>
            <div className="d-flex mt-4">
              <a href="https://facebook.com" className="text-white me-3">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-white me-3">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-white me-3">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" className="text-white">
                <FaLinkedin size={20} />
              </a>
            </div>
          </Col>

          {/* Segunda columna: Logo y derechos reservados */}
          <Col lg={4} md={12} className="d-flex flex-column align-items-center justify-content-between">
            <Image src="/path-to-logo.png" alt="Logo" width={60} className="mb-2" />
            <p className="mb-0 text-center mt-auto">&copy; {new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.</p>
          </Col>

          {/* Tercera columna: Dirección y Google Maps */}
          <Col lg={4} md={12} className="d-flex flex-column align-items-center">
            <h6 className="mb-2">Ubicación</h6>
            <p className="mb-1 text-center">1234 Calle Falsa, Ciudad, País</p>
            <div className="map-container bg-light" style={{ width: '70%', height: '80px' }}>
              {/* Aquí iría la API de Google Maps */}
              <p className="text-center">Google Maps aquí</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterBar;
