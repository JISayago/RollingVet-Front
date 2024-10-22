import React from 'react'
import { Button, Col, ListGroup, Row } from 'react-bootstrap'
import { convertAFormatoFecha} from '../../helpers/funcionesUtiles';
import { ROL_ADMIN } from '../../helpers/variables';

function ListaProximosProcedimientos({ index, procedimiento, tipoUsuario }) {
  return (
    <ListGroup.Item key={index}>
    <Row className="align-items-center">
    <Col md={9}>
    <strong>{procedimiento.detalle}</strong> - {convertAFormatoFecha(procedimiento.fecha)}
    </Col>
    {tipoUsuario === ROL_ADMIN && (
      <Col md={3} className="text-end">
      <Button
       variant="danger" onClick={() => console.log('Eliminar')}>
      Eliminar
      </Button>
      </Col>)}
      </Row>
      </ListGroup.Item>
  )
}

export default ListaProximosProcedimientos