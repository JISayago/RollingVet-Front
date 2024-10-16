import { useState, useEffect } from 'react';
import { Button, Table, Form, Pagination } from 'react-bootstrap';
import clienteAxios from '../../helpers/axios.config';
import { configHeaders } from '../../helpers/extra.config';

const GestionTurnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [sucursal, setSucursal] = useState();
  const [sucursales, setSucursales] = useState();
  const [fechaInicio, setFechaInicio] = useState(new Date().toISOString().split('T')[0]);
  const [fechaFin, setFechaFin] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [turnosPorPagina] = useState(27);

  
  useEffect(() => {
    const inicio = new Date(fechaInicio);
    inicio.setDate(inicio.getDate() + 7); 
    setFechaFin(inicio.toISOString().split('T')[0]); 
  }, [fechaInicio]);
  useEffect(() => {
    cargarSucursalesDisponibles();
  }, []);
  const cargarSucursalesDisponibles = async () => {
    const sucursalesBD = await clienteAxios.get('/sucursales');
    setSucursales(sucursalesBD.data);
  }

  const esDiaLaborable = (fecha) => {
    const diaDeLaSemana = fecha.getDay();
    return diaDeLaSemana !== 5 && diaDeLaSemana !== 6; 
  };

  const generarTurnos = () => {
    const nuevosTurnos = [];
    const horaInicio = 9; 
    const horaFin = 18; 
    const intervalo = 20; 

  
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const maxFechaFin = new Date(inicio);
    maxFechaFin.setDate(inicio.getDate() + 7); 

    if (fin > maxFechaFin) {
      alert('La fecha de finalización no puede exceder una semana desde la fecha de inicio.');
      return;
    }

  
    for (let d = inicio; d <= fin; d.setDate(d.getDate() + 1)) {
     
      if (esDiaLaborable(d)) {
        for (let laHora = horaInicio; laHora < horaFin; laHora++) {
          for (let minutos = 0; minutos < 60; minutos += intervalo) {
            const tiempo = `${laHora}:${minutos === 0 ? '00' : minutos}`;
            nuevosTurnos.push({
              dia: d.toISOString().split('T')[0],
              hora: tiempo,
              sucursal: "Sede Central",
              motivo: "Consulta Veterinaria",
              reservado: false,
            });
          }
        }
      }
    }

    setTurnos(nuevosTurnos);
    setPaginaActual(1); 
  };

  const guardarTurnosEnDB = async () => {
    try {
      const resultado = await clienteAxios.post('/turnos', turnos, configHeaders);
      
      if (resultado.status === 201) {
        alert('Turnos guardados exitosamente!');
      } else {
        alert('No se pudo guardar los turnos. Inténtalo de nuevo.');
      }
    } catch (error) {
      alert('Ocurrió un error al guardar los turnos. Verifica la consola para más detalles.');
    }
  };

 
  const indiceDelUltimoTurno = paginaActual * turnosPorPagina;
  const indiceDelPrimerTurno = indiceDelUltimoTurno - turnosPorPagina;
  const turnosActuales = turnos.slice(indiceDelPrimerTurno, indiceDelUltimoTurno);

  const paginar = (numeroDePagina) => setPaginaActual(numeroDePagina);

  return (
    <div>
      <h2>Gestión de Turnos</h2>
      <Form className="mt-3">
        <Form.Group controlId="formFechaInicio">
          <Form.Label>Fecha de Inicio</Form.Label>
          <Form.Control 
            type="date" 
            value={fechaInicio} 
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formFechaFin">
          <Form.Label>Fecha de Fin</Form.Label>
          <Form.Control 
            type="date" 
            value={fechaFin} 
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Button onClick={generarTurnos} variant="primary" className="mt-3">
        Generar Turnos
      </Button>
      <Button onClick={guardarTurnosEnDB} variant="success" className="mt-3" disabled={turnos.length === 0}>
        Guardar Turnos
      </Button>
      {turnos.length > 0 && (
        <>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Dia</th>
                <th>Hora</th>
                <th>Sucursal</th>
              </tr>
            </thead>
            <tbody>
              {turnosActuales.map((turno, index) => (
                <tr key={index}>
                  <td>{turno.dia}</td>
                  <td>{turno.hora}</td>
                  <td>Sede Central</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination className="mt-3">
            {Array.from({ length: Math.ceil(turnos.length / turnosPorPagina) }, (_, i) => (
              <Pagination.Item key={i + 1} active={i + 1 === paginaActual} onClick={() => paginar(i + 1)}>
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}
    </div>
  );
};

export default GestionTurnos;
