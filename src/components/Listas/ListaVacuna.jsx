import React from 'react'
import { Button, Col, ListGroup, Row } from 'react-bootstrap'
import { ROL_ADMIN } from '../../helpers/variables'
import { convertAFormatoFecha} from '../../helpers/funcionesUtiles';

function ListaVacuna({vacuna,index, tipoUsuario }) {
  return (
    <ListGroup.Item key={index}>
    <Row className="align-items-center">
    <Col md={9}>
    <strong>{`${convertAFormatoFecha(vacuna.fecha)} - ${vacuna.nombre}`}</strong>
    </Col>
    {tipoUsuario === ROL_ADMIN && (
      <Col md={3} className="text-end">
      <Button variant="danger" onClick={() => console.log('Eliminar')}>
      Eliminar
      </Button>
      </Col>)}
      </Row>
      </ListGroup.Item>
  )
}

export default ListaVacuna