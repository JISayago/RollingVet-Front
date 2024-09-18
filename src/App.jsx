import {BrowserRouter,Routes,Route } from 'react-router-dom'
import Inicio from './pages/Inicio';
import PerfilUsuario from './pages/PerfilUsuario';
import Contacto from './pages/Contacto';
import ListadoProductos from './pages/ListadoProductos';
import Turnos from './pages/Turnos';

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio/> } />
        <Route path='/perfil_usuario' element={<PerfilUsuario/> } />
        <Route path='/contacto' element={<Contacto/> } />
        <Route path='/productos' element={<ListadoProductos/> } />
        <Route path='/turnos' element={<Turnos/> } />
      </Routes>
   
    </BrowserRouter>
  );
}

export default App;
