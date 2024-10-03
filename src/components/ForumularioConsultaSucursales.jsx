import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'

function ForumularioConsultaSucursales({handleChange,handleSubmit,formData }) {
  return (
    <Container className='contacto-form mb-5'>
    <h2 className="text-center">Formulario de Contacto</h2>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formEmail">
        <Form.Label>Correo Electrónico</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ingrese su correo electrónico"
          required
        />
      </Form.Group>

      <Form.Group controlId="formReason">
        <Form.Label>Asunto</Form.Label>
        <Form.Control
          as="select"
          name="asunto"
          value={formData.asunto}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un asunto</option>
          <option value="consulta">Consulta</option>
          <option value="sugerencia">Sugerencia</option>
          <option value="reclamo">Reclamo</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formMessage">
        <Form.Label>Mensaje</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Ingrese su mensaje"
          required
        />
      </Form.Group>

      <Container className="d-flex justify-content-center mt-3">
        <Button type="submit" className="contacto-form-boton">
          Enviar
        </Button>
      </Container>
    </Form>
  </Container>
  )
}

export default ForumularioConsultaSucursales