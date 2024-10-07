import { useState } from 'react';
import { Container, Row,} from 'react-bootstrap';
import clienteAxios from '../helpers/axios.config';
import { configHeaders } from '../helpers/extra.config';
import "../css/contacto_sucursales.css";
import "../css/inicio.css";
import CardPlan from '../components/Cards/CardPlan';
import FormularioContactoPorPlan from '../components/ModalesFormularios/FormularioContactoPorPlan';

const PlanesDeSuscripcion = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    numero: '',
    mensaje: '',
    plan: '',
  });

  const planes = [
    {
      id: 'primeros-pasos',
      nombre: 'Plan Primeros Pasos',
      edad: '0-5 años',
      descripcion: 'Este plan está diseñado para cachorros y mascotas jóvenes. Incluye vacunas básicas, chequeos regulares y consejos para su desarrollo.',
    },
    {
      id: 'madurando',
      nombre: 'Plan Madurando',
      edad: '5-10 años',
      descripcion: 'Para mascotas en la etapa media de su vida, este plan incluye chequeos más frecuentes, vacunas y tratamientos preventivos.',
    },
    {
      id: 'adultos',
      nombre: 'Plan Adultos',
      edad: 'más de 10 años',
      descripcion: 'Este plan es ideal para mascotas mayores. Ofrece chequeos geriátricos, pruebas de salud y atención especializada.',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePlanSelect = (planId) => {
    const selectedPlan = planes.find((plan) => plan.id === planId);
    setFormData((prevData) => ({
      ...prevData,
      plan: selectedPlan.nombre,
    }));
  };

  const envioMail = async () => {
    const { nombre, email, numero, mensaje, plan } = formData;

    if (!nombre || !email || !numero || !mensaje || !plan) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    try {
      await clienteAxios.post(
        '/mensajes/pedido-plan',
        formData,
        configHeaders
      );
      alert('Formulario enviado correctamente.');
      setFormData({
        nombre: '',
        email: '',
        numero: '',
        mensaje: '',
        plan: '',
      });
    } catch (error) {
      alert('Hubo un error al enviar el formulario. Por favor, inténtalo nuevamente.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    envioMail();
  };

  return (
    <Container>
      <h2 className='text-center' style={{ padding: '10px' }}>Planes de Suscripción para Mascotas</h2>
      <Row className="mb-4">
        {planes.map((plan) => (
          <CardPlan key={plan.id } plan={plan} handlePlanSelect={handlePlanSelect} />
        ))}
      </Row>

      {formData.plan && (
        <FormularioContactoPorPlan handleSubmit={handleSubmit} handleChange={handleChange } formData={formData}/>
      )}
    </Container>
  );
};

export default PlanesDeSuscripcion;
