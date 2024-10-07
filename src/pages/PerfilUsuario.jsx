import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import clienteAxios from '../helpers/axios.config';
import ModalMascotaRegistro from '../components/ModalesFormularios/ModalMascotaRegistro';
import CardProximoTurnoPerfilUsuario from '../components/Cards/CardProximoTurnoPerfilUsuario';
import CardMascotaPerfilUsuario from '../components/Cards/CardMascotaPerfilUsuario';
import ConsultaMascotaPerfilUsuario from '../components/Cards/CardConsultaMascotaPerfilUsuario';

const PerfilUsuario = () => {
  const [showModal, setShowModal] = useState(false);
  const [usuario, setUsuario] = useState({});
  const [mascotas, setMascotas] = useState([]);
  const [fichas, setFichas] = useState([]);
  const [turnosPendientes, setTurnosPendientes] = useState([]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const onMascotaRegistrada = () => {
    cargarUsuario();
  };

  const cargarUsuario = async () => {
    const token = JSON.parse(sessionStorage.getItem('token'));

    if (token) {
      try {
        const result = await clienteAxios.get('/usuarios/perfilUsuario', {
          headers: {
            'Content-Type': 'application/json',
            auth: token,
          },
        });
        if (result) {
          setUsuario(result.data.usuario);
          setMascotas(result.data.usuario.mascotas);
          setFichas(result.data.fichas);
          setTurnosPendientes(result.data.turnos);
        }
      } catch (error) {
        alert('Error al cargar usuario');
      }
    } else {
      alert('No se encontró un token.');
    }
  };

  useEffect(() => {
    cargarUsuario();
  }, []);

  const turnoMasProximo =
    turnosPendientes.length > 0
      ? turnosPendientes.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[0]
      : null;

  return (
    <Container fluid style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Row style={{ flex: 1 }}>
        <Col
          xs={12}
          md={2}
          className="text-dark d-flex flex-column justify-content-start align-items-center order-1 order-md-1"
          style={{ backgroundColor: '#09336b', padding: '1rem' }}
        >
          <img
            src={usuario.imagen}
            alt="Profile"
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
          <h2 className="mt-3 text-center" style={{ color: '#ffffff', fontSize: '1.5rem' }}>
            {usuario.nombre}
          </h2>
          <p className="mt-2 text-center" style={{ color: '#f45e00' }}>
            Mascotas: {usuario.mascotas && usuario.mascotas.length ? usuario.mascotas.length : 0}
          </p>
          <Button variant="success" onClick={handleShow} className="mt-3">
            Registrar Mascota
          </Button>

          {turnoMasProximo && <CardProximoTurnoPerfilUsuario turnoMasProximo={turnoMasProximo} />}
        </Col>

        <Col xs={12} md={10} className="d-flex flex-column order-2 order-md-2">
          <Row className="flex-grow-1 overflow-auto mb-3" style={{ padding: '1rem' }}>
            <h3>Mascotas registradas</h3>
              { !mascotas.length  && <h6 style={{color:'grey'}}>No tienes ninguna mascota asignada!</h6>}
            <Container fluid className="d-flex" style={{ overflowY: 'auto' }}>
              {mascotas.map((mascota) => (
                <CardMascotaPerfilUsuario key={mascota.mascotaId} mascota={mascota} />
              ))}
            </Container>
          </Row>

          <Row className="flex-grow-1" style={{ padding: '1rem' }}>
            <h3>Últimas asistencias</h3>
            { !fichas.length  && <h6 style={{color:'grey'}}>No tienes ninguna visita registrada!</h6>}
            <Col xs={12} style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {fichas.map((ficha) => (
                <ConsultaMascotaPerfilUsuario key={ficha._id} ficha={ficha} />
              ))}
            </Col>
          </Row>

          <ModalMascotaRegistro
            show={showModal}
            handleClose={handleClose}
            onMascotaRegistrada={onMascotaRegistrada}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default PerfilUsuario;
