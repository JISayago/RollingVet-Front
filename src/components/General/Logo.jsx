import { Navbar, Image, } from 'react-bootstrap';
import logo from '../../assets/Logo/RollingVetLogo.png'

function Logo() {
  return (
      <Navbar.Brand>
        <Image src={logo} alt="Logo" height="120" />
      </Navbar.Brand>
  );
}

export default Logo;
