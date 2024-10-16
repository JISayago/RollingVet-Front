import { Card, Col, Container, Row } from "react-bootstrap";
import BotonesGrupo from "../components/General/BotonesGrupo";
import '../css/inicio.css'
import CardPresentacionInicio from "../components/Cards/CardPresentacionInicio";
import { inicioData } from "../helpers/variables";

function Inicio() {
 
  return (
    <Container fluid className="flex-grow-1">
       <BotonesGrupo/>
      <Container className="py-5">
        <Row>
          {inicioData.map((card, index) => (
            <CardPresentacionInicio key={index} card={card} index={index} />
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Inicio;
