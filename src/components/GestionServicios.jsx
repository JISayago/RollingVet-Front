// GestionServicios.js
import { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import ModalServicioRegistro from '../components/ModalServicioRegistro'; // Asegúrate de la ruta correcta
import clienteAxios from '../helpers/axios.config';
import { configHeaders } from '../helpers/extra.config';

const GestionServicios = () => {
  const [servicios, setServicios] = useState([]);
 
  const [showModal, setShowModal] = useState(false);
  const [nuevoServicio, setNuevoServicio] = useState({ _id: null, nombre: '', descripcion: '' });


  const cargarServicios = async() => {
    const serviciosBD = await clienteAxios.get('/servicios');
    setServicios(serviciosBD.data);
  }

  const handleShowModal = (service = { _id: null, nombre: '', descripcion: '' }) => {
    setNuevoServicio(service);
    setShowModal(true);
  };

  const handleGuardarServicio = async () => {
    try {
      if (nuevoServicio._id) {
        // Edición de servicio existente
        const result = await clienteAxios.put(
          `/servicios/${nuevoServicio._id}`, // Asegúrate de que esta URL sea la correcta para tu API
          nuevoServicio,
          configHeaders // Asegúrate de que esto esté definido
        );
        setServicios(servicios.map(s => s._id === nuevoServicio._id ? result.data : s));
        alert("Servicio Editado con éxito!");
      } else {
        // Creación de nuevo servicio
        const result = await clienteAxios.post(
          '/servicios',
          nuevoServicio,
          configHeaders // Asegúrate de que esto esté definido
        );
        setServicios([...servicios, result.data]);
        alert("Servicio Agregado con éxito!");
      }
      
      setShowModal(false);
    } catch (error) {
      console.error('Error al guardar el servicio:', error);
      alert("Error al guardar el servicio. Inténtelo de nuevo.");
    }
  };
  

  const handleEliminarServicio = async (id) => {
    if (confirm("Está por eliminar definitivamente un Servicio. ¿Está seguro?")) {
      try {
        await clienteAxios.delete(
          `/servicios/${id}`,
          configHeaders);
      
        setServicios(servicios.filter(s => s._id !== id));

        alert("Servicio eliminado con éxito!");
      } catch (error) {
        console.error('Error al eliminar el Servicio:', error);
        alert("Error al eliminar el Servicio. Inténtelo de nuevo.");
      }
    }
  };

  useEffect(() => { 
   cargarServicios()
  },[servicios])

  return (
    <Container>
      <h2 className="my-4">Gestión de Servicios</h2>
      <Button variant="primary" onClick={() => handleShowModal()}>Agregar Servicio</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((s) => (
            <tr key={s._id}>
              <td>{s.nombre}</td>
              <td>{s.descripcion}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowModal(s)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleEliminarServicio(s._id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar/editar servicios */}
      <ModalServicioRegistro 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        nuevoServicio={nuevoServicio} 
        setNuevoServicio={setNuevoServicio} 
        handleGuardarServicio={handleGuardarServicio} 
      />
    </Container>
  );
};

export default GestionServicios;
