import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import Navigationbar from './components/Navigationbar.jsx'
import FooterBar from './components/FooterBar.jsx'
import { Container } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
  <Container fluid className="d-flex flex-column min-vh-100 p-0">
  <Navigationbar />
  <div className="flex-grow-1">
    <App />
  </div>
  <FooterBar />
</Container>
    </BrowserRouter>

  </StrictMode>,
)
