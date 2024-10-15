import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalVisitaPendiente = ({ show, handleClose, agregarVisitaPendiente }) => {
  const [nuevaVisita, setNuevaVisita] = useState({
    detalle: '',
    fecha: '',
  });

  const handleGuardar = () => {
    agregarVisitaPendiente(nuevaVisita);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Visita Pendiente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formDetalleVisita">
            <Form.Label>detalle de Visita</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el detalle de visita"
              value={nuevaVisita.detalle}
              onChange={(e) => setNuevaVisita({ ...nuevaVisita, detalle: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formFechaVisita">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              value={nuevaVisita.fecha}
              onChange={(e) => setNuevaVisita({ ...nuevaVisita, fecha: e.target.value })}
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

export default ModalVisitaPendiente;
