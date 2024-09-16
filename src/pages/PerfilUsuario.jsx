import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const animals = [
  { id: 1, name: 'Luna', age: '2 years', breed: 'Labrador', type: 'Dog', image: 'https://via.placeholder.com/100', link: '/animal/1' },
  { id: 2, name: 'Milo', age: '1 year', breed: 'Siamese', type: 'Cat', image: 'https://via.placeholder.com/100', link: '/animal/2' },
  { id: 3, name: 'Charlie', age: '3 years', breed: 'Beagle', type: 'Dog', image: 'https://via.placeholder.com/100', link: '/animal/3' },
  { id: 4, name: 'Bella', age: '4 years', breed: 'Bulldog', type: 'Dog', image: 'https://via.placeholder.com/100', link: '/animal/4' },
  { id: 5, name: 'Oscar', age: '2 years', breed: 'Persian', type: 'Cat', image: 'https://via.placeholder.com/100', link: '/animal/5' },
  { id: 6, name: 'Charlie', age: '3 years', breed: 'Beagle', type: 'Dog', image: 'https://via.placeholder.com/100', link: '/animal/3' },
  { id: 7, name: 'Bella', age: '4 years', breed: 'Bulldog', type: 'Dog', image: 'https://via.placeholder.com/100', link: '/animal/4' },
  { id: 8, name: 'Oscar', age: '2 years', breed: 'Persian', type: 'Cat', image: 'https://via.placeholder.com/100', link: '/animal/5' },
  { id: 9, name: 'Charlie', age: '3 years', breed: 'Beagle', type: 'Dog', image: 'https://via.placeholder.com/100', link: '/animal/3' },
  { id: 10, name: 'Bella', age: '4 years', breed: 'Bulldog', type: 'Dog', image: 'https://via.placeholder.com/100', link: '/animal/4' },
  { id: 11, name: 'Oscar', age: '2 years', breed: 'Persian', type: 'Cat', image: 'https://via.placeholder.com/100', link: '/animal/5' },
];

const consultations = [
  { id: 1, dateTime: '2024-09-16 10:00', professional: 'Dr. Smith', location: 'Clinic A' },
  { id: 2, dateTime: '2024-09-16 14:00', professional: 'Dr. Jones', location: 'Clinic B' },
  { id: 3, dateTime: '2024-09-17 09:00', professional: 'Dr. Adams', location: 'Clinic C' },
  { id: 4, dateTime: '2024-09-17 11:00', professional: 'Dr. Lee', location: 'Clinic D' },
  { id: 5, dateTime: '2024-09-18 13:00', professional: 'Dr. Patel', location: 'Clinic E' },
];

const PerfilUsuario = () => {
  // Dummy data for user profile
  const userProfile = {
    image: 'https://via.placeholder.com/150', // Profile image URL
    name: 'John Doe',
    petsCount: 5,
    family: ['Alice', 'Bob', 'Charlie', 'Diana'], // List of family members
    nextAppointment: consultations[0], // Assuming the first consultation as the next one
  };

  const handleCancelAppointment = () => {
    alert('Appointment cancelled');
    // Add logic to handle cancellation
  };

  return (
    <Container fluid style={{ height: '100vh', padding: '1rem' }}>
      <Row style={{ height: '100%' }}>
        <Col md={9} className="d-flex flex-column" style={{ height: '100%' }}>
          <Row className="flex-grow-1 overflow-auto mb-3" style={{ height: '50%', padding: '1rem' }}>
            <div className="d-flex flex-wrap gap-3" style={{ overflowY: 'auto' }}>
              {animals.map(animal => (
                <Card style={{ width: '30%', display: 'flex', flexDirection: 'row' }} key={animal.id}>
                  <Card.Img variant="left" src={animal.image} style={{ width: '150px', height: 'auto' }} />
                  <Card.Body>
                    <Card.Title>{animal.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Age: {animal.age}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Breed: {animal.breed}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Type: {animal.type}</Card.Subtitle>
                    <Button variant="primary" href={animal.link}>More Info</Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Row>
          <Row className="flex-grow-1 overflow-auto" style={{ height: '50%', padding: '1rem' }}>
            {consultations.map(consultation => (
              <Col md={12} className="mb-3 d-flex justify-content-center" key={consultation.id}>
                <Card style={{ width: '80%' }}>
                  <Card.Body>
                    <Card.Title>{consultation.professional}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Date & Time: {consultation.dateTime}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Location: {consultation.location}</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={3} className="bg-primary text-dark d-flex flex-column justify-content-start align-items-center" style={{ height: '100%', padding: '1rem' }}>
          <img src={userProfile.image} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <h2 className="mt-3" style={{ color: 'black' }}>{userProfile.name}</h2>
          <p className="mt-2" style={{ color: 'black' }}>Pets: {userProfile.petsCount}</p>
          <ul style={{ color: 'black' }}>
            <strong>Family:</strong>
            {userProfile.family.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
          <div className="mt-3 p-3" style={{ width: '100%', maxWidth: '300px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', textAlign: 'center' }}>
            <h5>Próximo Turno</h5>
            <p><strong>Professional:</strong> {userProfile.nextAppointment.professional}</p>
            <p><strong>Date & Time:</strong> {userProfile.nextAppointment.dateTime}</p>
            <p><strong>Location:</strong> {userProfile.nextAppointment.location}</p>
            <Button variant="danger" onClick={handleCancelAppointment}>Cancel Appointment</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PerfilUsuario;
