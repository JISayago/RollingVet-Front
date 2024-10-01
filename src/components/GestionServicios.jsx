import { useState } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';

const GestionServicios = () => {
  const [services, setServices] = useState([
    { id: 1, name: 'Consulta General', description: 'Revisión médica general.' },
    { id: 2, name: 'Vacunación', description: 'Aplicación de vacunas.' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState({ id: null, name: '', description: '' });

  const handleShowModal = (service = { id: null, name: '', description: '' }) => {
    setCurrentService(service);
    setShowModal(true);
  };

  const handleSaveService = () => {
    if (currentService.id) {
      setServices(services.map(service => service.id === currentService.id ? currentService : service));
    } else {
      setServices([...services, { ...currentService, id: services.length + 1 }]);
    }
    setShowModal(false);
  };

  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <Container>
      <h2 className="my-4">Gestión de Servicios</h2>
      <Button variant="primary" onClick={() => handleShowModal()}>Agregar Servicio</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowModal(service)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteService(service.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar/editar servicios */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentService.id ? 'Editar Servicio' : 'Agregar Servicio'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="serviceName">
              <Form.Label>Nombre del Servicio</Form.Label>
              <Form.Control
                type="text"
                value={currentService.name}
                onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="serviceDescription" className="mt-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentService.description}
                onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleSaveService}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GestionServicios;
