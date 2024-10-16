import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getCurrentDate } from '../../helpers/funcionesUtiles';

const ModalAgregarVacuna = ({ show, handleClose, handleAgregarVacuna }) => {
  const [nuevaVacuna, setNuevaVacuna] = useState('');
  const [fechaVacuna, setFechaVacuna] = useState(getCurrentDate());

  const handleGuardar = () => {
    const vacunaData = {
      nombre: nuevaVacuna,
      fecha: fechaVacuna,
    };
    handleAgregarVacuna(vacunaData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Vacuna</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formVacuna">
            <Form.Label>Vacuna</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la vacuna"
              value={nuevaVacuna}
              onChange={(e) => setNuevaVacuna(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFecha">
            <Form.Label>Fecha de Vacunación</Form.Label>
            <Form.Control
              type="date"
              value={fechaVacuna}
              onChange={(e) => setFechaVacuna(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleGuardar}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAgregarVacuna;
