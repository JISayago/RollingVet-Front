import { useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import ModalLR from "./ModalLR";
import Logo from "./Logo";
import "../css/navbar.css";
import LinksNavbar from "./LinksNavbar";

function Navigationbar() {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [tipoModal, setTipoModal] = useState("login");
    const [usuarioLogeado, setUsuarioLogeado] = useState({ logeado: false, rol: "-" });

    const handleShowModal = (tipo) => {
        setTipoModal(tipo);
        setMostrarModal(true);
    };

    const handleCerrarModal = () => {
        setMostrarModal(false);
    };

    const controlarLogeado = () => {
        if (JSON.parse(sessionStorage.getItem('token')) && JSON.parse(sessionStorage.getItem('rol'))) {
            setUsuarioLogeado({ logeado: true, rol: JSON.parse(sessionStorage.getItem('rol')) });
        }
    };

    const cerrarSesion = () => {
        if (JSON.parse(sessionStorage.getItem('token'))) {
            setUsuarioLogeado({ logeado: false, rol: "-" });
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('rol');
        }
    };

    useEffect(() => {
        controlarLogeado();
    }, [mostrarModal]);

    return (
        <>
            <Navbar expand="lg" className="py-3 navbar">
                <Container>
                    <Logo />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="text-center">
                        {usuarioLogeado.logeado && (
                            <LinksNavbar usuarioLogeado={usuarioLogeado} />
                        )}
                        <Nav>
                            {!usuarioLogeado.logeado ? (
                                <>
                                    <Nav.Link className="link" onClick={() => handleShowModal("login")}>Ingresar</Nav.Link>
                                    <Nav.Link className="link" onClick={() => handleShowModal("registro")}>Registro</Nav.Link>
                                </>
                            ) : (
                                <Nav.Link className="link" onClick={cerrarSesion}>Cerrar sesión</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <ModalLR
                show={mostrarModal}
                handleCerrar={handleCerrarModal}
                type={tipoModal}
            />
        </>
    );
}

export default Navigationbar;
