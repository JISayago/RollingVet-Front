import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const FormularioContactoPorPlan = ({ handleSubmit, handleChange, formData, errores }) => {
  return (
    <Container className="mt-4 contacto-form mb-5">
    <h3 className="text-center">Contacto para <label style={{color:'#f45e00'}}>{formData.plan}</label></h3>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formNombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          isInvalid={!!errores.nombre} 
        />
        <Form.Control.Feedback type="invalid">
          {errores.nombre}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!errores.email} 
        />
        <Form.Control.Feedback type="invalid">
          {errores.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formNumero">
        <Form.Label>Número de Teléfono</Form.Label>
        <Form.Control
          type="text"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          isInvalid={!!errores.numero} 
        />
        <Form.Control.Feedback type="invalid">
          {errores.numero}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formMensaje">
        <Form.Label>Mensaje</Form.Label>
        <Form.Control
          as="textarea"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          isInvalid={!!errores.mensaje} 
        />
        <Form.Control.Feedback type="invalid">
          {errores.mensaje}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="text-center">
        <Button variant="primary" className='contacto-form-boton' style={{marginTop:'20px'} }type="submit">
          Enviar
        </Button>
      </div>
      </Form>
      </Container>
  );
};

export default FormularioContactoPorPlan;
