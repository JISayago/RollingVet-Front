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
import Error404 from './pages/Error404';
import SobreNosotros from './pages/SobreNosotros';

function App() {
 
  return (
    
      <Routes>
        <Route path='/' element={<Inicio/> } />
        <Route path='/perfil_usuario' element={<ValidacionUsuario rolRuta={"Cliente"}><PerfilUsuario /></ValidacionUsuario>} />
        <Route path='/perfil_mascota/:id' element={<ValidacionUsuario rolRuta={"Cliente"}><PerfilMascota /></ValidacionUsuario> } />
        <Route path='/contacto' element={<Contacto/> } />
        <Route path='/servicios' element={<ServiciosTurnos/> } />
        <Route path='/planes' element={<PlanesDeSuscripcion/> } />
        <Route path='/nuestros_especialistas' element={<Especialistas />} />
        <Route path='/turnos' element={<Turnos />} />
        <Route path='/sobre_nosotros' element={<SobreNosotros />} />
        
        <Route path='/administracion' element={<ValidacionUsuario rolRuta={"Administrador"}><AdministracionPanel /></ValidacionUsuario>} />
        <Route path='*' element={<Error404/>} />
      </Routes>
  );
}

export default App;
