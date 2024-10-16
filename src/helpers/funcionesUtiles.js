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