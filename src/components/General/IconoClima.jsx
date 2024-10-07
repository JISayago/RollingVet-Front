import clearDay from '../../assets/ClimaIcons/clear-day.svg';
import clearNight from '../../assets/ClimaIcons/clear-night.svg';
import cloudy from '../../assets/ClimaIcons/cloudy.svg';
import fog from '../../assets/ClimaIcons/fog.svg';
import hail from '../../assets/ClimaIcons/hail.svg';
import partlyCloudyDay from '../../assets/ClimaIcons/partly-cloudy-day.svg';
import partlyCloudyNight from '../../assets/ClimaIcons/partly-cloudy-night.svg';
import rainSnowShowersDay from '../../assets/ClimaIcons/rain-snow-showers-day.svg';
import rainSnowShowersNight from '../../assets/ClimaIcons/rain-snow-showers-night.svg';
import rainSnow from '../../assets/ClimaIcons/rain-snow.svg';
import rain from '../../assets/ClimaIcons/rain.svg';
import showersDay from '../../assets/ClimaIcons/showers-day.svg';
import showersNight from '../../assets/ClimaIcons/showers-night.svg';
import sleet from '../../assets/ClimaIcons/sleet.svg';
import snowShowersDay from '../../assets/ClimaIcons/snow-showers-day.svg';
import snowShowersNight from '../../assets/ClimaIcons/snow-showers-night.svg';
import snow from '../../assets/ClimaIcons/snow.svg';
import thunderRain from '../../assets/ClimaIcons/thunder-rain.svg';
import thunderShowersDay from '../../assets/ClimaIcons/thunder-showers-day.svg';
import thunderShowersNight from '../../assets/ClimaIcons/thunder-showers-night.svg';
import thunder from '../../assets/ClimaIcons/thunder.svg';
import wind from '../../assets/ClimaIcons/wind.svg';

function IconoClima({ icon }) {
    const climaIcons = {
        "clear-day": clearDay,
        "clear-night": clearNight,
        "cloudy": cloudy,
        "fog": fog,
        "hail": hail,
        "partly-cloudy-day": partlyCloudyDay,
        "partly-cloudy-night": partlyCloudyNight,
        "rain-snow-day": rainSnowShowersDay,
        "rain-snow-night": rainSnowShowersNight,
        "rain-snow": rainSnow,
        "rain": rain,
        "showers-day": showersDay,
        "showers-night": showersNight,
        "sleet": sleet,
        "snow-showers-day": snowShowersDay,
        "snow-showers-night": snowShowersNight,
        "snow": snow,
        "thunder-rain": thunderRain,
        "thunder-showers-day": thunderShowersDay,
        "thunder-showers-night": thunderShowersNight,
        "thunder": thunder,
        "wind": wind,
    };

    const getWeatherIcon = (iconName) => {
        return climaIcons[iconName] || null;
    };

    const iconSrc = getWeatherIcon(icon); 

    return (
        <img 
            style={{ width: '22px', height: '22px', margin:'0px 15px' }} 
            src={iconSrc} 
            alt={icon} 
        />
    );
}

export default IconoClima;
