import { useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import clienteAxios from '../helpers/axios.config';
import { configHeaders } from '../helpers/extra.config';
import "../css/contacto_sucursales.css";
import "../css/inicio.css";
import CardPlan from '../components/Cards/CardPlan';
import FormularioContactoPorPlan from '../components/ModalesFormularios/FormularioContactoPorPlan';
import { planes } from '../helpers/variables';
import { validarEmail, validarMensaje, validarNombre, validarNumero } from '../helpers/funcionesUtiles';

const PlanesDeSuscripcion = () => {
  const formLimpio = {
    nombre: '',
    email: '',
    numero: '',
    mensaje: '',
    plan: '',
  };
  const [formData, setFormData] = useState(formLimpio);
  const [formErrors, setFormErrors] = useState({}); // Manejo de errores
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Limpiamos el error del campo al cambiar
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePlanSelect = (planId) => {
    const selectedPlan = planes.find((plan) => plan.id === planId);
    setFormData((prevData) => ({
      ...prevData,
      plan: selectedPlan.nombre,
    }));
  };

  const validarFormulario = () => {
    const isNombreValido = validarNombre(formData.nombre, setFormErrors);
    const isEmailValido = validarEmail(formData.email, setFormErrors);
    const isNumeroValido = validarNumero(formData.numero, setFormErrors);
    const isMensajeValido = validarMensaje(formData.mensaje, setFormErrors);
    
    if (!formData.plan) {
      setFormErrors(prev => ({ ...prev, plan: 'Debe seleccionar un plan de suscripción.' }));
    }

    // Retornamos verdadero solo si todas las validaciones son válidas
    return isNombreValido && isEmailValido && isNumeroValido && isMensajeValido && !!formData.plan;
  };

  const envioMail = async () => {
    if (!validarFormulario()) {
      return;
    }
  
    setLoading(true); // Inicia el loading
  
    try {
      await clienteAxios.post(
        '/mensajes/pedido-plan',
        formData,
        configHeaders
      );
      alert('Formulario enviado correctamente.');
      setFormData(formLimpio);
    } catch (error) {
      alert('Hubo un error al enviar el formulario. Por favor, inténtalo nuevamente.');
    } finally {
      setLoading(false); // Detiene el loading
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
        <>
          {loading ? (
            <div className="text-center">
              <p>Enviando...</p> {/* Mensaje simple */}
              {/* Puedes usar un spinner de react-bootstrap si lo prefieres */}
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
              <FormularioContactoPorPlan handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} errores={ formErrors} />
          )}
        </>
      )}
    </Container>
  );
};

export default PlanesDeSuscripcion;
