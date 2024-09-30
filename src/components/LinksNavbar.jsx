import { Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';

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
                    <Nav.Link className="link" href="/">Inicio</Nav.Link>
                    <Nav.Link className="link" href="/servicios">Servicios</Nav.Link>
                    <Nav.Link className="link" href="/perfil_usuario">Mi Perfil</Nav.Link>
                    <Nav.Link className="link" href="/productos">Productos</Nav.Link>
                    <Nav.Link className="link" href="/contacto">Contacto</Nav.Link>
                </>
            )}
            {user.logeado && user.rol === 'administrador' && (
                <>
                    <Nav.Link className="link" href="/">Inicio</Nav.Link>
                    <Nav.Link className="link" href="/usuarios">Gestión de Usuarios</Nav.Link>
                    <Nav.Link className="link" href="/reportes">Gestión de Turnos</Nav.Link>
                    <Nav.Link className="link" href="/servicios">Gestión de Servicios</Nav.Link>
                    <Nav.Link className="link" href="/productos">Gestión de Sucursales</Nav.Link>
                </>
            )}
            {user.logeado && user.rol === 'veterinario' && (
                <>
                    <Nav.Link className="link" href="/">Inicio</Nav.Link>
                    <Nav.Link className="link" href="/servicios">Mis Turnos</Nav.Link>
                    <Nav.Link className="link" href="/mis_pacientes">Mis Pacientes</Nav.Link>
                </>
            )}
            {user.logeado && user.rol === 'peluquero' && (
                <>
                    <Nav.Link className="link" href="/">Inicio</Nav.Link>
                    <Nav.Link className="link" href="/servicios">Mis Turnos</Nav.Link>
                    <Nav.Link className="link" href="/mis_pacientes">Mis Clientes</Nav.Link>
                </>
            )}
        </Nav>
    );
}

export default LinksNavbar;
