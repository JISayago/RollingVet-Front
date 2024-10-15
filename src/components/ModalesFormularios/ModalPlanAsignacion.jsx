import { Modal, Button, ListGroup } from 'react-bootstrap';

const ModalPlanAsignacion = ({ show, onHide, planes, handleAsignarPlan }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Seleccionar Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {planes.map((plan, index) => (
            <ListGroup.Item key={index} action onClick={() => handleAsignarPlan(plan)}>
              {plan}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPlanAsignacion;
