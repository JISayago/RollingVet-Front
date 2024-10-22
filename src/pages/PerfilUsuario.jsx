import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalMascotaRegistro from '../components/ModalesFormularios/ModalMascotaRegistro';
import CardProximoTurnoPerfilUsuario from '../components/Cards/CardProximoTurnoPerfilUsuario';
import CardMascotaPerfilUsuario from '../components/Cards/CardMascotaPerfilUsuario';
import ConsultaMascotaPerfilUsuario from '../components/Cards/CardConsultaMascotaPerfilUsuario';
import ModalLoginRegistro from '../components/ModalesFormularios/ModalLoginRegistro';
import ModalActualizarImagenUsuario from '../components/ModalesFormularios/ModalActualizarImagenUsuario'; // Importa el nuevo modal
import { Camera } from 'react-bootstrap-icons';
import "../css/perfil_usuario.css"
import { useNavigate } from 'react-router-dom';
import { cargarUsuario, eliminarPerfil } from '../services/PerfilUsuarioServices';

const PerfilUsuario = () => {
  const [showModalMascota, setShowModalMascota] = useState(false);
  const [showModalUsuario, setShowModalUsuario] = useState(false);
  const [showModalCargarImagen, setShowModalCargarImagen] = useState(false); // Nuevo estado para el modal
  const [usuario, setUsuario] = useState({});
  const [mascotas, setMascotas] = useState([]);
  const [fichas, setFichas] = useState([]);
  const [turnosPendientes, setTurnosPendientes] = useState([]);
  const navigate = useNavigate();

  const handleShowModalUsuario = (type) => {
    setModalTipo(type);
    setShowModalUsuario(true);
  };
  const handleCloseUsuario = () => {
    setShowModalUsuario(false);
  }
  const handleShowMascota = () => setShowModalMascota(true);
  const handleCloseMascota = () => setShowModalMascota(false);
  const handleCloseCargarImagen = () => setShowModalCargarImagen(false); // Manejador para cerrar el modal de carga de imagen
  const [modalTipo, setModalTipo] = useState(""); 

  const onMascotaRegistrada = () => {
    handleCargarUsuario();
  };

  const onImagenCargada = () => {
    handleCargarUsuario(); // Recargar usuario después de cargar la imagen
  };

  const handleCargarUsuario = async () => {
    const result = await cargarUsuario();
    if (result) {
          setUsuario(result.data.usuario);
          setMascotas(result.data.usuario.mascotas);
          setFichas(result.data.fichas);
          setTurnosPendientes(result.data.turnos);
        }
     else {
      alert('No se encontró un token.');
    }
  };

  useEffect(() => {
    handleCargarUsuario();
  }, [showModalUsuario,showModalCargarImagen]);

  const turnoMasProximo =
    turnosPendientes.length > 0
      ? turnosPendientes.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[0]
      : null;
  
  
  const handleEliminar = async () => {
    const result = await eliminarPerfil();
    if (result) {
      navigate('/');
      window.location.reload();
    }
 }   

  return (
    <Container fluid className="p-0 min-h-screen max-h-content" style={{ backgroundColor: '#f8f9fa' }}>
      <Row>
        <Col lg={3} className="text-center" style={{backgroundColor:'#09336b', padding: '15px',height:'80vh' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
              src={usuario.imagen}
              alt="Profile"
              style={{ width: '220px', height: '220px', borderRadius: '50%', objectFit: 'cover'}}
            />
            
            <Button
              variant="outline-light"
              size="lg"
              style={{
                position: 'absolute',
                bottom: '0px',
                right: '0px',
                borderRadius: '50%',
                padding: '5px 10px',
                backgroundColor: '#09336b',
                color: '#ffffff',
              }}
              onClick={() => setShowModalCargarImagen(true)} // Mostrar modal de carga de imagen
            >
              <Camera />
            </Button>
          </div>
          <h2 className="mt-3" style={{ color: '#ffffff', fontSize: '1.5rem' }}>
            {usuario.nombre}
          </h2>
          <p className="mt-2" style={{ color: '#f45e00' }}>
            Mascotas: {usuario.mascotas && usuario.mascotas.length ? usuario.mascotas.length : 0}
          </p>
          <div className="d-flex flex-column mt-3">
            
  <Button variant="success" onClick={handleShowMascota} className="mb-2">
    Registrar Mascota
  </Button>
  <Button variant="warning" className="mb-2" onClick={() => handleShowModalUsuario("editarPerfil")}>
    Editar Perfil
  </Button>
  <Button onClick={handleEliminar} variant="danger" className='mt-10' >Eliminar Perfil</Button> {/* Añadimos mt-auto para empujarlo */}
</div>

          {turnoMasProximo && <CardProximoTurnoPerfilUsuario turnoMasProximo={turnoMasProximo} />}
        </Col>

        <Col style={{padding:'20px'}}>
          <Row style ={{padding:'20px'}}>
            <h3>Mascotas registradas</h3>
            {!mascotas.length && (
              <h6 style={{ color: 'grey' }}>No tienes ninguna mascota asignada!</h6>
            )}
            <Container fluid className="d-flex" style={{ overflowY: 'auto' }}>
              {mascotas.map((mascota) => (
                <CardMascotaPerfilUsuario key={mascota.mascotaId} mascota={mascota} />
              ))}
            </Container>
          </Row>

          <Row style ={{padding:'20px'}}>
            <h3>Últimas asistencias</h3>
            {!fichas.length && (
              <h6 style={{ color: 'grey' }}>No tienes ninguna visita registrada!</h6>
            )}
            <Col>
            <Container fluid className="d-flex" style={{ overflowY: 'auto' }}>
              {fichas.map((ficha) => (
                <ConsultaMascotaPerfilUsuario key={ficha._id} ficha={ficha} />
              ))}
                </Container>
            </Col>
          </Row>
        </Col>
      </Row>
      <ModalLoginRegistro
        show={showModalUsuario}
        handleCerrar={handleCloseUsuario}
        type={modalTipo}
        onMascotaRegistrada={onMascotaRegistrada}
        usuario={usuario}
      />
      <ModalMascotaRegistro
        show={showModalMascota}
        handleCerrar={handleCloseMascota}
        onMascotaRegistrada={onMascotaRegistrada}
      />
      <ModalActualizarImagenUsuario 
        show={showModalCargarImagen} 
        handleCerrar={handleCloseCargarImagen}
        usuario={usuario}
        onImagenCargada={onImagenCargada} 
      />
    </Container>
  );
};

export default PerfilUsuario;
