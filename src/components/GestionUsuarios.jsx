import React, { useState } from 'react';
import { Table, Button, Form, FormControl, Modal, Pagination } from 'react-bootstrap';

const GestionUsuarios = () => {
    const initialUsers = [
        {
            id: 1,
            name: 'Juan Pérez',
            role: 'Usuario',
            deleted: false,
            mascotas: [
                { nombre: 'Fido', fechaNacimiento: '2020-05-10', tipo: 'Perro', raza: 'Labrador', castrado: true },
                { nombre: 'Luna', fechaNacimiento: '2018-08-22', tipo: 'Gato', raza: 'Siamés', castrado: false },
            ],
        },
        {
            id: 2,
            name: 'Ana Gómez',
            role: 'Administrador',
            deleted: false,
            mascotas: [],
        },
        // ... otros usuarios
    ];

    const roles = ['Usuario', 'Administrador', 'Supervisor', 'Operador', 'Invitado'];

    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [changedRoles, setChangedRoles] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleRoleChange = (id, newRole) => {
        setChangedRoles((prev) => ({
            ...prev,
            [id]: newRole,
        }));
    };

    const handleDeleteUser = (id) => {
        setUsers(users.map(user => user.id === id ? { ...user, deleted: !user.deleted } : user));
    };

    const handleSaveChanges = (id) => {
        setUsers(users.map(user =>
            user.id === id ? { ...user, role: changedRoles[id] } : user
        ));
        setChangedRoles((prev) => {
            const newState = { ...prev };
            delete newState[id];
            return newState;
        });
    };

    const handleShowModal = (user) => {
        setSelectedUser(user);
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

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                    {currentUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>
                                <Form.Select 
                                    defaultValue={user.role} 
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                >
                                    {roles.map((role, index) => (
                                        <option key={index} value={role}>{role}</option>
                                    ))}
                                </Form.Select>
                            </td>
                            <td>
                                {changedRoles[user.id] && (
                                    <Button variant="primary" onClick={() => handleSaveChanges(user.id)}>
                                        Guardar
                                    </Button>
                                )}
                                <Button variant={user.deleted ? "success" : "danger"} onClick={() => handleDeleteUser(user.id)}>
                                    {user.deleted ? "Reincorporar" : "Eliminar"}
                                </Button>{' '}
                                <Button variant="info" onClick={() => handleShowModal(user)}>
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
                    <Modal.Title>Mascotas de {selectedUser?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Mascotas Asignadas</h5>
                    {selectedUser && selectedUser.mascotas.length === 0 ? (
                        <p>No hay mascotas asignadas.</p>
                    ) : (
                        <ul>
                            {selectedUser && selectedUser.mascotas.map((mascota, index) => (
                                <li key={index}>
                                    <strong>Nombre:</strong> {mascota.nombre} <br />
                                    <strong>Fecha de Nacimiento:</strong> {mascota.fechaNacimiento} <br />
                                    <strong>Tipo:</strong> {mascota.tipo} <br />
                                    <strong>Raza:</strong> {mascota.raza} <br />
                                    <strong>Castrado:</strong> {mascota.castrado ? 'Sí' : 'No'} <br />
                                    <Button
                                        variant="info"
                                        href={`/perfil_mascota/66fafdd5c72490679957004f`}
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
