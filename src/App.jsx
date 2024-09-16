import {BrowserRouter,Routes,Route } from 'react-router-dom'
import Inicio from './pages/Inicio';
import PerfilUsuario from './pages/PerfilUsuario';

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio/> } />
        <Route path='/perfil_usuario' element={<PerfilUsuario/> } />
      </Routes>
   
    </BrowserRouter>
  );
}

export default App;
