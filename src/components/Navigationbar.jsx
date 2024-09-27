import { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import ModalLR from "./ModalLR";

function Navigationbar() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoModal, setTipoModal] = useState("login");

  const handleShowModal = (tipo) => {
    setTipoModal(tipo);
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" className="bg-danger py-3">
        <Container>
          <Navbar.Brand href="/">MiLogo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/servicios">Servicios</Nav.Link>
              <Nav.Link href="/productos">Productos</Nav.Link>
              <Nav.Link href="/contacto">Contacto</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={() => handleShowModal("login")}>Ingresar</Nav.Link>
              <Nav.Link onClick={() => handleShowModal("registro")}>Registro</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal de Autenticación */}
      <ModalLR
        show={mostrarModal}
        handleCerrar={handleCerrarModal}
        type={tipoModal}
      />
    </>
  );
}

export default Navigationbar;
