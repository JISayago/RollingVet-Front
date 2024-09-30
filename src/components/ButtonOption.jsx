// src/components/ButtonComponent.js
import { Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../css/inicio.css"

function ButtonOption({ route, text }) {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${route}`)
  };

  return (
    <>
    <Button onClick={handleClick}  className="w-100 boton" >
      {text}
    </Button>
    </>
  );
}

export default ButtonOption;