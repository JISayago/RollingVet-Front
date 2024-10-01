import React, { useState } from 'react';
import { Table, Button, Form, FormControl, Modal, Row, Col,Pagination } from 'react-bootstrap';

const GestionUsuarios = () => {
    const initialUsers = [
        {
            id: 1,
            name: 'Juan Pérez',
            role: 'Usuario',
            deleted: false,
            mascotas: [
                { nombre: 'Fido', plan: 'Plan Básico', fichaMedica: '' },
                { nombre: 'Luna', plan: 'Plan Premium', fichaMedica: 'Consulta 2024-01-10' },
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
    const planes = ['Plan Básico', 'Plan Premium', 'Plan VIP'];

    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [changedRoles, setChangedRoles] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [fichaMedica, setFichaMedica] = useState('');
    const [selectedMascota, setSelectedMascota] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState('');

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
        setSelectedMascota(null);
        setSelectedPlan('');
        setFichaMedica('');
    };

    const handleAddFichaMedica = () => {
        if (selectedUser && selectedMascota) {
            setUsers(users.map(user => 
                user.id === selectedUser.id 
                ? {
                    ...user, 
                    mascotas: user.mascotas.map(mascota =>
                        mascota.nombre === selectedMascota.nombre 
                        ? { ...mascota, fichaMedica: fichaMedica } 
                        : mascota
                    )
                } 
                : user
            ));
            handleCloseModal();
        }
    };

    const handlePlanChange = (mascota) => {
        setUsers(users.map(user => 
            user.id === selectedUser.id 
            ? {
                ...user,
                mascotas: user.mascotas.map(m => 
                    m.nombre === mascota.nombre 
                    ? { ...m, plan: selectedPlan } 
                    : m
                )
            }
            : user
        ));
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
                                    {mascota.nombre} - Plan: 
                                    <Form.Select
                                        value={selectedPlan || mascota.plan}
                                        onChange={(e) => {
                                            setSelectedMascota(mascota);
                                            setSelectedPlan(e.target.value);
                                            handlePlanChange(mascota);
                                        }}
                                    >
                                        <option value="">Seleccione un plan</option>
                                        {planes.map((plan, i) => (
                                            <option key={i} value={plan}>{plan}</option>
                                        ))}
                                    </Form.Select>
                                    - Ficha Médica: {mascota.fichaMedica || 'No disponible'}
                                    <Button
                                        variant="primary"
                                        onClick={() => {
                                            setSelectedMascota(mascota);
                                            setFichaMedica(mascota.fichaMedica || ''); // Cargar la ficha médica existente
                                        }}
                                        className="ms-2"
                                    >
                                        Agregar Ficha Médica
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </Modal.Body>
            </Modal>

            {/* Modal para agregar ficha médica */}
            <Modal show={selectedMascota} onHide={() => setSelectedMascota(null)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Ficha Médica a {selectedMascota?.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFichaMedica">
                            <Form.Label>Ficha Médica</Form.Label>
                            <Form.Control
                                type="text"
                                value={fichaMedica}
                                onChange={(e) => setFichaMedica(e.target.value)}
                                placeholder="Ingrese la ficha médica de la mascota"
                            />
                        </Form.Group>
                    </Form>
                    <Button variant="primary" onClick={handleAddFichaMedica}>
                        Guardar Ficha Médica
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default GestionUsuarios;
