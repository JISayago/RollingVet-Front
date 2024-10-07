import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import { Container } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'
import Navigationbar from './components/General/Navigationbar.jsx'
import FooterBar from './components/General/FooterBar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
  <Container fluid className="d-flex flex-column min-vh-100 p-0">
  <Navigationbar />
  <Container className="flex-grow-1">
    <App />
  </Container>
  <FooterBar />
</Container>
    </BrowserRouter>

  </StrictMode>,
)
