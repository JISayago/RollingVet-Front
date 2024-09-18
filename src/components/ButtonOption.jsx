// src/components/ButtonComponent.js
import { Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ButtonOption({ route, text }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/turnos')
  };

  return (
    <>
    <Button onClick={handleClick} variant="primary" className="w-100">
      {text}
    </Button>
    </>
  );
}

export default ButtonOption;