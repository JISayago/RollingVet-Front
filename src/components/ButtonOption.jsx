// src/components/ButtonComponent.js
import { Button} from 'react-bootstrap';

function ButtonOption({ route, text }) {

  const handleClick = () => {
    console.log("click")
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