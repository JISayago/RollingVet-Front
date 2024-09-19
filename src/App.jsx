import {BrowserRouter,Routes,Route } from 'react-router-dom'
import Inicio from './pages/Inicio';
import PerfilUsuario from './pages/PerfilUsuario';
import Contacto from './pages/Contacto';
import ListadoProductos from './pages/ListadoProductos';
import Turnos from './pages/Turnos';
import PlanesDeSuscripcion from './pages/PlanesMascotas';
import PerfilMascota from './pages/PerfilMascota';
import ServiciosTurnos from './pages/ServiciosTurnos';

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio/> } />
        <Route path='/perfil_usuario' element={<PerfilUsuario/> } />
        <Route path='/perfil_mascota' element={<PerfilMascota/> } />
        <Route path='/contacto' element={<Contacto/> } />
        <Route path='/productos' element={<ListadoProductos/> } />
        <Route path='/servicios' element={<ServiciosTurnos/> } />
        <Route path='/turnos' element={<Turnos/> } />
        <Route path='/planes' element={<PlanesDeSuscripcion/> } />
      </Routes>
   
    </BrowserRouter>
  );
}

export default App;
