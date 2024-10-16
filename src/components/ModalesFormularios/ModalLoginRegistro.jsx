import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { actualizarPerfil, logearse, registrarse } from "../../services/LoginRegistroServices";
import { TIPO_EDITAR_PERFIL, TIPO_LOGIN, TIPO_REGISTRO } from "../../helpers/variables";
import { validarCamposVacios, validarContrasenia, validarEmail } from "../../helpers/funcionesUtiles";

function ModalLR({ show, handleCerrar, type, usuario }) {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({}); // Estado para manejar los errores

  useEffect(() => {
    setFormData({
      nombre: usuario?.nombre || "",
      email: usuario?.email || "",
      contrasenia: "",
      rcontrasenia: "",
      direccion: usuario?.direccion || "",
      telefono: usuario?.telefono || "",
    });
    setFormErrors({}); // Reiniciar errores cuando se cambie el tipo
  }, [type, usuario]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    const valid = validarCamposVacios({ email: formData.email, contrasenia: formData.contrasenia }, setFormErrors) 
                 && validarEmail(formData.email, setFormErrors) 
                 && validarContrasenia(formData.contrasenia, null, setFormErrors);

    if (valid) {
      const result = await logearse(formData);
      if (result.status === 200) {
        handleCerrar();
      }
    }
  };

  const handleRegistro = async () => {
    const valid = validarCamposVacios(formData, setFormErrors) 
                 && validarEmail(formData.email, setFormErrors) 
                 && validarContrasenia(formData.contrasenia, formData.rcontrasenia, setFormErrors);

    if (valid) {
      const result = await registrarse(formData);
      handleCerrar();
    }
  };

  const handleActualizarPerfil = async () => {
    const valid = validarCamposVacios(formData, setFormErrors) 
                 && validarEmail(formData.email, setFormErrors);

    if (valid) {
      const result = await actualizarPerfil(formData);
      handleCerrar();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === TIPO_LOGIN) {
      handleLogin();
    } else if (type === TIPO_REGISTRO) {
      handleRegistro();
    } else if (type === TIPO_EDITAR_PERFIL) {
      handleActualizarPerfil();
    }
  };

  return (
    <Modal show={show} onHide={handleCerrar}>
      <Modal.Header closeButton>
        <Modal.Title>{type === TIPO_LOGIN ? "Iniciar Sesión" : type === TIPO_REGISTRO ? "Registro" : "Editar Perfil"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate> {/* Deshabilitar la validación HTML */}
          <Form.Group className="mb-3">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Introduce tu correo"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!formErrors.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {type !== TIPO_LOGIN && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Introduce tu nombre y apellido"
                  value={formData.nombre}
                  onChange={handleChange}
                  isInvalid={!!formErrors.nombre}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.nombre}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  name="direccion"
                  placeholder="Introduce tu dirección"
                  value={formData.direccion}
                  onChange={handleChange}
                  isInvalid={!!formErrors.direccion}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.direccion}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  name="telefono"
                  placeholder="Introduce tu teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  isInvalid={!!formErrors.telefono}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.telefono}
                </Form.Control.Feedback>
              </Form.Group>
            </>
          )}

          {type !== TIPO_EDITAR_PERFIL && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="contrasenia"
                  placeholder="Introduce tu contraseña"
                  value={formData.contrasenia}
                  onChange={handleChange}
                  isInvalid={!!formErrors.contrasenia}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.contrasenia}
                </Form.Control.Feedback>
              </Form.Group>

              {type === TIPO_REGISTRO && (
                <Form.Group className="mb-3">
                  <Form.Label>Repetir Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="rcontrasenia"
                    placeholder="Repite tu contraseña"
                    value={formData.rcontrasenia}
                    onChange={handleChange}
                    isInvalid={!!formErrors.rcontrasenia}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.rcontrasenia}
                  </Form.Control.Feedback>
                </Form.Group>
              )}
            </>
          )}

          <Button variant="primary" type="submit">
            {type === TIPO_LOGIN ? "Iniciar Sesión" : type === TIPO_REGISTRO ? "Registrarse" : "Guardar Cambios"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalLR;
