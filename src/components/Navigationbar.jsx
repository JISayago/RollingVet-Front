import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Clima from './Clima';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Navigationbar() {
  // Estados para controlar los modales
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  

  return (
    <>
      {/* Contenedor superior */}
      <Container fluid className="bg-primary text-white py-2">
        <Row className="align-items-center justify-content-between">
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
          <Navbar.Brand href={'/'} className="text-white">MiLogo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {/* Ahora "Servicios" es un link directo */}
              <Nav.Link href={'/servicios'} className="text-white">Servicios</Nav.Link>
              <Nav.Link href={'/productos'} className="text-white">Productos</Nav.Link>
              <Nav.Link href={'/perfil_usuario'} className="text-white">Mi Perfil</Nav.Link>
              <Nav.Link href={'/contacto'} className="text-white">Contacto</Nav.Link>
            </Nav>
            <Nav className="mx-5 bg-black">
              <Nav.Link href="#carrito" className="text-white">Carrito</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={handleShowLogin} className="text-white">Ingresar</Nav.Link>
              <Nav.Link onClick={handleShowRegister} className="text-white">Registro</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal de Login */}
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" placeholder="Introduce tu correo" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Iniciar sesión
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal de Registro */}
      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Introduce tu nombre" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" placeholder="Introduce tu correo" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Registrarse
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Navigationbar;
