import { Modal, Button, Form } from 'react-bootstrap';

const ModalConsulta = ({ show, onHide, nuevoProcedimiento, setNuevoProcedimiento, agregarProcedimiento }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Procedimiento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={agregarProcedimiento}>
          <Form.Group controlId="fecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              value={nuevoProcedimiento.fecha}
              onChange={(e) => setNuevoProcedimiento({ ...nuevoProcedimiento, fecha: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="motivo">
            <Form.Label>Motivo</Form.Label>
            <Form.Control
              type="text"
              value={nuevoProcedimiento.motivo}
              onChange={(e) => setNuevoProcedimiento({ ...nuevoProcedimiento, motivo: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="vistoPor">
            <Form.Label>Visto por</Form.Label>
            <Form.Control
              type="text"
              value={nuevoProcedimiento.vistoPor}
              onChange={(e) => setNuevoProcedimiento({ ...nuevoProcedimiento, vistoPor: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="tratamiento">
            <Form.Label>Tratamiento</Form.Label>
            <Form.Control
              type="text"
              value={nuevoProcedimiento.tratamiento}
              onChange={(e) => setNuevoProcedimiento({ ...nuevoProcedimiento, tratamiento: e.target.value })}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">Agregar</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalConsulta;
