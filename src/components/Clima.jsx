import { useEffect, useState } from 'react'
import IconoClima from './IconoClima';

function Clima() {
   // This is a placeholder for weather information. Replace with actual API logic.
  const [clima, setClima] = useState({temp:'0'});
  /*useEffect(() => {
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Tucuman%2C%20Argentina?unitGroup=metric&include=current&key=CEYSJ57RNLRECTYY5BA9X6JHR&contentType=json", {
      method: "GET",
      headers: {}
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json(); // Convierte el cuerpo a JSON
      })
      .then(data => {
        setClima({temp:data.currentConditions.temp, icon:data.currentConditions.icon}); // Aquí tienes acceso a los datos
      })
      .catch(err => {
        console.error("Error:", err);
      });
    
  },[])*/

   // Simulate fetching weather data (replace with actual API call)
   
 
   return (
     <div className="text-white">
       {`${clima.temp} °C`}<IconoClima />
     </div>
   );
}

export default Clima