import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import clienteAxios from "../helpers/axios.config";
import { configHeaders } from "../helpers/extra.config";

function ModalLR({ show, handleCerrar, type }) {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        contrasenia: "",
        rcontrasenia: "",
        direccion: "",
        telefono: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleLogin = async () => {
        try {
            const { email, contrasenia } = formData;
    
            if (!email || !contrasenia) {
                return alert("Algun campo esta vacio");
            }
    
            const result = await clienteAxios.post(
                "/usuarios/ingresar",
                {
                    email,
                    contrasenia,
                },
                configHeaders
            );
    
            // Verifica si result y result.status existen
            if (result && result.status === 200) {
              sessionStorage.setItem("token", JSON.stringify(result.data.token));
              sessionStorage.setItem("rol", JSON.stringify(result.data.rol));
              alert("¡Ingreso Exitoso!")
              handleCerrar()
            } else {
                alert("Error inesperado al intentar iniciar sesión.");
            }
        } catch (error) {
            console.error("Error al intentar iniciar sesión:", error);
        
            if (error.response) {
                // Si hay una respuesta de error desde el servidor
                if (error.response.status === 400) {
                    alert("Usuario bloqueado. Comunicarse con un administrador");
                } else {
                    alert("Error: " + (error.response.data.message || "Ha ocurrido un error."));
                }
            } else if (error.request) {
                // Si la solicitud fue hecha pero no hubo respuesta
                console.error("Error sin respuesta del servidor:", error.request);
                alert("No se pudo conectar al servidor. Por favor, inténtalo más tarde.");
            } else {
                // Error al configurar la solicitud
                console.error("Error al configurar la solicitud:", error.message);
                alert("Hubo un error al configurar la solicitud.");
            }
        }
        
    };
    
    
    const handleRegistro = async () => {
        try {
            const {nombre, email, contrasenia, rcontrasenia, telefono, direccion } = formData;
    
            if (!nombre || !email || !contrasenia || !rcontrasenia) {
                return alert("Algun campo esta vacio");
            }
    
            if (contrasenia === rcontrasenia) {
                const result = await clienteAxios.post(
                    "/usuarios/registrar",
                    {
                        nombre,
                        email,
                        contrasenia,
                        telefono,
                        direccion
                    },
                    configHeaders
                );
    
                if (result && result.status === 201) {
                  alert("Registro exitoso. Por favor ingresar con las nuevas credenciales.");
                  handleCerrar()
                } else {
                    alert("Error inesperado al intentar registrar.");
                }
            } else {
                alert("Las contraseñas no son iguales");
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
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (type === "login") {
            //Poner todas las validaciones aca que correspondan- de momento solo voy acontrolar que no queden vacios
            handleLogin();
        } else if (type === "registro") {
            // 
            handleRegistro();
        }
    };

  return (
    <Modal show={show} onHide={handleCerrar}>
      <Modal.Header closeButton>
        <Modal.Title>{type === "login" ? "Iniciar Sesión" : "Registro"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
           {/* Campo Correo Electrónico */}
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

          {/* Solo se muestra en el registro */}
          {type === "registro" && (
            <>
              {/* Campo Nombres */}
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

              {/* Campo Teléfono */}
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

          {/* Campo Contraseña */}
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="contrasenia"
              placeholder="Introduce tu contraseña"
              value={formData.contrasenia}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Solo se muestra en el registro */}
          {type === "registro" && (
            <Form.Group className="mb-3">
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="rcontrasenia"
                placeholder="Repite tu contraseña"
                value={formData.rcontrasenia}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}

          <Button variant="primary" type="submit">
            {type === "login" ? "Iniciar Sesión" : "Registrarse"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalLR;
