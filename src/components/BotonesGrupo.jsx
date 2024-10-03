import { Col, Container, Row } from "react-bootstrap"
import ButtonOption from "./ButtonOption"

function BotonesGrupo() {
  return (
<Container fluid className="py-4">
  <Row className="text-center justify-content-center">
    {/* <Col md={3} className="mb-4">
      <ButtonOption route="nuestros_especialistas" text="Nuestros Especialistas" />
    </Col> */}
    <Col md={3} className="mb-4">
      <ButtonOption route="planes" text="Planes disponibles para mascotas" />
    </Col>
    <Col md={3} className="mb-4">
      <ButtonOption route="turnos" text="Sacar Turno" />
    </Col>
    <Col md={3} className="mb-4">
      <ButtonOption route="contacto" text="Sucursales" />
    </Col>
  </Row>
</Container>

  
  )
}

export default BotonesGrupo