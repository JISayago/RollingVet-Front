import clienteAxios from "../helpers/axios.config";
import { configHeaders } from "../helpers/extra.config";
import { ROL_ADMIN } from "../helpers/variables";



export const asignarPlan = async (plan,idMascota) => {
    const rol = JSON.parse(sessionStorage.getItem('rol')) || "";
    if (rol !== ROL_ADMIN) {
        alert("No cuenta con permisos suficientes.")
    }
    if (confirm(`Usted está por asignar el plan: ${plan}. ¿Está seguro?`)) {
        try { 
            const result = await clienteAxios.post(
          `/mascotas/asignarPlan/${idMascota}`,
                {plan:plan},
                configHeaders
            );
            if (result.status === 200) {
                alert("Plan asignado correctamente.")
            }
        }
        catch (error) { }
    }
};

export const agregarProcedimiento = async (idMascota,nuevoProcedimiento) => {
    try {
        const result = await clienteAxios.post(
        `/fichas/${idMascota}`,
            nuevoProcedimiento,
            configHeaders
        );
        alert("Visita agregada con éxito!");
        return result;
    }
    catch (error) {
        alert("Error al guardar la visita. Inténtelo de nuevo.");
    }
};

export const actualizacionImagen = async (imagen,idMascota) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imagen); 
        
        const result = await clienteAxios.post(
              `mascotas/agregarImagen/${idMascota}`,
            formData,
            configHeaders);
      alert("Imagen actualizada con éxito!");
      return result;
        } catch (error) {
            alert("Error al actualizar la imagen. Inténtelo de nuevo.");
        }
    };
export const eliminarMascota = async (mascotaId) => {
    try {
        const result = await clienteAxios.delete(
        `/mascotas/${mascotaId}`,
            configHeaders
        );
        alert("Masctoa eliminada correctamente");
        
    }
    catch (error) {
        alert("Ocurrió un error al eliminar el perfil.")
    }
}

export const eliminarFicha = async (id,idMascota) => {
    const rol = JSON.parse(sessionStorage.getItem("rol")) || "";
    if (rol === ROL_ADMIN) {
      try {
        
        const result = await clienteAxios.delete(
        `/fichas/eliminarFicha/${id}/${idMascota}`,
          configHeaders
        );
        alert("Ficha eliminada correctamente");
      }
      catch (error) {
        alert("Ocurrió un error al eliminar la Ficha.")
      }
    }
}
export  const marcarCastrado = async (idMascota) => {
    const rol = JSON.parse(sessionStorage.getItem("rol")) || "";
    if (rol === ROL_ADMIN) {
      try {
        const result = await clienteAxios.post(
        `/mascotas/castrar/${idMascota}`,
          {},
          configHeaders
        );
        alert("Mascota actualizada correctamente");
          return result;
      }
      catch (error) {
        alert("Ocurrió un error al actualizar la mascota.")
      }
    }
}
export const agregarVacuna = async (nuevaVacuna,idMascota) => {
    const rol = JSON.parse(sessionStorage.getItem("rol")) || "";
    if (rol === ROL_ADMIN) {
      try {
        const result = await clienteAxios.post(
        `/mascotas/agregarVacuna/${idMascota}`,
          nuevaVacuna,
          configHeaders
        );
        alert("Mascota actualizada correctamente");
          return result;
      }
      catch (error) {
        alert("Ocurrió un error al actualizar la mascota.")
      }
    }
    
};
  
export const agregarVisitaPendiente = async (nuevaVisita, idMascota) => {
    const rol = JSON.parse(sessionStorage.getItem("rol")) || "";
    if (rol === ROL_ADMIN) {
      try {
        const result = await clienteAxios.post(
        `/mascotas/agregarProximaVisita/${idMascota}`,
          nuevaVisita,
          configHeaders
        );
        alert("Mascota actualizada correctamente");
          return result;
      }
      catch (error) {
        alert("Ocurrió un error al actualizar la mascota.")
      }
    }
    
  };