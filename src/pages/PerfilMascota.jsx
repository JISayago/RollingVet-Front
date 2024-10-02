import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import clienteAxios from '../helpers/axios.config';
import ModalConsulta from '../components/ModalConsulta';
import ModalVacunaRegistro from '../components/ModalVacunaRegistro'
import ModalPlanAsignacion from '../components/ModalPlanAsignacion';
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
  const [inMemoriam, setInMemoriam] = useState(false);
  const [nuevoProcedimiento, setNuevoProcedimiento] = useState({
    fecha: '',
    motivo: '',
    vistoPor: '',
    tratamiento: '',
  });
  const [modalVacunaShow, setModalVacunaShow] = useState(false); // Estado para manejar el modal de vacuna
  const [modalShow, setModalShow] = useState(false); // Estado para manejar el modal
  const [modalPlanShow, setModalPlanShow] = useState(false); // Estado para manejar el modal de planes
  const [planSeleccionado, setPlanSeleccionado] = useState(''); // Estado para manejar el plan seleccionado
  const [fichasVeterinarias, setFichasVeterinarias] = useState([]);
  const [historialVacunas, setHistorialVacunas] = useState([ "Vacuna contra la rabia - 12/03/2023",
    "Vacuna parvovirus - 15/05/2023",
    "Vacuna moquillo - 20/07/2023",
    "Vacuna leptospirosis - 10/09/2023"]);
  
  // Función para asignar el plan seleccionado
  const asignarPlan = (plan) => {
    mascota.planAsociado = plan; // Asignar el plan seleccionado
    setPlanSeleccionado(plan); // Actualizar el estado del plan seleccionado
    setModalPlanShow(false); // Cerrar el modal
  };

  function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
  
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
  
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
  
    return edad;
  }

  // Función para marcar a la mascota en "In Memoriam"
  const marcarInMemoriam = () => {
    setInMemoriam(true);
  };

  const cargarMascota = async () => {
    const mascotaBD = await clienteAxios.get(`/mascotas/${params.id}`)
    setMascota(mascotaBD.data);
    setFichasVeterinarias(mascotaBD.data.fichas)
    console.log("masbd", mascotaBD)
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setTipoUsuario(JSON.parse(sessionStorage.getItem('rol')));
    }
    cargarMascota();
  }, [fichasVeterinarias]);


  const agregarProcedimiento = async (e) => {
    e.preventDefault();
    try {
      const result = await clienteAxios.post(
        `/fichas/${mascota._id}`,
        nuevoProcedimiento,
        configHeaders
      );
  
      // Add the new entry to the existing list of "fichasVeterinarias"
      setFichasVeterinarias([...fichasVeterinarias, result.data]);
      
      alert("Sucursal Agregada con éxito!");
  
      // Optionally reset the form input
      setNuevoProcedimiento({}); // Reset the input fields if needed
  
      // Close the modal
      setModalShow(false);
    } catch (error) {
      console.error('Error al guardar la sucursal:', error);
      alert("Error al guardar la sucursal. Inténtelo de nuevo.");
    }
  };
  

  const agregarVacuna = (nuevaVacuna) => {
    // Aquí podrías agregar la lógica para guardar la nueva vacuna
    historialVacunas.push(nuevaVacuna); // Solo para el ejemplo, modifica según tu lógica real
    console.log('Nueva Vacuna:', nuevaVacuna);
  };
  return (
    <Container className="mt-4" fluid>
      <Row>
        {/* Tarjeta de la Mascota (arriba izquierda) */}
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={mascota.fotoPerfil} alt="Foto de la mascota" />
            <Card.Body>
              <Card.Title>{mascota.nombre}</Card.Title>
              <Card.Text>
                <strong>Dueño:</strong> {mascota.duenioNombre} <br />
                <strong>Edad:</strong> {`${calcularEdad(mascota.fechaNacimiento)} años.`} <br />
                <strong>Tipo:</strong> {mascota.tipoDeMascota} <br />
                <strong>Raza:</strong> {mascota.raza} <br />
                <strong>Castrado:</strong> {mascota.castrado ? 'Sí' : 'No'} <br />
                <strong>Plan Asociado:</strong> {mascota.plan || 'Sin plan asignado'}
              </Card.Text>
            </Card.Body>
          </Card>

          {/* Botones debajo de la tarjeta de la mascota */}
          {tipoUsuario === 'Administrador' && (
            <div className="mt-3">
              <Button variant="primary" onClick={() => setModalShow(true)} className="me-2">
                Agregar Consulta
              </Button>
              <Button variant="success" onClick={() => setModalPlanShow(true)} className="me-2">
                Asignar Plan
              </Button>
              <Button variant="danger" onClick={marcarInMemoriam} className="me-2">
                Eliminar
              </Button>
              <Button variant="info" onClick={() => setModalVacunaShow(true)} className="me-2">
                Agregar Vacuna
              </Button>
            </div>
          )}
        </Col>

        {/* Historial de Vacunas (arriba derecha) */}
        <Col md={6} className="justify-content-center">
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