import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalVacunaRegistro = ({ show, onHide, agregarVacuna }) => {
  const [vacuna, setVacuna] = useState('');

  const handleAgregarVacuna = (e) => {
    e.preventDefault();
    agregarVacuna(vacuna);
    setVacuna('');
    onHide(); 
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Vacuna</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAgregarVacuna}>
          <Form.Group controlId="vacuna">
            <Form.Label>Vacuna-Fecha</Form.Label>
            <Form.Control
              type="text"
              value={vacuna}
              onChange={(e) => setVacuna(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">Agregar</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalVacunaRegistro;
