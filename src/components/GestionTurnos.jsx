import React, { useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';

const GestionTurnos = () => {
  const [appointments, setAppointments] = useState([]);
  const [branch, setBranch] = useState('Sucursal A'); // Valor predeterminado
  const [currentPage, setCurrentPage] = useState(0); // Página actual
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]); // Fecha de inicio por defecto (hoy)

  const createMonthlyAppointments = () => {
    const newAppointments = [];
    const start = new Date(startDate); // Fecha de inicio seleccionada
    const endDate = new Date(start.getFullYear(), start.getMonth() + 1, 0); // Fin del mes de la fecha de inicio
    const startHour = 9; // 9 AM
    const endHour = 18; // 6 PM
    const interval = 20; // minutos
    const veterinarian = 'Veterinario A'; // Veterinario por defecto

    // Generar turnos para cada día del mes
    for (let date = new Date(start); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dayOfWeek = date.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
      if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Solo lunes a viernes
        for (let hour = startHour; hour < endHour; hour++) {
          for (let minutes = 0; minutes < 60; minutes += interval) {
            newAppointments.push({
              date: date.toISOString().split('T')[0], // Fecha en formato YYYY-MM-DD
              time: `${hour}:${minutes === 0 ? '00' : minutes}`,
              branch: branch,
              veterinarian: veterinarian,
              status: 'disponible',
            });
          }
        }
      }
    }

    setAppointments(newAppointments);
    setCurrentPage(0); // Resetear la página actual al crear nuevos turnos
  };

  // Obtener las citas por fecha
  const appointmentsByDate = appointments.reduce((acc, appointment) => {
    const date = appointment.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(appointment);
    return acc;
  }, {});

  const availableDates = Object.keys(appointmentsByDate); // Fechas disponibles

  // Obtener las citas para la fecha de la página actual
  const currentAppointments = availableDates[currentPage] ? appointmentsByDate[availableDates[currentPage]] : [];

  return (
    <div>
      <h2>Gestión de Turnos</h2>
      <Form className="mt-3">
        <Form.Group controlId="formStartDate">
          <Form.Label>Fecha de Inicio</Form.Label>
          <Form.Control 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBranch">
          <Form.Label>Sucursal</Form.Label>
          <Form.Control 
            as="select" 
            value={branch} 
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value="Sucursal A">Sucursal A</option>
            <option value="Sucursal B">Sucursal B</option>
            <option value="Sucursal C">Sucursal C</option>
          </Form.Control>
        </Form.Group>
      </Form>

      <Button onClick={createMonthlyAppointments} variant="primary" className="mt-3">
        Crear Turnos Mensuales
      </Button>

      {currentAppointments.length > 0 ? (
        <>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Sucursal</th>
                <th>Veterinario</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {currentAppointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.branch}</td>
                  <td>{appointment.veterinarian}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          <div className="d-flex justify-content-between mt-3">
            <Button 
              disabled={currentPage === 0} 
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Anterior
            </Button>
            <Button 
              disabled={currentPage >= availableDates.length - 1} 
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Siguiente
            </Button>
          </div>

          {/* Barra de Paginación */}
          <div className="mt-3">
            <span>Página {currentPage + 1} de {availableDates.length}</span>
            <div className="mt-2">
              {availableDates.map((_, index) => (
                <Button 
                  key={index} 
                  variant="secondary" 
                  className="mx-1" 
                  onClick={() => setCurrentPage(index)} 
                  active={index === currentPage}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>No hay turnos disponibles para esta sucursal.</p>
      )}
    </div>
  );
};

export default GestionTurnos;
