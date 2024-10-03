import {Routes,Route } from 'react-router-dom'
import Inicio from './pages/Inicio';
import PerfilUsuario from './pages/PerfilUsuario';
import Contacto from './pages/Contacto';
import Turnos from './pages/Turnos';
import PlanesDeSuscripcion from './pages/PlanesMascotas';
import PerfilMascota from './pages/PerfilMascota';
import ServiciosTurnos from './pages/ServiciosTurnos';
import Especialistas from './pages/Especialistas';
import AdministracionPanel from './pages/AdministracionPanel';
import ValidacionUsuario from './components/ValidaciónUsuario';

function App() {
 
  return (
    
      <Routes>
        <Route path='/' element={<Inicio/> } />
        <Route path='/perfil_usuario' element={<PerfilUsuario/> } />
        <Route path='/perfil_mascota/:id' element={<PerfilMascota/> } />
        <Route path='/contacto' element={<Contacto/> } />
        <Route path='/servicios' element={<ServiciosTurnos/> } />
        <Route path='/planes' element={<PlanesDeSuscripcion/> } />
        <Route path='/nuestros_especialistas' element={<Especialistas />} />
        <Route path='/turnos' element={<Turnos />} />
        
        <Route path='/administracion' element={<ValidacionUsuario rolRuta={"Administrador"}><AdministracionPanel /></ValidacionUsuario>} />
      </Routes>
  );
}

export default App;
