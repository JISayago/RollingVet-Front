import { useState } from 'react';
import { Container, Row, Col, Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import clienteAxios from '../helpers/axios.config';
import "../css/contacto_sucursales.css";

import { configHeaders } from '../helpers/extra.config';
import ForumularioConsultaSucursales from '../components/ModalesFormularios/ForumularioConsultaSucursales';
import CardSucursalConsulta from '../components/Cards/CardSucursalConsulta';
import { validarCamposVacios, validarCantidadCaracteres, validarEmail, validarMensaje } from '../helpers/funcionesUtiles';

const Contacto = () => {
  const [sucursales, setSucursales] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    asunto: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const envioMail = async () => {
    setLoading(true); 
    try {
      const result = await clienteAxios.post(
        '/mensajes/contacto',
        formData,
        configHeaders
      );
      alert("Mensaje enviado correctamente!");
      setFormData({
        email: '',
        asunto: '',
        mensaje: '',
      });
    } catch (error) {
      alert("Error al enviar el mensaje. Inténtelo de nuevo.");
    } finally {
      setLoading(false); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});
    const validarCVacios = validarCamposVacios(formData, setFormErrors);
    if (validarCVacios) {
      const isEmailValido = validarEmail(formData.email, setFormErrors);
      const isMensajeValido = validarMensaje(formData.mensaje, setFormErrors)
      && validarCantidadCaracteres(formData.mensaje, 'mensaje',10, 230, setFormErrors); 
      if (isEmailValido && isMensajeValido) {
        envioMail();
      }
    }
  };
  

  const obtenerSucursales = async () => {
    const sucursalesBD = await clienteAxios.get("/sucursales");
    setSucursales(sucursalesBD.data);
  };

  useState(() => {
    obtenerSucursales();
  }, []);

  return (
    <Container fluid style={{ padding: '2rem' }}>
      <Row>
        <Col xs={12} className="mt-4">
          <h2 className="text-center">Sucursales</h2>
          <Row className="justify-content-center">
            {sucursales.map(sucursal => (
              <CardSucursalConsulta key={sucursal._id } sucursal={sucursal}/>
            ))}
          </Row>
        </Col>

        <Col xs={12} md={8} lg={6} className="mx-auto mb-4">
        <>
          {loading ? (
            <div className="text-center">
              <p>Enviando...</p> 
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
          <ForumularioConsultaSucursales handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} formErrors={formErrors} />
          )}
        </>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;
