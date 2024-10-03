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
                    <Link className="link" to="/">Inicio</Link>
                    <Link className="link" to="/servicios">Servicios</Link>
                    <Link className="link" to="/contacto">Contacto</Link>
                    <Link className="link" to="/turnos">Turnos</Link>
                    <Link className="link" to="/sobre_nosotros">Sobre Nosotros</Link>
            {user.logeado && user.rol === 'Cliente' && (
                <>
                    <Link className="link" to="/perfil_usuario">Mi Perfil</Link>
                </>
            )}
            {user.logeado && user.rol === 'Administrador' && (
                <>
                    <Link className="link" to="/administracion">Administración</Link>
                </>
            )}
            {user.logeado && user.rol === 'Veterinario' && (
                <>
                    <Link className="link" to="/">Inicio</Link>
                    <Link className="link" to="/servicios">Mis Turnos</Link>
                    <Link className="link" to="/mis_pacientes">Mis Pacientes</Link>
                </>
            )}
            {user.logeado && user.rol === 'Peluquero' && (
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
