import { Navbar, Image, } from 'react-bootstrap';
import logo from '../../assets/Logo/RollingVetLogo.png'
import { Link } from 'react-router-dom';

function Logo() {
  return (
    
    <Navbar.Brand>
      <Link to='/'>
        <Image src={logo} alt="Logo" height="120" />
      </Link>
      </Navbar.Brand>
  );
}

export default Logo;
