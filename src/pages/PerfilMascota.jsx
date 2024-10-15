import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Form} from 'react-bootstrap';
import { json, useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../helpers/axios.config';
import ModalConsulta from '../components/ModalesFormularios/ModalConsulta';
import ModalVacunaRegistro from '../components/ModalesFormularios/ModalVacunaRegistro'
import ModalPlanAsignacion from '../components/ModalesFormularios/ModalPlanAsignacion';
import { configHeaders } from '../helpers/extra.config';
import ModalBotonesOpciones from '../components/ModalesFormularios/ModalBotonesOpciones';
import ModalVacuna from '../components/ModalesFormularios/ModalVacuna';
import ModalVisitaPendiente from '../components/ModalesFormularios/ModalVisitaPendiente';

const PerfilMascota = () => {
  const navigate = useNavigate();
  const planesDisponibles = [
    'Sin Asignar',
    'Plan Básico',
    'Plan Avanzado',
    'Plan Premium',
  ];
  const [modalBotonesOpcionesShow, setModalBotonesOpcionesShow] = useState(false); // Modal de botones renombrado
  const [botonesOpciones, setBotonesOpciones] = useState([]); // Botones dinámicos del modal
  const params = useParams();
  const [mascota, setMascota] = useState({});
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [nuevoProcedimiento, setNuevoProcedimiento] = useState({
    fecha: '',
    motivo: '',
    vistoPor: '',
    tratamiento: '',
  });
  const [modalShow, setModalShow] = useState(false); 
  const [modalPlanShow, setModalPlanShow] = useState(false); 
  const [modalVacunaShow, setModalVacunaShow] = useState(false);
  const [modalVisitaShow, setModalVisitaShow] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState(''); 
  const [fichasVeterinarias, setFichasVeterinarias] = useState([]);
  const [historialVacunas, setHistorialVacunas] = useState([])
  const [proximosProcedimientos, setProximosProcedimientos] = useState([]);
  const [imagen, setImagen] = useState(null);
  
    
  const asignarPlan = async (plan) => {
    const rol = JSON.parse(sessionStorage.getItem('rol')) || "";
    if (rol !== "Administrador") {
      alert("No cuenta con permisos suficientes.")
    }
    if (confirm(`Usted está por asignar el plan: ${plan}. ¿Está seguro?`)) {
      try { 
        const result = await clienteAxios.post(
          `/mascotas/asignarPlan/${mascota._id}`,
          {plan:plan},
          configHeaders
        );
        if (result.status === 200) {
          alert("Plan asignado correctamente.")
          mascota.plan = plan
        }
      }
      catch (error) { }
    }
    setModalPlanShow(false); 
  };

  const handleAbrirModal = (opciones) => {
    setBotonesOpciones(opciones); // Pasar las opciones de botones
    setModalBotonesOpcionesShow(true); // Mostrar el modal renombrado
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


  const cargarMascota = async () => {
    const mascotaBD = await clienteAxios.get(`/mascotas/${params.id}`)
    setMascota(mascotaBD.data);
    setFichasVeterinarias(mascotaBD.data.fichas)
    setHistorialVacunas(mascotaBD.data.historialVacunas)
    setProximosProcedimientos(mascotaBD.data.proximosProcemientos)
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setTipoUsuario(JSON.parse(sessionStorage.getItem('rol')));
    }
    cargarMascota();
  }, [modalShow,imagen]);


  const agregarProcedimiento = async (e) => {
    e.preventDefault();
    try {
      const result = await clienteAxios.post(
        `/fichas/${mascota._id}`,
        nuevoProcedimiento,
        configHeaders
      );

      setFichasVeterinarias([...fichasVeterinarias, result.data]);
      alert("Visita agregada con éxito!");
      setNuevoProcedimiento({fecha: '',
    motivo: '',
    vistoPor: '',
    tratamiento: '',});
  
      setModalShow(false);
    } catch (error) {
      alert("Error al guardar la visita. Inténtelo de nuevo.");
    }
  };
  const handleActualizacionImagen = async () => {
    if (imagen) {
      try {
        const formData = new FormData();
        formData.append('imagen', imagen); 
  
        const result = await clienteAxios.post(
          `mascotas/agregarImagen/${mascota._id}`,
          formData,
          configHeaders);
  
        alert("Imagen actualizada con éxito!");
        cargarMascota();
      } catch (error) {
        alert("Error al actualizar la imagen. Inténtelo de nuevo.");
      }
    } else {
      alert("Por favor, seleccione una imagen para actualizar.");
    }
  };
  const handleEliminarMascota = () => {
    eliminarMascota(mascota._id);
  }
  const eliminarMascota = async (mascotaId) => {
    const rol = JSON.parse(sessionStorage.getItem("rol")) || "";
    if (mascota._id && rol ) {
      try {
        const result = await clienteAxios.delete(
          `/mascotas/${mascotaId}`,
          configHeaders
        );
        alert("Masctoa eliminada correctamente");
        if (rol === "Administrador") {
          navigate('/administracion')
        } else {
          navigate('/perfil_usuario')
        }
      }
      catch (error) {
        alert("Ocurrió un error al eliminar el perfil.")
      }
    }
  }
  const eliminarFicha = async (id) => {
    const rol = JSON.parse(sessionStorage.getItem("rol")) || "";
    if (rol === "Administrador") {
      try {
        
        const result = await clienteAxios.delete(
          `/fichas/eliminarFicha/${id}/${mascota._id}`,
          configHeaders
        );
        alert("Ficha eliminada correctamente");
      }
      catch (error) {
        alert("Ocurrió un error al eliminar la Ficha.")
      }
    }
  }
  const handleEliminarFicha = (id) => {
    eliminarFicha(id);
  }
  const marcarCastrado = async () => {
    const rol = JSON.parse(sessionStorage.getItem("rol")) || "";
    if (rol === "Administrador") {
      try {
        const result = await clienteAxios.post(
          `/mascotas/castrar/${mascota._id}`,
          {},
          configHeaders
        );
        alert("Mascota actualizada correctamente");
        setMascota({...mascota, castrado: true})
      }
      catch (error) {
        alert("Ocurrió un error al actualizar la mascota.")
      }
    }
  }
  const handleCastrar = () => {
    marcarCastrado()
  }
  const agregarVacuna = async (nuevaVacuna) => {
    const rol = JSON.parse(sessionStorage.getItem("rol")) || "";
    if (rol === "Administrador") {
      console.log(nuevaVacuna)
      try {
        const result = await clienteAxios.post(
          `/mascotas/agregarVacuna/${mascota._id}`,
          nuevaVacuna,
          configHeaders
        );
        alert("Mascota actualizada correctamente");
        cargarMascota();
      }
      catch (error) {
        alert("Ocurrió un error al actualizar la mascota.")
      }
    }

  };
  const agregarVisitaPendiente = async (nuevaVisita) => {
    const rol = JSON.parse(sessionStorage.getItem("rol")) || "";
    if (rol === "Administrador") {
      try {
        console.log(mascota._id)
        const result = await clienteAxios.post(
          `/mascotas/agregarProximaVisita/${mascota._id}`,
          nuevaVisita,
          configHeaders
        );
        alert("Mascota actualizada correctamente");
        cargarMascota();
      }
      catch (error) {
        alert("Ocurrió un error al actualizar la mascota.")
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
            {tipoUsuario === 'Cliente' && (
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
            {/* Botones del Administrador */}
            {tipoUsuario === 'Administrador' && (
              <div className="mt-4 d-flex flex-column">
                  {/* Botón de Consulta que abre el modal con opciones */}
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
                  {/* Botón de Mascota que abre el modal con otras opciones */}
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
                  {/* Botón para eliminar la mascota */}
                  <Button variant="danger" className="mb-2" onClick={handleEliminarMascota}>
                    Eliminar
                  </Button>
                </div>
            )}
          </Card.Body>
        </Card>
      </Col>

      {/* Columna derecha - Próximos Procedimientos */}
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
                {(proximosProcedimientos.length <= 0) && (<h5 style={{padding:'15px', color:'black'}}>Aún notienes procedimiento pendiente registrado.</h5>)}
             
            {proximosProcedimientos.map((procedimiento, index) => (
              <ListGroup.Item key={index}>
                <Row className="align-items-center">
                  <Col md={9}>
                    <strong>{procedimiento.detalle}</strong> - {procedimiento.fecha}
                  </Col>
                  {tipoUsuario === 'Administrador' && (
                    <Col md={3} className="text-end">
                      <Button variant="danger" onClick={() => console.log('Eliminar')}>
                        Eliminar
                      </Button>
                    </Col>)}
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
        {/* Historial de Vacunas */}
        <Card className="mb-4">
          <Card.Header>Historial de Vacunas</Card.Header>
          <ListGroup
            variant="flush"
            style={{
              maxHeight: '250px',
              overflowY: 'auto',
            }}
           >
                {(historialVacunas.length <= 0) && (<h5 style={{padding:'15px', color:'black'}}>Aún notienes ninguna vacuna registrada para esta mascota.</h5>)}
            {historialVacunas.map((vacuna, index) => (
              <ListGroup.Item key={index}>
                <Row className="align-items-center">
                  <Col md={9}>
                    <strong>{`${vacuna.fecha} - ${vacuna.nombre}`}</strong>
                  </Col>
                  {tipoUsuario === 'Administrador' && (
                    <Col md={3} className="text-end">
                      <Button variant="danger" onClick={() => console.log('Eliminar')}>
                        Eliminar
                      </Button>
                    </Col>)}
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Col>
    </Row>

    {/* Segunda fila - Historial de Procedimientos */}
    <Row style={{ marginBottom: '20px' }}>
      {/* Historial de Procedimientos */}
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
             {(fichasVeterinarias.length <= 0) && (<h5 style={{padding:'15px', color:'black'}}>Aún notienes ninguna ficha registrada para esta mascota.</h5>)}
            {fichasVeterinarias.map((ficha, index) => (
              <ListGroup.Item key={index}>
                <Row className="align-items-center">
                  <Col md={9}>
                    <strong>Fecha:</strong> {new Date(ficha.fecha).toLocaleDateString()} <br />
                    <strong>Motivo:</strong> {ficha.motivo} <br />
                    <strong>Visto por:</strong> {ficha.vistoPor} <br />
                    <strong>Tratamiento:</strong> {ficha.tratamiento} <br />
                    {ficha.estaEliminada && (
                      <span style={{ color: 'red' }}>
                        <strong>Estado:</strong> Eliminado
                      </span>
                    )}
                  </Col>
                  {tipoUsuario === 'Administrador' && (

                  <Col md={3} className="text-center">
                  <Button variant="danger" onClick={() => handleEliminarFicha(ficha.fichaId)}>
            Eliminar
          </Button>
                  </Col>)
                  }
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Col>
     </Row>
     <ModalVisitaPendiente
       show={modalVisitaShow}
       handleClose={() => setModalVisitaShow(false)}
       agregarVisitaPendiente={agregarVisitaPendiente}
     />
     
     <ModalVacuna
       show={modalVacunaShow}
       handleClose={() => setModalVacunaShow(false)}
       agregarVacuna={agregarVacuna}
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
      agregarProcedimiento={agregarProcedimiento}
    />
    <ModalPlanAsignacion
      show={modalPlanShow}
      onHide={() => setModalPlanShow(false)}
      planes={planesDisponibles}
      asignarPlan={asignarPlan}
    />
  </Container>
);


};

export default PerfilMascota;