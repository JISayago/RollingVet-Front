import  { useState } from 'react';
import { Container, Nav, Tab } from 'react-bootstrap';
import GestionUsuarios from '../components/GestionUsuarios';
import GestionTurnos from '../components/GestionTurnos';
import GestionSucursal from '../components/GestionSucursal';
import GestionServicios from '../components/GestionServicios';

const AdministracionPanel = () => {
  const [activeTab, setActiveTab] = useState('usuarios');

  return (
    <Container>
      <h1>Panel de Administración</h1>
      <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
        <Nav variant="tabs" className="justify-content-center mb-3">
          <Nav.Item>
            <Nav.Link eventKey="usuarios">Usuarios</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="sucursales">Sucursales</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="servicios">Servicios</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="turnos">Turnos</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="usuarios">
            <GestionUsuarios />
          </Tab.Pane>
          <Tab.Pane eventKey="sucursales">
            <GestionSucursal />
          </Tab.Pane>
          <Tab.Pane eventKey="servicios">
            <GestionServicios />
          </Tab.Pane>
          <Tab.Pane eventKey="turnos">
            <GestionTurnos />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default AdministracionPanel;
