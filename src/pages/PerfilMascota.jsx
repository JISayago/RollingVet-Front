import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Form, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import clienteAxios from '../helpers/axios.config';

const PerfilMascota = () => {
  const params = useParams();
  const [mascota, setMascota] = useState({});
  const [inMemoriam, setInMemoriam] = useState(false);
  const [filtroFecha, setFiltroFecha] = useState({ desde: '', hasta: '' });
  const [nuevoProcedimiento, setNuevoProcedimiento] = useState({
    fecha: '',
    procedimiento: '',
    vistoPor: '',
    tratamiento: '',
    dosificacion: '',
  });
  const [modalShow, setModalShow] = useState(false); // Estado para manejar el modal
  const [modalPlanShow, setModalPlanShow] = useState(false); // Estado para manejar el modal de planes
  const [planSeleccionado, setPlanSeleccionado] = useState(''); // Estado para manejar el plan seleccionado

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
    console.log("masbd", mascotaBD)
  }

  const [tipoUsuario, setTipoUsuario] = useState('');
  useEffect(() => {
    console.log("params id",params)
    if (sessionStorage.getItem('token')) {
      setTipoUsuario(JSON.parse(sessionStorage.getItem('rol')));
    }
    cargarMascota();
  }, []);

  // Filtrar procedimientos por fecha
  const filtrarProcedimientos = () => {
    const { desde, hasta } = filtroFecha;
    const desdeFecha = new Date(desde);
    const hastaFecha = new Date(hasta);

    return mascota.historialProcedimientos.filter((proc) => {
      const fechaProc = new Date(proc.fecha);
      if (desde && hasta) {
        return fechaProc >= desdeFecha && fechaProc <= hastaFecha;
      } else if (desde) {
        return fechaProc >= desdeFecha;
      } else if (hasta) {
        return fechaProc <= hastaFecha;
      }
      return true;
    });
  };

  // Manejar el envío del formulario para agregar un procedimiento
  const agregarProcedimiento = (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para guardar el nuevo procedimiento
    console.log('Nuevo Procedimiento:', nuevoProcedimiento);
    // Reiniciar el formulario
    setNuevoProcedimiento({ fecha: '', procedimiento: '', vistoPor: '', tratamiento: '', dosificacion: '' });
    setModalShow(false); // Cerrar el modal
  };

  // Función para asignar el plan seleccionado
  const asignarPlan = () => {
    mascota.planAsociado = planSeleccionado; // Asignar el plan seleccionado
    setModalPlanShow(false); // Cerrar el modal
  };

  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col md={4}>
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
          
          <Row>

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
            </div>
          )}
           
          </Row>
        </Col>
  {/*
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>Historial de Vacunas</Card.Header>
            <ListGroup variant="flush">
              {mascota.historialVacunas.map((vacuna, index) => (
                <ListGroup.Item key={index}>{vacuna}</ListGroup.Item>
              ))}
            </ListGroup>
  
            
            {mascota.vacunasPendientes.length > 0 && (
              <Card.Footer className="text-danger">
                <strong>Vacunas Pendientes:</strong>
                <ul>
                  {mascota.vacunasPendientes.map((vacuna, index) => (
                    <li key={index}>
                      {vacuna.nombre} - Fecha estimada: {vacuna.fecha}
                    </li>
                  ))}
                </ul>
              </Card.Footer>
            )}
          </Card>
  
          
          <Form className="mb-3">
            <Row>
              <Col md={6}>
                <Form.Group controlId="desdeFecha">
                  <Form.Label>Desde:</Form.Label>
                  <Form.Control
                    type="date"
                    value={filtroFecha.desde}
                    onChange={(e) =>
                      setFiltroFecha({ ...filtroFecha, desde: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="hastaFecha">
                  <Form.Label>Hasta:</Form.Label>
                  <Form.Control
                    type="date"
                    value={filtroFecha.hasta}
                    onChange={(e) =>
                      setFiltroFecha({ ...filtroFecha, hasta: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
  
       
          <Card className="mb-4" style={{ width: '100%' }}>
            <Card.Header>Historial de Procedimientos</Card.Header>
            <ListGroup
              variant="flush"
              style={{
                maxHeight: '250px', // Limitar la altura
                overflowY: 'auto',  // Habilitar scroll
              }}
            >
              {filtrarProcedimientos().map((proc, index) => (
                <ListGroup.Item key={index}>
                  <strong>Fecha:</strong> {proc.fecha} <br />
                  <strong>Procedimiento:</strong> {proc.procedimiento} <br />
                  <strong>Visto por:</strong> {proc.vistoPor} <br />
                  <strong>Tratamiento:</strong> {proc.tratamiento} <br />
                  {proc.dosificacion && (
                    <span style={{ color: 'orange' }}>
                      <strong>Dosificación:</strong> {proc.dosificacion}
                    </span>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
  */}
          <Col>
          <Modal show={modalShow} onHide={() => setModalShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Agregar Procedimiento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={agregarProcedimiento}>
                <Form.Group controlId="fecha">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    value={nuevoProcedimiento.fecha}
                    onChange={(e) => setNuevoProcedimiento({ ...nuevoProcedimiento, fecha: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="procedimiento">
                  <Form.Label>Procedimiento</Form.Label>
                  <Form.Control
                    type="text"
                    value={nuevoProcedimiento.procedimiento}
                    onChange={(e) => setNuevoProcedimiento({ ...nuevoProcedimiento, procedimiento: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="vistoPor">
                  <Form.Label>Visto por</Form.Label>
                  <Form.Control
                    type="text"
                    value={nuevoProcedimiento.vistoPor}
                    onChange={(e) => setNuevoProcedimiento({ ...nuevoProcedimiento, vistoPor: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="tratamiento">
                  <Form.Label>Tratamiento</Form.Label>
                  <Form.Control
                    type="text"
                    value={nuevoProcedimiento.tratamiento}
                    onChange={(e) => setNuevoProcedimiento({ ...nuevoProcedimiento, tratamiento: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="dosificacion">
                  <Form.Label>Dosificación (opcional)</Form.Label>
                  <Form.Control
                    type="text"
                    value={nuevoProcedimiento.dosificacion}
                    onChange={(e) => setNuevoProcedimiento({ ...nuevoProcedimiento, dosificacion: e.target.value })}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Agregar
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
  
         
          <Modal show={modalPlanShow} onHide={() => setModalPlanShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Seleccionar Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Selecciona un plan:</Form.Label>
                  <Form.Control
                    as="select"
                    value={planSeleccionado}
                    onChange={(e) => setPlanSeleccionado(e.target.value)}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Plan Básico">Plan Básico</option>
                    <option value="Plan Avanzado">Plan Avanzado</option>
                    <option value="Plan Premium">Plan Premium</option>
                    <option value="Plan Madurando">Plan Madurando</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="success" onClick={asignarPlan}>
                  Asignar Plan
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
  
  
};

export default PerfilMascota;
