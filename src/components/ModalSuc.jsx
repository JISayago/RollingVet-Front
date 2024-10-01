// SucursalModal.js
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const ModalSuc = ({ showModal, handleClose, sucursal, setSucursal, handleGuardar }) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{sucursal._id ? 'Editar Sucursal' : 'Agregar Sucursal'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nombre" className="mb-3">
            <Form.Label>Nombre de la Sucursal</Form.Label>
            <Form.Control
              type="text"
              value={sucursal.nombre}
              onChange={(e) => setSucursal({ ...sucursal, nombre: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="direccion" className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              value={sucursal.direccion}
              onChange={(e) => setSucursal({ ...sucursal, direccion: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="numeroContacto" className="mb-3">
            <Form.Label>Número de Contacto</Form.Label>
            <Form.Control
              type="text"
              value={sucursal.numeroContacto}
              onChange={(e) => setSucursal({ ...sucursal, numeroContacto: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="correo" className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              value={sucursal.correo}
              onChange={(e) => setSucursal({ ...sucursal, correo: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="atiendeEmergencias24H" className="mb-3">
            <Form.Check
              type="checkbox"
              label="Atención Emergencias 24 hs"
              checked={sucursal.atiendeEmergencias24H}
              onChange={(e) => setSucursal({ ...sucursal, atiendeEmergencias24H: e.target.checked })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleGuardar}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSuc;
