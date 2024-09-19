// PerfilMascota.js
import { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap';

const PerfilMascota = () => {
  const [inMemoriam, setInMemoriam] = useState(false);
  const [filtroFecha, setFiltroFecha] = useState({ desde: '', hasta: '' });

  // Información del perfil de la mascota
  const mascota = {
    fotoPerfil: 'url_de_la_foto_de_perfil',
    nombre: 'Firulais',
    dueño: 'Juan Pérez',
    edad: 7,
    tipo: 'Perro',
    raza: 'Golden Retriever',
    castrado: true,
    planAsociado: 'Plan Madurando',
    vacunasPendientes: [
      {
        nombre: 'Refuerzo de Rabia',
        fecha: '15/10/2024',
      },
    ],
    historialVacunas: [
      'Rabia - 01/02/2023',
      'Parvovirus - 01/08/2023',
      'Moquillo - 01/02/2024',
    ],
    historialProcedimientos: [
      {
        fecha: '2023-05-01',
        procedimiento: 'Limpieza dental',
        vistoPor: 'Dr. González',
        tratamiento: 'Limpieza profunda y aplicación de flúor',
        dosificacion: null,
      },
      {
        fecha: '2023-11-01',
        procedimiento: 'Castración',
        vistoPor: 'Dr. Fernández',
        tratamiento: 'Cirugía y postoperatorio con analgésicos',
        dosificacion: 'Analgésicos cada 12 horas por 5 días',
      },
      {
        fecha: '2024-08-01',
        procedimiento: 'Consulta de chequeo general',
        vistoPor: 'Dra. Martínez',
        tratamiento: 'Chequeo físico completo, no se detectaron anomalías',
        dosificacion: null,
      },
    ],
  };

  // Función para marcar a la mascota en "In Memoriam"
  const marcarInMemoriam = () => {
    setInMemoriam(true);
  };

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

  return (
    <Container className="mt-4" fluid>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={mascota.fotoPerfil} alt="Foto de la mascota" />
            <Card.Body>
              <Card.Title>{mascota.nombre}</Card.Title>
              <Card.Text>
                <strong>Dueño:</strong> {mascota.dueño} <br />
                <strong>Edad:</strong> {mascota.edad} años <br />
                <strong>Tipo:</strong> {mascota.tipo} <br />
                <strong>Raza:</strong> {mascota.raza} <br />
                <strong>Castrado:</strong> {mascota.castrado ? 'Sí' : 'No'} <br />
                <strong>Plan Asociado:</strong> {mascota.planAsociado || 'Sin plan asignado'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>Historial de Vacunas</Card.Header>
            <ListGroup variant="flush">
              {mascota.historialVacunas.map((vacuna, index) => (
                <ListGroup.Item key={index}>{vacuna}</ListGroup.Item>
              ))}
            </ListGroup>

            {/* Vacunas Pendientes */}
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

          {/* Filtros de Fecha */}
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

          {/* Historial de Procedimientos con scroll */}
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

          {inMemoriam ? (
            <Card className="text-center">
              <Card.Body>
                <Card.Title>In Memoriam</Card.Title>
                <Card.Text>
                  Esta mascota nos ha dejado, pero siempre será recordada con cariño.
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <Button variant="danger" onClick={marcarInMemoriam}>
              Marcar como
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PerfilMascota;
