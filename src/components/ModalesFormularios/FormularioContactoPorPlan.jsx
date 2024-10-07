import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'

function FormularioContactoPorPlan({handleSubmit,handleChange,formData }) {
  return (
    <Container className="mt-4 contacto-form mb-5">
    <h3 className="text-center">Contacto para {formData.plan}</h3>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ingresa tu nombre"
          required
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Correo Electrónico</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ingresa tu correo electrónico"
          required
        />
      </Form.Group>
      <Form.Group controlId="formReferenceNumber">
        <Form.Label>Número de Referencia</Form.Label>
        <Form.Control
          type="text"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          placeholder="Ingresa tu número de Teléfono"
          required
        />
      </Form.Group>
      <Form.Group controlId="formMessage">
        <Form.Label>Mensaje</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Escribe tu mensaje aquí"
          required
        />
      </Form.Group>
      <div className="text-center">
        <Button variant="primary" className='contacto-form-boton' style={{marginTop:'20px'} }type="submit">
          Enviar
        </Button>
      </div>
    </Form>
  </Container>
  )
}

export default FormularioContactoPorPlan