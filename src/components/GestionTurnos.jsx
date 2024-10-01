import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const GestionTurnos = () => {
  const [appointments, setAppointments] = useState([]);

  const createWeeklyAppointments = () => {
    const newAppointments = [];
    const startHour = 9;
    const endHour = 18;
    const interval = 20; // minutos

    for (let day = 0; day < 5; day++) {
      for (let hour = startHour; hour < endHour; hour++) {
        for (let minutes = 0; minutes < 60; minutes += interval) {
          newAppointments.push({
            day: `Día ${day + 1}`,
            time: `${hour}:${minutes === 0 ? '00' : minutes}`,
            professional: 'Veterinario A',
          });
        }
      }
    }

    setAppointments(newAppointments);
  };

  return (
    <div>
      <h2>Gestión de Turnos</h2>
      <Button onClick={createWeeklyAppointments} variant="primary">
        Crear Turnos Semanales
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Día</th>
            <th>Hora</th>
            <th>Profesional</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.day}</td>
              <td>{appointment.time}</td>
              <td>{appointment.professional}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default GestionTurnos;
