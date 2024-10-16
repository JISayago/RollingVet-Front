import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import clienteAxios from '../../helpers/axios.config';

const ModalActualizarImagenUsuario = ({ show, handleCerrar, usuario, onImagenCargada }) => {
  const [imagen, setImagen] = useState(null);

  const handleFileChange = (event) => {
    setImagen(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imagen) {
      alert('Por favor, selecciona una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('imagen', imagen);

    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      const response = await clienteAxios.post('/usuarios/actualizarImagenPerfil', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          auth: token,
        },
      });

      if (response.status === 200) {
        alert('Imagen cargada con éxito.');
        onImagenCargada();
        handleCerrar();
      } else{
        alert('Error al cargar la imagen.');
      }
    } catch (error) {
      alert('Error al cargar la imagen.');
    }
  };

  return (
    <Modal show={show} onHide={handleCerrar}>
      <Modal.Header closeButton>
        <Modal.Title>Cargar Nueva Imagen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile">
            <Form.Label>Selecciona una imagen</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Cargar Imagen
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalActualizarImagenUsuario;
