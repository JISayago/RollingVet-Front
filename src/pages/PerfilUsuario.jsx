import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import clienteAxios from '../helpers/axios.config';
import ModalMR from '../components/ModalMR'; // Importa el nuevo componente

const PerfilUsuario = () => {
  const [showModal, setShowModal] = useState(false);
  const [usuario, setUsuario] = useState({});
  const [mascotas, setMascotas] = useState([]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const onMascotaRegistrada = () => {
    // Lógica para actualizar las mascotas
    cargarUsuario(); // Llama a cargarUsuario para obtener la lista actualizada
  };

  const cargarUsuario = async () => {
    // Obtener el token desde sessionStorage
    const token = JSON.parse(sessionStorage.getItem("token"));

    if (token) {
      try {
        const result = await clienteAxios.get("/usuarios/perfilUsuario", {
          headers: {
            "Content-Type": "application/json",
            "auth": token
          }
        });
        if (result) {
          setUsuario(result.data);
          setMascotas(result.data.mascotas);
        }
      } catch (error) {
        console.error("Error al cargar usuario:", error.response ? error.response.data : error);
      }
    } else {
      console.log("No se encontró un token.");
    }
  };

  const calcularEdad = (fechaNacimiento) => {
    const fechaNac = new Date(fechaNacimiento);
    const fechaActual = new Date();
    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();
    const mesActual = fechaActual.getMonth();
    const mesNacimiento = fechaNac.getMonth();

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && fechaActual.getDate() < fechaNac.getDate())) {
      edad--;
    }

    let meses = mesActual - mesNacimiento;
    if (meses < 0) {
      meses += 12;
    }

    return `${edad} años y ${meses} meses`;
  };


  useEffect(() => {
    cargarUsuario();
  }, []);

  return (
    <Container fluid style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Row style={{ flex: 1 }}>
        {/* Columna del Perfil */}
        <Col xs={12} md={2} className="bg-primary text-dark d-flex flex-column justify-content-start align-items-center order-1 order-md-1" style={{ padding: '1rem' }}>
          <img src={usuario.image} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <h2 className="mt-3" style={{ color: 'black' }}>{usuario.nombre}</h2>
          <p className="mt-2" style={{ color: 'black' }}>Mascotas: {usuario.mascotas && usuario.mascotas.length ? usuario.mascotas.length : 0}</p>
          <ul style={{ color: 'black' }}>
            <strong>Familia:</strong>
            {/*usuario.family.map((member, index) => (
              <li key={index}>{member}</li>
            ))*/}
          </ul>
          <Button variant="success" onClick={handleShow} className="mt-3">Registrar Mascota</Button>
        </Col>

        {/* Cards de Animales y Consultas */}
        <Col xs={12} md={10} className="d-flex flex-column order-2 order-md-2">
          <Row className="flex-grow-1 overflow-auto mb-3" style={{ padding: '1rem' }}>
            <h3>Mascotas registradas</h3>
            <div className="d-flex" style={{ overflowY: 'auto' }}>
              {mascotas.map(animal => (
                <Col key={animal.id} xs={11} md={6} lg={4} className="mb-3">
                  <Card className="h-100" style={{ maxWidth: '250px' }}>
                    <Card.Img variant="top" src={animal.image} style={{ height: '150px', objectFit: 'cover' }} />
                    <Card.Body className="text-center">
                      <Card.Title>{animal.nombre}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Años: {calcularEdad(animal.fechaNacimiento)}</Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">Raza: {animal.raza}</Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">Mascota: {animal.tipoDeMascota}</Card.Subtitle>
                      <Button variant="primary" href={`/perfil_mascota/${animal.id}`}>Ver Más...</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </div>
          </Row>

          <Row className="flex-grow-1" style={{ padding: '1rem' }}>
            <h3>Últimas asistencias</h3>
            <Col xs={12} style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {/*consultations.map(consultation => (
                <Card key={consultation.id} className="mb-3">
                  <Card.Body>
                    <Card.Title>{consultation.professional}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Fecha y Hora: {consultation.dateTime}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Ubicación: {consultation.location}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Paciente: {consultation.patient}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Responsable: {consultation.responsible}</Card.Subtitle>
                  </Card.Body>
                </Card>
              ))*/}
            </Col>
          </Row>

          {/* Modal para agregar mascota */}
      <ModalMR
        show={showModal}
        handleClose={handleClose}
        onMascotaRegistrada={onMascotaRegistrada} // Pasa la función de actualización
      />
          
        </Col>
      </Row>
    </Container>
  );
};
export default PerfilUsuario;
