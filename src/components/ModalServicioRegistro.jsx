// ServicioModal.js
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalServ = ({ show, onHide, nuevoServicio, setNuevoServicio, handleGuardarServicio }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{nuevoServicio._id ? 'Editar Servicio' : 'Agregar Servicio'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="servicioNombre">
            <Form.Label>Nombre del Servicio</Form.Label>
            <Form.Control
              type="text"
              value={nuevoServicio.nombre}
              onChange={(e) => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="servicioDescripcion" className="mt-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={nuevoServicio.descripcion}
              onChange={(e) => setNuevoServicio({ ...nuevoServicio, descripcion: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" onClick={handleGuardarServicio}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalServ;
