import { Button, Card, Col, Row } from 'react-bootstrap'

function CardPlan({plan,handlePlanSelect }) {
  return (
      <Col md={4} key={plan.id} className="mb-3 d-flex align-items-stretch">
        <Card className="w-100">
          <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            <Card.Title className="text-center">{plan.nombre}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted text-center">Edad: {plan.edad}</Card.Subtitle>
            <Card.Text className="text-center">{plan.descripcion}</Card.Text>
            <Button variant="primary" className='contacto-form-boton' onClick={() => handlePlanSelect(plan.id)}>
              Más Información
            </Button>
          </Card.Body>
        </Card>
      </Col>
  )
}

export default CardPlan