import { Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function LinksNavbar({ usuarioLogeado }) {
    const [user, setUser] = useState({ logeado: false, rol: "-" });

    useEffect(() => {
        if (usuarioLogeado && usuarioLogeado.logeado) {
            setUser(usuarioLogeado);
        }
    }, [usuarioLogeado]);

    return (
        <Nav className="me-auto">
            {user.logeado && user.rol === 'cliente' && (
                <>
                    <Link className="link" to="/">Inicio</Link>
                    <Link className="link" to="/servicios">Servicios</Link>
                    <Link className="link" to="/perfil_usuario">Mi Perfil</Link>
                    <Link className="link" to="/productos">Productos</Link>
                    <Link className="link" to="/contacto">Contacto</Link>
                </>
            )}
            {user.logeado && user.rol === 'administrador' && (
                <>
                    <Link className="link" to="/gestion_usuarios">Gestión de Usuarios</Link>
                    <Link className="link" to="/gestion_turnos">Gestión de Turnos</Link>
                    <Link className="link" to="/gestion_servicios">Gestión de Servicios</Link>
                    <Link className="link" to="/gestion_productos">Gestión de Sucursales</Link>
                </>
            )}
            {user.logeado && user.rol === 'veterinario' && (
                <>
                    <Link className="link" to="/">Inicio</Link>
                    <Link className="link" to="/servicios">Mis Turnos</Link>
                    <Link className="link" to="/mis_pacientes">Mis Pacientes</Link>
                </>
            )}
            {user.logeado && user.rol === 'peluquero' && (
                <>
                    <Link className="link" to="/">Inicio</Link>
                    <Link className="link" to="/servicios">Mis Turnos</Link>
                    <Link className="link" to="/mis_pacientes">Mis Clientes</Link>
                </>
            )}
        </Nav>
    );
}

export default LinksNavbar;
