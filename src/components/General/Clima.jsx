import { useEffect, useState } from 'react'
import IconoClima from '../General/IconoClima';

function Clima() {
  const [clima, setClima] = useState({temp:'0'});
  useEffect(() => {
    fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Tucuman%2C%20Argentina?unitGroup=metric&include=current&key=CEYSJ57RNLRECTYY5BA9X6JHR&contentType=json", {
      method: "GET",
      headers: {}
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json(); 
      })
      .then(data => {
        setClima({temp:data.currentConditions.temp, icon:data.currentConditions.icon});
      })
      .catch(err => {
        alert(err)
      });
    
  },[])

   return (
     <div className="text-white">
       <label>{`${clima.temp} °C`}</label><IconoClima icon={clima.icon} />
     </div>
   );
}

export default Clima