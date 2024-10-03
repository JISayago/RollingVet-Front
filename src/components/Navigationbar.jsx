import { useEffect, useState } from "react";
import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";
import ModalLoginRegistro from "./ModalLoginRegistro";
import Clima from "./Clima";
import Logo from "./Logo";
import "../css/navbar.css";
import LinksNavbar from "./LinksNavbar";
import { useNavigate } from "react-router-dom";

function Navigationbar() {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [tipoModal, setTipoModal] = useState("login");
    const [usuarioLogeado, setUsuarioLogeado] = useState({ logeado: false, rol: "-" });
    const navigate = useNavigate();

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
            navigate('/')
        }
    };

    useEffect(() => {
        controlarLogeado();
    }, [mostrarModal]);

    return (
        <>
            <Container fluid className="superior-nav w-100 py-2">
                <Row className="text-center">
                    <Col xs={12} md={3}>
                        <label className="m-0">Atendemos emergencias 24 hs</label>
                    </Col>
                    <Col xs={12} md={3}>
                        <label className="m-0">Contacto: ejemplo@correo.com</label>
                    </Col>
                    <Col xs={12} md={3}>
                        <label className="m-0">Número de contacto: (123) 456-7890</label>
                    </Col>
                    <Col xs={12} md={3}>
                        <Clima />
                    </Col>
                </Row>
            </Container>

            <Navbar expand="lg" className="py-3 navbar w-100">
                <Container fluid>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <Logo />
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="text-center">
                            <Nav className="mx-auto">
                                {usuarioLogeado.logeado && (
                                    <LinksNavbar usuarioLogeado={usuarioLogeado} />
                                )}
                                {!usuarioLogeado.logeado && (
                                    <LinksNavbar usuarioLogeado={usuarioLogeado} />
                                )}
                            </Nav>
                            <Nav className="ml-auto">
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
                    </div>
                </Container>
            </Navbar>

            <ModalLoginRegistro
                show={mostrarModal}
                handleCerrar={handleCerrarModal}
                type={tipoModal}
            />
        </>
    );
}

export default Navigationbar;
