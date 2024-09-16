import { useEffect, useState } from 'react'

function Clima() {
   // This is a placeholder for weather information. Replace with actual API logic.
   const [weather, setWeather] = useState('22°C, Sunny');

   // Simulate fetching weather data (replace with actual API call)
   useEffect(() => {
     // Fetch weather data here
     setTimeout(() => {
       setWeather('25°C, Partly Cloudy');
     }, 1000);
   }, []);
 
   return (
     <div className="text-white">
       {weather}
     </div>
   );
}

export default Clima