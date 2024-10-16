import clienteAxios from "../helpers/axios.config";
import { configHeaders } from "../helpers/extra.config";

export const logearse = async (formData) => {
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


        if (result && result.status === 200) {
          sessionStorage.setItem("token", JSON.stringify(result.data.token));
          sessionStorage.setItem("rol", JSON.stringify(result.data.rol));
          alert("¡Ingreso Exitoso!")
        } else {
            alert("Error inesperado al intentar iniciar sesión.");
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                alert("Usuario bloqueado. Comunicarse con un administrador");
            } else {
                alert("Error: " + (error.response.data.message || "Ha ocurrido un error."));
            }
        } else if (error.request) {
            alert("No se pudo conectar al servidor. Por favor, inténtalo más tarde.");
        } else {
            alert("Hubo un error al configurar la solicitud.");
        }
    }
    
};

export const registrarse = async (formData) => {
    try {
        const { nombre, email, contrasenia, rcontrasenia, telefono, direccion } = formData;

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

export const actualizarPerfil = async (formData) => {
    const token = JSON.parse(sessionStorage.getItem('token')) || "";
    if (token) {
      try {
        const { nombre, email, telefono, direccion} = formData;
        
        if (!nombre || !email) {
          return alert("El nombre y correo electrónico son obligatorios.");
        }
        
        const formDataToSend = new FormData();
        formDataToSend.append("nombre", nombre);
        formDataToSend.append("email", email);
        formDataToSend.append("telefono", telefono);
        formDataToSend.append("direccion", direccion);
        
        const result = await clienteAxios.put(
          "/usuarios",
          formDataToSend,
          { headers: {
            'Content-Type': 'application/json',
            auth: token,
          },
          }
        );


        if (result && result.status === 200) {
            alert("Perfil actualizado exitosamente.");
          } else {
            alert("Error al actualizar el perfil.");
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
};