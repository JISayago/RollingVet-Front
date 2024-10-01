import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Logo from './Logo';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import '../css/footer.css'

function FooterBar() {
  return (
    <footer className="text-white py-4 footer">
      <Container fluid>
        <Row className="text-center">
          {/* Primera columna: Contacto y redes sociales */}
          <Col lg={4} md={12} className="d-flex flex-column align-items-center">
            <h6 className="mb-2">Contacto</h6>
            <p className="mb-1">Teléfono: +54 11 1234-5678</p>
            <p className="mb-1">Email: contacto@empresa.com</p>
            <div className="d-flex mt-4">
              <Button as="a" href="https://facebook.com" variant="link" className="text-white me-3 link">
                <FaFacebook size={20} />
              </Button>
              <Button as="a" href="https://twitter.com" variant="link" className="text-white me-3 link">
                <FaTwitter size={20} />
              </Button>
              <Button as="a" href="https://instagram.com" variant="link" className="text-white me-3 link">
                <FaInstagram size={20} />
              </Button>
              <Button as="a" href="https://linkedin.com" variant="link" className="text-white link">
                <FaLinkedin size={20} />
              </Button>
            </div>
          </Col>

          {/* Segunda columna: Logo y derechos reservados */}
          <Col lg={4} md={12} className="d-flex flex-column align-items-center justify-content-between">
            <Logo />
            <p className="mb-0 text-center mt-auto">&copy; {new Date().getFullYear()} Rolling Vet. Todos los derechos reservados.</p>
          </Col>

          {/* Tercera columna: Dirección y Google Maps */}
          <Col lg={4} md={12} className="d-flex flex-column align-items-center">
            <h6 className="mb-2">Ubicación</h6>
            <Card className="w-75 h-75 border border-dark bg-danger">
              <Card.Body className="p-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.1059174753245!2d-65.20974728961748!3d-26.836583276595295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses!2sar!4v1727708259302!5m2!1ses!2sar"
                  width="100%"
                  height="120"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterBar;
