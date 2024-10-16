import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { actualizarPerfil, logearse, registrarse } from "../../services/LoginRegistroServices";
import { TIPO_EDITAR_PERFIL, TIPO_LOGIN, TIPO_REGISTRO } from "../../helpers/variables";

function ModalLR({ show, handleCerrar, type, usuario }) {
  const [formData, setFormData] = useState({});
  
  useEffect(() => {
    setFormData({
      nombre: usuario?.nombre || "",
      email: usuario?.email || "",
      contrasenia: "",
      rcontrasenia: "",
      direccion: usuario?.direccion || "",
      telefono: usuario?.telefono || "",
    });
  }, [type])
  
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
  };
    
  const handleLogin = async () => {
      const result = await logearse(formData)
      handleCerrar()
    };
    
    
    const handleRegistro = async () => {
      const result = await registrarse(formData)
      handleCerrar()
    }
    const handleActualizarPerfil = async () => {
      
      const result = await actualizarPerfil(formData)
              handleCerrar();
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
        <Modal.Title>{type === TIPO_LOGIN ? "Iniciar Sesión" : "Registro"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
           <Form.Group className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Introduce tu correo"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
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
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  name="direccion"
                  placeholder="Introduce tus direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  name="telefono"
                  placeholder="Introduce tu teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </>
          )}
          {type !== TIPO_EDITAR_PERFIL && (
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="contrasenia"
              placeholder="Introduce tu contraseña"
              value={formData.contrasenia}
              onChange={handleChange}
              disabled={type === TIPO_EDITAR_PERFIL} 
              required
            />
          </Form.Group>
          )}

          {type === TIPO_REGISTRO && (
            <Form.Group className="mb-3">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="rcontrasenia"
                placeholder="Repite tu contraseña"
                value={formData.rcontrasenia}
                onChange={handleChange}
                disabled={type === TIPO_EDITAR_PERFIL} 
                required
              />
            </Form.Group>
          )}
                    <Button variant="primary" type="submit">
                        {type === TIPO_LOGIN ? "Iniciar Sesión" : 
                         type === TIPO_REGISTRO ? "Registrarse" : 
                         "Guardar Cambios"}
                    </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalLR;
