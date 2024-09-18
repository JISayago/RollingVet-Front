import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Clima from './Clima';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

function Navigationbar() {
  return (
    <>
      {/* Contenedor superior */}
      <Container fluid className="bg-primary text-white py-2">
        <Row className="align-items-center justify-content-between">
          {/* Cada columna con el mismo tamaño */}
          <Col xs={12} md={3} className="text-center">
            Atendemos Emergencias 24hs
          </Col>
          <Col xs={12} md={3} className="text-center">
            Dirección: Calle Falsa 123
          </Col>
          <Col xs={12} md={3} className="text-center">
            Teléfono: +54 11 1234-5678
          </Col>
          <Col xs={12} md={3} className="text-center">
            <Clima />
          </Col>
        </Row>
      </Container>

      {/* Navbar principal */}
      <Navbar expand="lg" className="bg-danger py-3">
        <Container fluid>
          {/* Logo a la izquierda */}
          <Navbar.Brand href={'/'} className="text-white">MiLogo</Navbar.Brand>

          {/* Toggle para dispositivos móviles */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Centrar los enlaces usando mx-auto */}
            <Nav className="mx-auto">
              {/* Primer link con dropdown (menú desplegable) */}
              <NavDropdown title="Servicios" id="basic-nav-dropdown" className="text-white">
                <NavDropdown.Item href="#action/1">Consulta Veterinaria</NavDropdown.Item>
                <NavDropdown.Item href="#action/2">Cirujías</NavDropdown.Item>
                <NavDropdown.Item href="#action/3">Peluquería</NavDropdown.Item>
                <NavDropdown.Item href="#action/4">Visitas a Domicilio</NavDropdown.Item>
              </NavDropdown>

              {/* Otros 3 links (Productos, Turnos, Contacto) */}
              <Nav.Link href={'/productos' } className="text-white">Productos</Nav.Link>
              <Nav.Link href={'/perfil_usuario' } className="text-white">Mi Perfil</Nav.Link>
              <Nav.Link href={'/contacto'} className="text-white">Contacto</Nav.Link>
            </Nav>

            {/* Link de Carrito en el medio */}
            <Nav className="mx-5 bg-black">
              <Nav.Link href="#carrito" className="text-white">Carrito</Nav.Link>
            </Nav>

            {/* Links de Login y Registro */}
            <Nav>
              <Nav.Link href="#login" className="text-white">Ingresar</Nav.Link>
              <Nav.Link href="#register" className="text-white">Registro</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigationbar;
