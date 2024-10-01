import React, { useState } from 'react';
import { Container, Nav, Tab } from 'react-bootstrap';
import GestionUsuarios from '../components/GestionUsuarios';
import GestionTurnos from '../components/GestionTurnos';
import GestionSucursal from '../components/GestionSucursal';
import GestionServicios from '../components/GestionServicios';

const AdministracionPanel = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <Container>
      <h1>Panel de Administración</h1>
      <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
        <Nav variant="tabs" className="justify-content-center mb-3">
          <Nav.Item>
            <Nav.Link eventKey="users">Usuarios</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="branches">Sucursales</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="services">Servicios</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="appointments">Turnos</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="users">
            <GestionUsuarios />
          </Tab.Pane>
          <Tab.Pane eventKey="branches">
            <GestionSucursal />
          </Tab.Pane>
          <Tab.Pane eventKey="services">
            <GestionServicios />
          </Tab.Pane>
          <Tab.Pane eventKey="appointments">
            <GestionTurnos />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default AdministracionPanel;
