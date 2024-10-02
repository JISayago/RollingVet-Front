import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import clienteAxios from '../helpers/axios.config';

const ModalMascotaRegistro = ({ show, handleClose, onMascotaRegistrada }) => {
  const [petData, setPetData] = useState({
    nombre: '',
    fechaNacimiento: '',
    tipoDeMascota: '',
    raza: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const registrarMascota = async () => {
    try {
      const { nombre, fechaNacimiento, tipoDeMascota, raza } = petData;

      if (!nombre || !fechaNacimiento || !tipoDeMascota || !raza) {
        return alert("Algun campo esta vacio");
      }
        const tok = JSON.parse(sessionStorage.getItem("token"));
      const result = await clienteAxios.post(
        "/usuarios/mascotas/registrar",
        {
          nombre,
          fechaNacimiento,
          tipoDeMascota,
          raza
        },
        {headers: {
            "Content-Type": "application/json",
            "auth": tok
          }}
      );

      if (result && result.status === 201) {
        alert("Mascota registrada con éxito.");
        onMascotaRegistrada(); // Llama a la función para actualizar las mascotas
        handleClose(); // Cierra el modal
      } else {
        alert("Error inesperado al intentar registrar.");
      }
    } catch (error) {
      if (error.response) {
        alert("Error: " + (error.response.data.message || "Ha ocurrido un error."));
      } else if (error.request) {
        alert("No se pudo conectar al servidor. Por favor, inténtalo más tarde.");
      } else {
        alert("Hubo un error al configurar la solicitud.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registrarMascota();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Nueva Mascota</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la mascota"
              name="nombre"
              value={petData.nombre}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formFechaNacimiento">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="fechaNacimiento"
              value={petData.fechaNacimiento}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formTipo">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el tipo de mascota (Perro, Gato, etc.)"
              name="tipoDeMascota"
              value={petData.tipoDeMascota}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formRaza">
            <Form.Label>Raza</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la raza de la mascota"
              name="raza"
              value={petData.raza}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Registrar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalMascotaRegistro;
