import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import clienteAxios from '../../helpers/axios.config';

const ModalConsulta = ({ show, onHide, nuevoProcedimiento, setNuevoProcedimiento, handleAgregarProcedimiento }) => {
  const [veterinarios, setVeterinarios] = useState([]);

  const cargarVeterinarios = async () => {
    try {
      const veterinarios = await clienteAxios.get('/usuarios/veterinarios');
      setVeterinarios(veterinarios.data);
    } catch (error) {
      alert("Ocurrió un error al cargar los Veterinarios.");
    }
  };
  useEffect(() => {
        cargarVeterinarios();
  }, []);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Procedimiento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAgregarProcedimiento}>
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
              as="select"
              value={nuevoProcedimiento.vistoPor}
              onChange={(e) => setNuevoProcedimiento({ ...nuevoProcedimiento, vistoPor: e.target.value })}
              required
            >
              <option value="">Seleccionar Veterinario</option>
              {veterinarios.map((veterinario) => (
                <option key={veterinario.id} value={veterinario.nombre}>
                  {veterinario.nombre}
                </option>
              ))}
            </Form.Control>
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
