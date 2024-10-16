import clienteAxios from "../helpers/axios.config";
import { configHeaders } from "../helpers/extra.config";

export const logearse = async (formData) => {
    try {
        const { email, contrasenia } = formData;
        
        const formDataLogin = { email, contrasenia }
        const result = await clienteAxios.post(
            "/usuarios/ingresar",
            formDataLogin,
            configHeaders
        );

        if (result && result.status === 200) {
            sessionStorage.setItem("token", JSON.stringify(result.data.token));
            sessionStorage.setItem("rol", JSON.stringify(result.data.rol));
            alert("¡Ingreso exitoso!");
        } else {
            alert("Error inesperado al intentar iniciar sesión.");
        }
    } catch (error) {
        alert("Error inesperado al intentar iniciar sesión.");
    }
};


export const registrarse = async (formData) => {
    try {
        const { nombre, email, contrasenia, rcontrasenia, telefono, direccion } = formData;

        const result = await clienteAxios.post(
            "/usuarios/registrar",
            { nombre, email, contrasenia, telefono, direccion },
            configHeaders
        );

        if (result && result.status === 201) {
            alert("Registro exitoso. Por favor, ingresa con las nuevas credenciales.");
        } else {
            alert("Error inesperado al intentar registrar.");
        }
    } catch (error) {
        alert("Error inesperado al intentar registrar.");
    }
};


export const actualizarPerfil = async (formData) => {
    const token = JSON.parse(sessionStorage.getItem('token')) || "";
    if (token) {
      try {
        const { nombre, email, telefono, direccion } = formData;

          const result = await clienteAxios.put(
          "/usuarios",
          { nombre, email, telefono, direccion },
          { headers: { 'Content-Type': 'application/json', auth: token } }
        );

        if (result && result.status === 200) {
            alert("Perfil actualizado exitosamente.");
        } else {
            alert("Error al actualizar el perfil.");
        }
      } catch (error) {
        alert("Error al actualizar el perfil.");
      }
    }
};
