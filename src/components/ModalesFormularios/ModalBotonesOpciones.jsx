import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalBotonesOpciones = ({ show, onHide, botones }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Opciones</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {botones.map((boton, index) => (
          <Button
            key={index}
            variant="primary"
            className="mb-2 w-100"
            onClick={() => {
              boton.accion();
              onHide(); // Cierra el modal después de ejecutar la acción
            }}
          >
            {boton.texto}
          </Button>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalBotonesOpciones;
