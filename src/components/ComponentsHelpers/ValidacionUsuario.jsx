import { useNavigate } from "react-router-dom";
import { ROL_ADMIN, ROL_VETERINARIO } from "../../helpers/variables";

const ValidacionUsuario = ({ children, rolRuta }) => {
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("token")) || "";
  const rolUsuario = JSON.parse(sessionStorage.getItem("rol")) || "";
  if (!token) {
    alert("Para ingresar a este servicio, por favor ingresa con tu cuenta.")
    setTimeout(() => {
    navigate("/");
    }, 100);
  }else if (rolRuta === rolUsuario || rolUsuario === ROL_ADMIN || rolUsuario === ROL_VETERINARIO) {
    return children
  } else {
        alert("No posee las credenciales suficientes!")
        setTimeout(() => {
            navigate("/");
          }, 100);
    }
};

export default ValidacionUsuario;