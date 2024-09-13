import Container from 'react-bootstrap/Container';
import Navigationbar from './components/Navigationbar'; // Tu componente de navbar
import Footer from './components/FooterBar'; // Tu componente de footer

function App() {
  return (
    <Container fluid className="d-flex flex-column min-vh-100 p-0">
      <Navigationbar />
      <Container fluid className="flex-grow-1">
        {/* Aquí va el contenido principal */}
        <h1>Bienvenido a mi sitio web</h1>
        <p>Este es el contenido de la página.</p>
      </Container>
      <Footer />
    </Container>
  );
}

export default App;
