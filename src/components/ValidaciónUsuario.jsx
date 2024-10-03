import { useNavigate } from "react-router-dom";

const ValidacionUsuario = ({ children, rolRuta }) => {
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("token")) || "";
  const rolUsuario = JSON.parse(sessionStorage.getItem("rol")) || "";

  if (!token) {
    alert("Para ingresar a este servicio, por favor ingresa con tu cuenta.")
    setTimeout(() => {
      navigate("/");
    }, 500);
    }
    if (rolRuta === rolUsuario || rolRuta === "Logeado") {
        return children
    } else {
        alert("No posee las credenciales suficientes!")
        setTimeout(() => {
            navigate("/");
          }, 500);
    }
};

export default ValidacionUsuario;