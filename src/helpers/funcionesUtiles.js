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

export const validarNombre = (nombre, setFormErrors) => {
  if (nombre.trim().length < 4) {
    setFormErrors(prev => ({ ...prev, nombre: 'El nombre debe tener al menos 4 caracteres.' }));
    return false;
  }
  return true;
};


export const validarNumero = (numero, setFormErrors) => {
  const numeroRegex = /^[0-9]{7,15}$/; // Solo dígitos, entre 7 y 15 caracteres
  if (!numeroRegex.test(numero)) {
    setFormErrors(prev => ({ ...prev, numero: 'Ingrese un número de teléfono válido (solo dígitos y entre 7 a 15 caracteres).' }));
    return false;
  }
  return true;
};

export const validarMensaje = (mensaje, setFormErrors) => {
  if (mensaje.trim().length === 0) {
    setFormErrors(prev => ({ ...prev, mensaje: 'El mensaje no puede estar vacío.' }));
    return false;
  }
  return true;
};

export const validarSoloLetrasSinSimbolos = (valor, campo, setFormErrors) => {
  const soloLetrasSinSimbolosRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!soloLetrasSinSimbolosRegex.test(valor)) {
    setFormErrors(prev => ({
      ...prev,
      [campo]: `El campo ${campo} solo puede contener letras y espacios.`
    }));
    return false;
  }
  return true;
};

export const validarCantidadCaracteres = (valor, campo, min, max, setFormErrors) => {
  if (valor.length < min || valor.length > max) {
    setFormErrors(prev => ({
      ...prev,
      [campo]: `El campo ${campo} debe tener entre ${min} y ${max} caracteres.`
    }));
    return false;
  }
  return true;
};
