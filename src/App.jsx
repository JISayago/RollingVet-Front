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

function App() {
 
  return (
    
      <Routes>
        <Route path='/' element={<Inicio/> } />
        <Route path='/perfil_usuario' element={<PerfilUsuario/> } />
        <Route path='/perfil_mascota/:id' element={<PerfilMascota/> } />
        <Route path='/contacto' element={<Contacto/> } />
        <Route path='/servicios' element={<ServiciosTurnos/> } />
        <Route path='/turnos' element={<Turnos/> } />
        <Route path='/planes' element={<PlanesDeSuscripcion/> } />
        <Route path='/nuestros_especialistas' element={<Especialistas />} />
        
        <Route path='/administracion' element={<AdministracionPanel />} />
        <Route path='/gestion_usuarios' element={<Especialistas />} />
        <Route path='/gestion_turnos' element={<Especialistas />} />
        <Route path='/gestion_servicios' element={<Especialistas />} />
        <Route path='/gestion_productos' element={<Especialistas />} />
      </Routes>
  );
}

export default App;
