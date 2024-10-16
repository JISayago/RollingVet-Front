export const calcularEdad = (fechaNacimiento) => {
    const fechaNac = new Date(fechaNacimiento);
    const fechaActual = new Date();
    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();
    const mesActual = fechaActual.getMonth();
    const mesNacimiento = fechaNac.getMonth();
    let msge = "";
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && fechaActual.getDate() < fechaNac.getDate())) {
      edad--;
    }

    let meses = mesActual - mesNacimiento;
    if (meses < 0) {
      meses += 12;
    }
    if (edad <= 0) {
        meses === 1 ? msge = `${meses} mes` : msge = `${meses} meses`;
    }
    else {
        msge = `${edad} años y ${meses} meses`;
    }
    return msge ;
}
export const convertAFormatoFecha = (dia) => {
    let diaConvertido = new Date(dia);
    
    let d = diaConvertido.getUTCDate();
    let m = diaConvertido.getUTCMonth() + 1;
    let a = diaConvertido.getUTCFullYear();
    
    let fechaFinal = `${d.toString().padStart(2, '0')}/${m.toString().padStart(2, '0')}/${a}`;
    return fechaFinal;
}

export function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export const validarCamposVacios = (campos, setFormErrors) => {
  const errors = {};
  for (const [campo, valor] of Object.entries(campos)) {
    if (!valor) {
      errors[campo] = `El campo ${campo} es obligatorio.`;
    }
  }
  setFormErrors(errors);
  return Object.keys(errors).length === 0; // Si no hay errores, devolver true
};

export const validarEmail = (email, setFormErrors) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setFormErrors(prev => ({ ...prev, email: "El correo electrónico no es válido." }));
    return false;
  }
  return true;
};

export const validarContrasenia = (contrasenia, rcontrasenia = null, setFormErrors) => {
  const errors = {};
  if (contrasenia.length < 5 || contrasenia.length > 16) {
    errors.contrasenia = "La contraseña debe tener entre 5 y 16 caracteres.";
  }
  if (rcontrasenia && contrasenia !== rcontrasenia) {
    errors.rcontrasenia = "Las contraseñas no coinciden.";
  }
  setFormErrors(prev => ({ ...prev, ...errors }));
  return Object.keys(errors).length === 0; // Retorna true si no hay errores
};
