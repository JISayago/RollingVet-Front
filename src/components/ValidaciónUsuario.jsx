import { useNavigate } from "react-router-dom";

const ValidacionUsuario = ({ children, rolRuta }) => {
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("token")) || "";
  const rolUsuario = JSON.parse(sessionStorage.getItem("rol")) || "";

  if (!token) {
    setTimeout(() => {
      navigate("/");
    }, 500);
    }
    if (rolRuta === rolUsuario) {
        return children
    } else {
        alert("No posee las credenciales suficientes!")
        setTimeout(() => {
            navigate("/");
          }, 500);
    }
};

export default ValidacionUsuario;