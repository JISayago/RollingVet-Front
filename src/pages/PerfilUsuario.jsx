import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const animals = [
  { id: 1, name: 'Luna', age: '2 years', breed: 'Labrador', type: 'Dog', image: 'https://via.placeholder.com/100', link: '/animal/1' },
  { id: 2, name: 'Milo', age: '1 year', breed: 'Siamese', type: 'Cat', image: 'https://via.placeholder.com/100', link: '/animal/2' },
  { id: 3, name: 'Charlie', age: '3 years', breed: 'Beagle', type: 'Dog', image: 'https://via.placeholder.com/100', link: '/animal/3' },
  { id: 4, name: 'Bella', age: '4 years', breed: 'Bulldog', type: 'Dog', image: 'https://via.placeholder.com/100', link: '/animal/4' },
  { id: 5, name: 'Oscar', age: '2 years', breed: 'Persian', type: 'Cat', image: 'https://via.placeholder.com/100', link: '/animal/5' },
];

const consultations = [
  { id: 1, dateTime: '2024-09-16 10:00', professional: 'Dr. Smith', location: 'Clinic A', patient: 'Luna', responsible: 'John Doe' },
  { id: 2, dateTime: '2024-09-16 14:00', professional: 'Dr. Jones', location: 'Clinic B', patient: 'Milo', responsible: 'Jane Smith' },
  { id: 3, dateTime: '2024-09-17 09:00', professional: 'Dr. Adams', location: 'Clinic C', patient: 'Charlie', responsible: 'Alice Brown' },
  { id: 4, dateTime: '2024-09-17 11:00', professional: 'Dr. Lee', location: 'Clinic D', patient: 'Bella', responsible: 'Bob White' },
  { id: 5, dateTime: '2024-09-18 13:00', professional: 'Dr. Patel', location: 'Clinic E', patient: 'Oscar', responsible: 'Charlie Green' },
  { id: 6, dateTime: '2024-09-19 10:00', professional: 'Dr. Smith', location: 'Clinic F', patient: 'Luna', responsible: 'John Doe' },
  { id: 7, dateTime: '2024-09-19 13:00', professional: 'Dr. Jones', location: 'Clinic G', patient: 'Milo', responsible: 'Jane Smith' },
  { id: 8, dateTime: '2024-09-20 09:00', professional: 'Dr. Adams', location: 'Clinic H', patient: 'Charlie', responsible: 'Alice Brown' },
  { id: 9, dateTime: '2024-09-20 11:00', professional: 'Dr. Lee', location: 'Clinic I', patient: 'Bella', responsible: 'Bob White' },
  { id: 10, dateTime: '2024-09-21 13:00', professional: 'Dr. Patel', location: 'Clinic J', patient: 'Oscar', responsible: 'Charlie Green' },
];


const PerfilUsuario = () => {
  const userProfile = {
    image: 'https://via.placeholder.com/150',
    name: 'John Doe',
    petsCount: 5,
    family: ['Alice', 'Bob', 'Charlie', 'Diana'],
    nextAppointment: consultations[0],
  };

  const handleCancelAppointment = () => {
    alert('Appointment cancelled');
  };

  return (
    <Container fluid style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Row style={{ flex: 1 }}>
        {/* Columna del Perfil */}
        <Col xs={12} md={2} className="bg-primary text-dark d-flex flex-column justify-content-start align-items-center order-1 order-md-1" style={{ padding: '1rem' }}>
          <img src={userProfile.image} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <h2 className="mt-3" style={{ color: 'black' }}>{userProfile.name}</h2>
          <p className="mt-2" style={{ color: 'black' }}>Pets: {userProfile.petsCount}</p>
          <ul style={{ color: 'black' }}>
            <strong>Family:</strong>
            {userProfile.family.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
          <div className="mt-3 p-3" style={{
            width: '100%',
            maxWidth: '300px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
          }}>
            <h5>Próximo Turno</h5>
            <p><strong>Professional:</strong> {userProfile.nextAppointment.professional}</p>
            <p><strong>Date & Time:</strong> {userProfile.nextAppointment.dateTime}</p>
            <p><strong>Location:</strong> {userProfile.nextAppointment.location}</p>
            <Button variant="danger" onClick={handleCancelAppointment}>Cancel Appointment</Button>
          </div>
        </Col>

        {/* Cards de Animales y Consultas */}
        <Col xs={12} md={10} className="d-flex flex-column order-2 order-md-2">
          <Row className="flex-grow-1 overflow-auto mb-3" style={{ padding: '1rem' }}>
            <h3>Mascotas registradas</h3>
            <div className="d-flex" style={{ overflowY: 'auto' }}>
              {animals.map(animal => (
                <Col key={animal.id} xs={11} md={6} lg={4} className="mb-3">
                  <Card className="h-100" style={{ maxWidth: '250px' }}>
                    <Card.Img variant="top" src={animal.image} style={{ height: '150px', objectFit: 'cover' }} />
                    <Card.Body className="text-center">
                      <Card.Title>{animal.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Age: {animal.age}</Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">Breed: {animal.breed}</Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">Type: {animal.type}</Card.Subtitle>
                      <Button variant="primary" href={animal.link}>More Info</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </div>
          </Row>

          <Row className="flex-grow-1" style={{ padding: '1rem' }}>
            <h3>Últimas asistencias</h3>
            <Col xs={12} style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {consultations.map(consultation => (
                <Card key={consultation.id} className="mb-3">
                  <Card.Body>
                    <Card.Title>{consultation.professional}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Date & Time: {consultation.dateTime}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Location: {consultation.location}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Patient: {consultation.patient}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Responsible: {consultation.responsible}</Card.Subtitle>
                  </Card.Body>
                </Card>

              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default PerfilUsuario;
