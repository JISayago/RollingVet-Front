import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Form} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../helpers/axios.config';
import ModalConsulta from '../components/ModalesFormularios/ModalConsulta';
import ModalPlanAsignacion from '../components/ModalesFormularios/ModalPlanAsignacion';
import ModalBotonesOpciones from '../components/ModalesFormularios/ModalBotonesOpciones';
import ModalVacuna from '../components/ModalesFormularios/ModalVacuna';
import ModalVisitaPendiente from '../components/ModalesFormularios/ModalVisitaPendiente';
import { calcularEdad, getCurrentDate } from '../helpers/funcionesUtiles';
import { asignarPlan,agregarProcedimiento,actualizacionImagen,eliminarMascota,eliminarFicha, marcarCastrado, agregarVacuna, agregarVisitaPendiente } from '../services/PerfilMascotaServices';
import { ROL_ADMIN, ROL_CLIENTE } from '../helpers/variables';
import ListaVacuna from '../components/Listas/ListaVacuna';
import ListaFichaVeterinaria from '../components/Listas/ListaFichaVeterinaria';
import ListaProximosProcedimientos from '../components/Listas/ListaProximosProcedimientos';


const PerfilMascota = () => {
  const navigate = useNavigate();
  const procedimientoVacio = {fecha: getCurrentDate(),
    motivo: '',
    vistoPor: '',
    tratamiento: ''}
    const planesDisponibles = [
      'Sin Asignar',
      'Plan Básico',
      'Plan Avanzado',
      'Plan Premium',
    ];
    const [modalBotonesOpcionesShow, setModalBotonesOpcionesShow] = useState(false); 
    const [botonesOpciones, setBotonesOpciones] = useState([]); 
    const {id} = useParams();
    const [mascota, setMascota] = useState({});
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [nuevoProcedimiento, setNuevoProcedimiento] = useState(procedimientoVacio);
    const [modalShow, setModalShow] = useState(false); 
    const [modalPlanShow, setModalPlanShow] = useState(false); 
    const [modalVacunaShow, setModalVacunaShow] = useState(false);
    const [modalVisitaShow, setModalVisitaShow] = useState(false);
    const [fichasVeterinarias, setFichasVeterinarias] = useState([]);
    const [historialVacunas, setHistorialVacunas] = useState([])
    const [proximosProcedimientos, setProximosProcedimientos] = useState([]);
    const [imagen, setImagen] = useState(null);
    
    
    
    const handleAsignarPlan = (plan) => {
      asignarPlan(plan, mascota._id)
      mascota.plan = plan;
      setModalPlanShow(false); 
    }
    
    const handleAbrirModal = (opciones) => {
      setBotonesOpciones(opciones); 
      setModalBotonesOpcionesShow(true);
    };
    
  const cargarMascota = async () => {
    try {
      const response = await clienteAxios.get(`/mascotas/${id}`);
      if (response.data) {
        setMascota(response.data);
        setFichasVeterinarias(response.data.fichas || []);
        setHistorialVacunas(response.data.historialVacunas || []);
        setProximosProcedimientos(response.data.proximosProcemientos || []);
      }
    } catch (error) {
      console.error("Error al cargar la mascota:", error);
    }
    };
    
    useEffect(() => {
      if (sessionStorage.getItem('token')) {
        setTipoUsuario(JSON.parse(sessionStorage.getItem('rol')));
      }
      cargarMascota();
    }, [modalShow,imagen]);
    
    
    const handleAgregarProcedimiento = async (e) => {
      e.preventDefault();
      const result = await agregarProcedimiento(mascota._id, nuevoProcedimiento)
       setFichasVeterinarias([...fichasVeterinarias, result.data]);
       setNuevoProcedimiento(procedimientoVacio);
      
      setModalShow(false);
  };
  
  const handleActualizacionImagen = async () => {
    if (imagen) {
      const result = await actualizacionImagen(imagen, mascota._id)
      console.log(result)
      if (result.status === 200) { cargarMascota() };
      } else {
        alert("Por favor, seleccione una imagen para actualizar.");
      }
    };
  const handleEliminarMascota = () => {
    const rol = JSON.parse(sessionStorage.getItem("rol")) || "";
    if (mascota._id && rol) {
      eliminarMascota(mascota._id, rol);
      if (rol === ROL_ADMIN) {
        navigate('/administracion')
    } else {
        navigate('/perfil_usuario')
    }
    }
  }
    
    
  const handleEliminarFicha = (id) => {
    if (mascota._id) {
      eliminarFicha(id,mascota._id);
    }
    }
   
  const handleCastrar = async () => {
    if (mascota._id) {
      const result = await marcarCastrado(mascota._id)
      if (result.status === 200) {
        setMascota({ ...mascota, castrado: true })
      }
    }
  }
  const handleAgregarVacuna = async (nuevaVacuna) => {
    if (mascota._id) {
      const result = await agregarVacuna(nuevaVacuna,mascota._id)
      if (result.status === 200) {
        cargarMascota();
      }
    }
  }
  const handleAgregarVisitaPendiente = async (nuevaVisita) => {
    if (mascota._id) {
        const result = await agregarVisitaPendiente(nuevaVisita, mascota._id)
        if (result.status === 200) {
          cargarMascota();
        }
      }
    };
    return (
      <Container className="mt-4" fluid>
      <Row>
      {/* Columna izquierda - Perfil de la mascota */}
      <Col md={4}>
      <Card style={{ display: 'flex', alignItems: 'center', maxWidth: '350px', margin: 'auto' }}>
      <Card.Img
      variant="top"
      src={mascota.imagen}
      alt="Foto de la mascota"
      style={{
        width: '200px',
        height: 'auto',
        maxHeight: '150px',
        objectFit: 'contain',
      }}
      />
      <Card.Body style={{ textAlign: 'center' }}>
      <Card.Title>{mascota.nombre}</Card.Title>
      <Card.Text>
      <strong>Dueño:</strong> {mascota.duenioNombre} <br />
      <strong>Edad:</strong> {`${calcularEdad(mascota.fechaNacimiento)}`} <br />
      <strong>Tipo:</strong> {mascota.tipoDeMascota} <br />
      <strong>Raza:</strong> {mascota.raza} <br />
      <strong>Castrado:</strong> {mascota.castrado ? 'Sí' : 'No'} <br />
      <strong>Plan Asociado:</strong> {mascota.plan || 'Sin plan asignado'}
      </Card.Text>
      {tipoUsuario === ROL_CLIENTE && (
        <>
        <Form.Group className="mb-3 d-flex align-items-center">
        <Form.Label className="me-2">Imagen</Form.Label>
        <Form.Control
        type="file"
        onChange={(ev) => setImagen(ev.target.files[0])}
        className="me-2"
        />
        <Button variant="primary" onClick={handleActualizacionImagen}>
        Confirmar
        </Button>
        </Form.Group>
        <Button variant="danger" onClick={handleEliminarMascota}>
        Eliminar Mascota
        </Button>
        </>
      )}
      {tipoUsuario === ROL_ADMIN && (
        <div className="mt-4 d-flex flex-column">
        <Button
        variant="primary"
        className="mb-2"
        onClick={() =>
          handleAbrirModal([
            { texto: "Registro de Visita", accion: () => setModalShow(true) },
            { texto: "Visita Pendiente", accion: () => setModalVisitaShow(true)},
            { texto: "Agregar Vacuna", accion: () =>  setModalVacunaShow(true) },
          ])
        }
        >
        Consulta
        </Button>
        <Button
        variant="success"
        className="mb-2"
        onClick={() =>
          handleAbrirModal([
            { texto: "Asignar Plan", accion: () => setModalPlanShow(true) },
            { texto: "Marcar como Castrado", accion: () => handleCastrar() },
          ])
        }
        >
        Mascota
        </Button>
        <Button variant="danger" className="mb-2" onClick={handleEliminarMascota}>
        Eliminar
        </Button>
        </div>
      )}
      </Card.Body>
      </Card>
      </Col>
      
      <Col md={8}>
      <Card className="mb-4">
      <Card.Header>Próximos Procedimientos</Card.Header>
      <ListGroup
      variant="flush"
      style={{
        maxHeight: '250px',
        overflowY: 'auto',
      }}
      >
      {(proximosProcedimientos.length <= 0) && (<h5 style={{padding:'15px', color:'black'}}>Aún no tienes procedimiento pendiente registrado.</h5>)}
      
      {proximosProcedimientos.map((procedimiento, index) => (
          <ListaProximosProcedimientos key={index} index={index} procedimiento={procedimiento} tipoUsuario={tipoUsuario}  />
        ))}
        </ListGroup>
        </Card>
        <Card className="mb-4">
        <Card.Header>Historial de Vacunas</Card.Header>
        <ListGroup
        variant="flush"
        style={{
          maxHeight: '250px',
          overflowY: 'auto',
        }}
        >
        {(historialVacunas.length <= 0) && (<h5 style={{padding:'15px', color:'black'}}>Aún no tienes ninguna vacuna registrada para esta mascota.</h5>)}
                {historialVacunas.map((vacuna, index) => (
                  <ListaVacuna key={index} vacuna={vacuna} index ={index} tipoUsuario={tipoUsuario} />
          ))}
          </ListGroup>
          </Card>
          </Col>
          </Row>
          
          <Row style={{ marginBottom: '20px' }}>
          <Col md={12}>
          <Card>
          <Card.Header>Historial de Procedimientos</Card.Header>
          <ListGroup
          variant="flush"
          style={{
            maxHeight: '250px',
            overflowY: 'auto',
          }}
          >
          {(fichasVeterinarias.length <= 0) && (<h5 style={{padding:'15px', color:'black'}}>Aún no tienes ninguna ficha registrada para esta mascota.</h5>)}
                {fichasVeterinarias.map((ficha, index) => (
                  <ListaFichaVeterinaria key={index} index={index} ficha={ficha} tipoUsuario={tipoUsuario} handleEliminarFicha={handleEliminarFicha} />
          ))}
          </ListGroup>
          </Card>
          </Col>
          </Row>
          <ModalVisitaPendiente
          show={modalVisitaShow}
          handleClose={() => setModalVisitaShow(false)}
          handleAgregarVisitaPendiente={handleAgregarVisitaPendiente}
          />
          
          <ModalVacuna
          show={modalVacunaShow}
          handleClose={() => setModalVacunaShow(false)}
          handleAgregarVacuna={handleAgregarVacuna}
          />
          
          <ModalBotonesOpciones
          show={modalBotonesOpcionesShow}
          onHide={() => setModalBotonesOpcionesShow(false)}
          botones={botonesOpciones}
          />
          <ModalConsulta
          show={modalShow}
          onHide={() => setModalShow(false)}
          nuevoProcedimiento={nuevoProcedimiento}
          setNuevoProcedimiento={setNuevoProcedimiento}
          handleAgregarProcedimiento={handleAgregarProcedimiento}
          />
          <ModalPlanAsignacion
          show={modalPlanShow}
          onHide={() => setModalPlanShow(false)}
          planes={planesDisponibles}
          handleAsignarPlan={handleAsignarPlan}
          />
          </Container>
        );
        
        
      };
      
      export default PerfilMascota;