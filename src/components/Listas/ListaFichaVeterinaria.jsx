import React from 'react'
import { Button, Col, ListGroup, Row } from 'react-bootstrap'
import { convertAFormatoFecha} from '../../helpers/funcionesUtiles';
import { ROL_ADMIN } from '../../helpers/variables';

function ListaFichaVeterinaria({index, ficha, tipoUsuario,handleEliminarFicha }) {
  return (
    <ListGroup.Item key={index}>
    <Row className="align-items-center">
    <Col
     md={9}>
    <strong>Fecha:</strong> {convertAFormatoFecha(ficha.fecha)} <br />
    <strong>Motivo:</strong> {ficha.motivo} <br />
    <strong>Visto por:</strong> {ficha.vistoPor} <br />
    <strong>Tratamiento:</strong> {ficha.tratamiento} <br />
    {ficha.estaEliminada && (
      <span style={{ color: 'red' }}>
      <strong>Estado:</strong> Eliminado
      </span>
    )}
    </Col>
    {tipoUsuario === ROL_ADMIN && (
      
      <Col md={3} className="text-center">
      <Button variant="danger" onClick={() => handleEliminarFicha(ficha.fichaId)}>
      Eliminar
      </Button>
      </Col>)
    }
    </Row>
    </ListGroup.Item>
  )
}

export default ListaFichaVeterinaria