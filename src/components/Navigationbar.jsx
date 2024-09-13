import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigationbar() {
  return (
    <Navbar expand="lg" className="bg-danger py-3">
      <Container fluid>
        {/* Logo a la izquierda */}
        <Navbar.Brand href="#home" className="text-white">MiLogo</Navbar.Brand>

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
            <Nav.Link href="#link1" className="text-white">Productos</Nav.Link>
            <Nav.Link href="#link2" className="text-white">Mis Turnos</Nav.Link>
            <Nav.Link href="#link4" className="text-white">Contacto</Nav.Link>
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
  );
}

export default Navigationbar;
