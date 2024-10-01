import React, { useState } from 'react';
import { Table, Button, Form, Modal, Container, Row, Col } from 'react-bootstrap';

const GestionSucursal = () => {
  const [branches, setBranches] = useState([
    { id: 1, name: 'Sucursal Centro', address: 'Av. Principal 123', contactNumber: '123456789', email: 'centro@sucursal.com', emergencyService: true },
    { id: 2, name: 'Sucursal Norte', address: 'Calle Secundaria 456', contactNumber: '987654321', email: 'norte@sucursal.com', emergencyService: false },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [currentBranch, setCurrentBranch] = useState({ id: null, name: '', address: '', contactNumber: '', email: '', emergencyService: false });

  const handleShowModal = (branch = { id: null, name: '', address: '', contactNumber: '', email: '', emergencyService: false }) => {
    setCurrentBranch(branch);
    setShowModal(true);
  };

  const handleSaveBranch = () => {
    if (currentBranch.id) {
      setBranches(branches.map(branch => branch.id === currentBranch.id ? currentBranch : branch));
    } else {
      setBranches([...branches, { ...currentBranch, id: branches.length + 1 }]);
    }
    setShowModal(false);
  };

  const handleDeleteBranch = (id) => {
    setBranches(branches.filter(branch => branch.id !== id));
  };

  return (
    <Container fluid className="p-3">
      <h2 className="text-center">Gestión de Sucursales</h2>
      <div className="d-flex justify-content-center mb-3">
        <Button variant="primary" onClick={() => handleShowModal()}>Agregar Sucursal</Button>
      </div>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Número de Contacto</th>
            <th>Correo Electrónico</th>
            <th>Atención Emergencias 24 hs</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={branch.id}>
              <td>{branch.name}</td>
              <td>{branch.address}</td>
              <td>{branch.contactNumber}</td>
              <td>{branch.email}</td>
              <td>{branch.emergencyService ? 'Sí' : 'No'}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowModal(branch)} className="me-2">Editar</Button>
                <Button variant="danger" onClick={() => handleDeleteBranch(branch.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar/editar sucursales */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentBranch.id ? 'Editar Sucursal' : 'Agregar Sucursal'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="branchName" className="mb-3">
              <Form.Label>Nombre de la Sucursal</Form.Label>
              <Form.Control
                type="text"
                value={currentBranch.name}
                onChange={(e) => setCurrentBranch({ ...currentBranch, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="branchAddress" className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                value={currentBranch.address}
                onChange={(e) => setCurrentBranch({ ...currentBranch, address: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="branchContactNumber" className="mb-3">
              <Form.Label>Número de Contacto</Form.Label>
              <Form.Control
                type="text"
                value={currentBranch.contactNumber}
                onChange={(e) => setCurrentBranch({ ...currentBranch, contactNumber: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="branchEmail" className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                value={currentBranch.email}
                onChange={(e) => setCurrentBranch({ ...currentBranch, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="branchEmergencyService" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Atención Emergencias 24 hs"
                checked={currentBranch.emergencyService}
                onChange={(e) => setCurrentBranch({ ...currentBranch, emergencyService: e.target.checked })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleSaveBranch}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GestionSucursal;
