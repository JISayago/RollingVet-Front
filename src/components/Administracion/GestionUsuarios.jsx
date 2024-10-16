import { useEffect, useState } from 'react';
import { Table, Button, Form, FormControl, Modal, Pagination } from 'react-bootstrap';
import clienteAxios from '../../helpers/axios.config';
import { configHeaders } from '../../helpers/extra.config';

const GestionUsuarios = () => {
    const roles = ['Cliente', 'Administrador', 'Veterinario'];

    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [changedRoles, setChangedRoles] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const obtenerUsuarios = async () => {
        const usuariosBD = await clienteAxios.get('/usuarios');
        setUsuarios(usuariosBD.data);
    };

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const handleRoleChange = (usuario, rolNuevo) => {
        setChangedRoles((prev) => ({
            ...prev,
            [usuario._id]: rolNuevo,
        }));
    };

    const handleUser = async (usuario) => {
        const rol = JSON.parse(sessionStorage.getItem("rol")) || "";
        if (rol === "Administrador") {
            try {
                const result = await clienteAxios.post(
                    `/usuarios/habilitarEliminarPerfil/${usuario._id}`,
                    {},
                    configHeaders
                );
                
                alert("Usuario modificado correctamente");
                setUsuarios(usuarios.map(u => u._id === usuario._id ? { ...u, estaEliminado: !u.estaEliminado } : u));
            }
            catch (error) {
                alert("Ocurrió un error al modificar el perfil.")
            }
        }
    };

    const handleSaveChanges = async (usuario) => {
        const rolNuevo = changedRoles[usuario._id];
        const rol = JSON.parse(sessionStorage.getItem("rol")) || "";
        if (rol === "Administrador") {
            try {
                await clienteAxios.put(
                    `/usuarios/cambioRol/${usuario._id}`,
                    { rol: rolNuevo },
                    configHeaders
                );
                alert("Usuario actualizada correctamente");
                setUsuarios(usuarios.map(u =>
                    u._id === usuario._id ? { ...u, rol: rolNuevo } : u
                ));
        
                setChangedRoles((prev) => {
                    const newState = { ...prev };
                    delete newState[usuario._id];
                    return newState;
                });  
            }
              catch (error) {
                alert("Ocurrió un error al actualizar el Usuario.")
              }
        }
    };

    const handleShowModal = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredUsers = usuarios.filter(u =>
        u.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    return (
        <div>
            <h2>Gestión de Usuarios</h2>

            <Form className="mb-3">
                <FormControl
                    type="text"
                    placeholder="Buscar por nombre"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </Form>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((usuario) => (
                        <tr key={usuario._id}>
                            <td>{usuario.nombre}</td>
                            <td>
                                <Form.Select 
                                    defaultValue={usuario.rol} 
                                    onChange={(e) => handleRoleChange(usuario, e.target.value)}
                                >
                                    {roles.map((rol, index) => (
                                        <option key={index} value={rol}>{rol}</option>
                                    ))}
                                </Form.Select>
                            </td>
                            <td>
                                {changedRoles[usuario._id] && (
                                    <Button variant="primary" onClick={() => handleSaveChanges(usuario)}>
                                        Guardar
                                    </Button>
                                )}
                                <Button variant={usuario.estaEliminado ? "success" : "danger"} onClick={() => handleUser(usuario)}>
                                    {usuario.estaEliminado ? "Reincorporar" : "Eliminar"}
                                </Button>
                                <Button variant="info" onClick={() => handleShowModal(usuario)}>
                                    Ver Mascotas
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            {/* Modal para ver mascotas */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Mascotas de {usuarioSeleccionado?.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Mascotas Asignadas</h5>
                    {usuarioSeleccionado && usuarioSeleccionado.mascotas.length === 0 ? (
                        <p>No hay mascotas asignadas.</p>
                    ) : (
                        <ul>
                            {usuarioSeleccionado && usuarioSeleccionado.mascotas.map((mascota, index) => (
                                <li key={index}>
                                    <strong>Nombre:</strong> {mascota.nombre} <br />
                                    <strong>Fecha de Nacimiento:</strong> {mascota.fechaNacimiento} <br />
                                    <strong>Tipo:</strong> {mascota.tipo} <br />
                                    <strong>Raza:</strong> {mascota.raza} <br />
                                    <strong>Castrado:</strong> {mascota.castrado ? 'Sí' : 'No'} <br />
                                    <Button
                                        variant="info"
                                        href={`/perfil_mascota/${mascota.mascotaId}`}
                                        className="ms-2"
                                    >
                                        Ver Perfil
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default GestionUsuarios;
