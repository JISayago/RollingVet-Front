import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Form} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import clienteAxios from '../helpers/axios.config';
import ModalConsulta from '../components/ModalesFormularios/ModalConsulta';
import ModalVacunaRegistro from '../components/ModalesFormularios/ModalVacunaRegistro'
import ModalPlanAsignacion from '../components/ModalesFormularios/ModalPlanAsignacion';
import { configHeaders } from '../helpers/extra.config';

const PerfilMascota = () => {

  const planesDisponibles = [
    'Plan Básico',
    'Plan Avanzado',
    'Plan Premium',
  ];
  const params = useParams();
  const [mascota, setMascota] = useState({});
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [nuevoProcedimiento, setNuevoProcedimiento] = useState({
    fecha: '',
    motivo: '',
    vistoPor: '',
    tratamiento: '',
  });
  const [modalVacunaShow, setModalVacunaShow] = useState(false); 
  const [modalShow, setModalShow] = useState(false); 
  const [modalPlanShow, setModalPlanShow] = useState(false); 
  const [planSeleccionado, setPlanSeleccionado] = useState(''); 
  const [fichasVeterinarias, setFichasVeterinarias] = useState([]);
  const [historialVacunas, setHistorialVacunas] = useState(["Vacuna contra la rabia - 12/03/2023",
    "Vacuna parvovirus - 15/05/2023",
    "Vacuna moquillo - 20/07/2023",
    "Vacuna leptospirosis - 10/09/2023"]);
    const [imagen, setImagen] = useState(null);
    
  const asignarPlan = (plan) => {
    mascota.planAsociado = plan; 
    setPlanSeleccionado(plan); 
    setModalPlanShow(false); 
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
  const agregarVacuna = (nuevaVacuna) => {
    historialVacunas.push(nuevaVacuna);
  };

  const handleEliminarMascota = () => {
   
 }



  return (
    <Container className="mt-4" fluid>

{tipoUsuario === 'Administrador' && (
  <Container className="m-3">
    <div className="d-flex justify-content-center">
      <Button variant="primary" onClick={() => setModalShow(true)} className="me-2">
        Agregar Consulta
      </Button>
      <Button variant="success" onClick={() => setModalPlanShow(true)} className="me-2">
        Asignar Plan
      </Button>
      <Button variant="danger" onClick={handleEliminarMascota} className="me-2">
        Eliminar
      </Button>
      <Button variant="info" onClick={() => setModalVacunaShow(true)} className="me-2">
        Agregar Vacuna
      </Button>
    </div>
  </Container>
)}

<Row className="justify-content-center"> 
  <Col md={6} className="d-flex justify-content-center"> 
  <Card style={{ width: '50%',display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
  <Card.Img variant="top" src={mascota.imagen} alt="Foto de la mascota" style={{width: '200px',   height: 'auto', maxHeight: '150px', objectFit: 'contain' }} 
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
    )}
  </Card.Body>
</Card>

  </Col>

  <Col md={6} className="d-flex justify-content-center"> 
    <Card className="mb-4 mx-auto w-75" style={{ maxWidth: '600px' }}>
      <Card.Header>Historial de Vacunas</Card.Header>
      <ListGroup
        variant="flush"
        style={{
          maxHeight: '250px',
          overflowY: 'auto',
        }}
      >
        {historialVacunas.map((vacuna, index) => (
          <ListGroup.Item key={index}>
            <Row className="align-items-center">
              <Col md={9}>
                <strong>{vacuna}</strong>
              </Col>
              <Col md={3} className="text-end">
                <Button variant="danger" onClick={() => console.log("Eliminar")}>
                  Eliminar
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  </Col>
</Row>


      <Row>
        <Col md={12} className="justify-content-center">
          <Card className="mb-4 mx-auto w-75" style={{ maxWidth: '600px' }}>
            <Card.Header>Historial de Procedimientos</Card.Header>
            <ListGroup
              variant="flush"
              style={{
                maxHeight: '250px',
                overflowY: 'auto',
              }}
            >
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
                    <Col md={3} className="text-center">
                      <Button variant="danger" onClick={() => console.log("Eliminar")}>
                        Eliminar
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {/* Modales */}
      <ModalConsulta
        show={modalShow}
        onHide={() => setModalShow(false)}
        nuevoProcedimiento={nuevoProcedimiento}
        setNuevoProcedimiento={setNuevoProcedimiento}
        agregarProcedimiento={agregarProcedimiento}
      />
      <ModalVacunaRegistro
        show={modalVacunaShow}
        onHide={() => setModalVacunaShow(false)}
        agregarVacuna={agregarVacuna}
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