import { useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import clienteAxios from '../helpers/axios.config';
import { configHeaders } from '../helpers/extra.config';
import "../css/contacto_sucursales.css";
import "../css/inicio.css";
import CardPlan from '../components/Cards/CardPlan';
import FormularioContactoPorPlan from '../components/ModalesFormularios/FormularioContactoPorPlan';
import { planes } from '../helpers/variables';
import { validarEmail, validarMensaje, validarNombre, validarNumero, validarCantidadCaracteres, validarSoloLetrasSinSimbolos } from '../helpers/funcionesUtiles';

const PlanesDeSuscripcion = () => {
  const formLimpio = {
    nombre: '',
    email: '',
    numero: '',
    mensaje: '',
    plan: '',
  };
  const [formData, setFormData] = useState(formLimpio);
  const [formErrors, setFormErrors] = useState({}); 
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
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
    const isNombreSoloLetras = validarSoloLetrasSinSimbolos(formData.nombre, 'nombre', setFormErrors);
    const isNombreRangoValido = validarCantidadCaracteres(formData.nombre, 'nombre', 4, 25, setFormErrors);
    const isNombreValido = isNombreSoloLetras && isNombreRangoValido;
  
    const isEmailValido = validarEmail(formData.email, setFormErrors);
    const isNumeroValido = validarNumero(formData.numero, setFormErrors);
    const isMensajeValido = validarCantidadCaracteres(formData.mensaje, 'mensaje', 10, 230, setFormErrors);
  
    if (!formData.plan) {
      setFormErrors(prev => ({ ...prev, plan: 'Debe seleccionar un plan de suscripción.' }));
    }  
    return isNombreValido && isEmailValido && isNumeroValido && isMensajeValido && !!formData.plan;
  };
  

  const envioMail = async () => {
    if (!validarFormulario()) {
      return;
    }
  
    setLoading(true); 
  
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
      setLoading(false); 
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
              <p>Enviando...</p> 
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
