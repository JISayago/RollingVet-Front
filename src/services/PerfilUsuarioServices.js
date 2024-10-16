import clienteAxios from "../helpers/axios.config";

export const cargarUsuario = async () => {
    const token = JSON.parse(sessionStorage.getItem('token'))||"";
    if (token) {
      try {
        const result = await clienteAxios.get('/usuarios/perfilUsuario', {
          headers: {
            'Content-Type': 'application/json',
            auth: token,
          },
        });
          return result;
      } catch (error) {
        alert('Error al cargar usuario');
      }
    } else {
      alert('No se encontró un token.');
    }
};
  
export const eliminarPerfil = async () => {
    const token = JSON.parse(sessionStorage.getItem('token')) || "";
    if (!token) {
      alert("Por favor logearse para realizar esta acción")
    }
    if (confirm("Está por ELIMINAR el perfil con todos sus datos y los datos de sus mascotas. ¿Está seguro?")) {
        try {
            const result = await clienteAxios.delete(
              "/usuarios/eliminarPerfil",
              {
                headers: {
                  "Content-Type": "application/json",
                  "auth": token
                }
              },
            );
           
            alert("Usuario eliminado correctamente");
            sessionStorage.removeItem('token');
              sessionStorage.removeItem('rol');
              return result;
        }
        catch (error) {
          alert("Ocurrió un error al eliminar el perfil.")
        }
    }
   
  }