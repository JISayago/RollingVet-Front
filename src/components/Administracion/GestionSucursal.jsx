import { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import clienteAxios from '../../helpers/axios.config';
import ModalSucursalRegistro from '../ModalesFormularios/ModalSucursalRegistro';
import { configHeaders } from '../../helpers/extra.config';

const GestionSucursal = () => {
  const [sucursales, setSucursales] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevaSucursal, setNuevaSucursal] = useState({ _id: null, nombre: '', direccion: '', numeroContacto: '', correo: '', atiendeEmergencias24H: false });

  const cargarSucursales = async () => {
    const sucursalesBD = await clienteAxios.get('/sucursales');
    setSucursales(sucursalesBD.data);
  };

  const handleShowModal = (sucursal = { _id: null, nombre: '', direccion: '', numeroContacto: '', correo: '', atiendeEmergencias24H: false }) => {
    setNuevaSucursal(sucursal);
    setShowModal(true);
  };

  const handleGuardarSucursal = async () => {
    try {
      if (nuevaSucursal._id) {
        const result = await clienteAxios.put(
          `/sucursales/${nuevaSucursal._id}`,
          nuevaSucursal,
          configHeaders
        );
        setSucursales(sucursales.map(s => s._id === nuevaSucursal._id ? result.data : s));
        alert("Sucursal Editada con éxito!");
      } else {
        const result = await clienteAxios.post(
          '/sucursales',
          nuevaSucursal,
          configHeaders
        );
        setSucursales([...sucursales, result.data]);
        alert("Sucursal Agregada con éxito!");
      }
  
      setShowModal(false);
    } catch (error) {
      alert("Error al guardar la sucursal. Inténtelo de nuevo.");
    }
  };
  
  const handleEliminarSucursal = async (id) => {
    if (confirm("Está por eliminar definitivamente una sucursal. ¿Está seguro?")) {
      try {
        await clienteAxios.delete(
          `/sucursales/${id}`,
          configHeaders);
      
        setSucursales(sucursales.filter(s => s._id !== id));

        alert("Sucursal eliminada con éxito!");
      } catch (error) {
        alert("Error al eliminar la sucursal. Inténtelo de nuevo.");
      }
    }
  };
  

  useEffect(() => {
    cargarSucursales();
  }, [sucursales]);

  return (
    <Container fluid className="p-3">
      <h2 className="text-center">Gestión de Sucursales</h2>
      <div className="d-flex justify-content-center mb-3">
        <Button variant="primary" onClick={() => handleShowModal()}>Agregar Sucursal</Button>
      </div>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Número de Contacto</th>
            <th>Correo Electrónico</th>
            <th>Atención Emergencias 24 hs</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sucursales.map((s) => (
            <tr key={s._id}>
              <td>{s.nombre}</td>
              <td>{s.direccion}</td>
              <td>{s.numeroContacto}</td>
              <td>{s.correo}</td>
              <td>{s.atiendeEmergencias24H ? 'Sí' : 'No'}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowModal(s)} className="me-2">Editar</Button>
                <Button variant="danger" onClick={() => handleEliminarSucursal(s._id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalSucursalRegistro
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        sucursal={nuevaSucursal}
        setSucursal={setNuevaSucursal}
        handleGuardar={handleGuardarSucursal}
      />
    </Container>
  );
};

export default GestionSucursal;
