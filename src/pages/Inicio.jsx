import { Card, Col, Container, Row } from "react-bootstrap";
import BotonesGrupo from "../components/BotonesGrupo";
import '../css/inicio.css'
import CardPresentacionInicio from "../components/CardPresentacionInicio";

function Inicio() {
  const cardData = [
    {
      logo: 'https://veterinariabulevar.com/wp-content/uploads/2019/08/hospitalizacion-dia-70x70.png',
      title: 'Consultas a Domicilio',
      description: 'Brindamos atención veterinaria a domicilio, donde tu mascota recibe cuidados en la comodidad de su hogar. Nuestro equipo de profesionales se encarga de chequeos, vacunaciones y tratamientos.'
    },
    {
      logo: 'https://veterinariabulevar.com/wp-content/uploads/2019/08/medicina-general-70x70.png',  // Reemplaza con la URL de tu logo
      title: 'Medicina General',
      description: 'Ofrecemos servicios de medicina general veterinaria para garantizar la salud y el bienestar de tus mascotas. Nuestro equipo de veterinarios está capacitado para realizar chequeos, diagnósticos y tratamientos para diversas condiciones.'
    },
    {
      logo: 'https://veterinariabulevar.com/wp-content/uploads/2019/08/medicina-interna-70x70.png',
      title: 'Cirugías',
      description: 'Realizamos cirugías veterinarias con altos estándares de calidad y seguridad. Nuestro equipo de expertos está preparado para llevar a cabo procedimientos quirúrgicos con el máximo cuidado, asegurando el bienestar de tus mascotas durante todo el proceso. ¡Confía en nosotros para brindarles la atención que necesitan!'
    },
    {
      logo: 'https://veterinariabulevar.com/wp-content/uploads/2019/08/cirugia-general-70x70.png',
      title: 'Esquema Vacunatorio',
      description: 'Ofrecemos un completo esquema vacunatorio para garantizar la salud de tus mascotas. Nos aseguramos de que estén al día con sus vacunas para prevenir enfermedades y promover su bienestar.'
    },
    {
      logo: 'https://veterinariabulevar.com/wp-content/uploads/2019/08/medicina-preventiva-70x70.png',
      title: 'Servicio de Emergencias 24hs',
      description: 'Brindamos atención de emergencias las 24 horas, asegurando que tu mascota reciba la ayuda necesaria en cualquier momento. Nuestro equipo de veterinarios está disponible para actuar rápidamente ante cualquier situación crítica. ¡Estamos aquí para cuidar de ellos cuando más lo necesitan!'
    },
    {
      logo: 'https://veterinariabulevar.com/wp-content/uploads/2019/08/diagnostico-70x70.png',
      title: 'Historial de Visitas',
      description: 'Contamos con un historial de visitas para cada mascota, lo que nos permite realizar un seguimiento integral de su salud. Este registro nos ayuda a ofrecer un mejor servicio y atención personalizada, asegurando que cada visita sea efectiva y completa.'
    },
  ];

  return (
    <Container fluid className="flex-grow-1">
       <BotonesGrupo/>
      <Container className="py-5">
        <Row>
          {cardData.map((card, index) => (
            <CardPresentacionInicio key={index} card={card} index={index} />
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Inicio;
