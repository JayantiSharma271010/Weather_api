import React,{ useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [result, setResult] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5c1cb6786734f2292a16198822a0a504`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setResult(response.data);
        console.log(response.data);
      });
      setLocation();
    }
  };

  const temperature = result.main?.temp
    ? (result.main.temp - 273.15).toFixed(0)
    : "";
  const feelsLike = result.main?.temp
    ? (result.main.temp - 273.15).toFixed(0)
    : "";

  const windSpeed = result.wind ? (result.wind.speed * 2.23694).toFixed(0) : "";

  const weatherCondition = result.weather ? result.weather[0].main : "";

  const getBackgroundImage = (condition) => {
    switch (condition) {
      case "Clouds":
        return "url('https://images.pexels.com/photos/80476/hayden-valley-yellowstone-valley-landscape-80476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
      case "Smoke":
        return "url('https://images.pexels.com/photos/691574/pexels-photo-691574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
      case "Clear":
        return "url('https://images.pexels.com/photos/2084699/pexels-photo-2084699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
      case "Thunderstorm":
        return "url('cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg')";
      case "Mist":
        return "url('https://images.pexels.com/photos/939807/pexels-photo-939807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
      case "Snow":
        return "url('https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
        case "Rain":
          return "url('https://img.freepik.com/free-photo/weather-effects-composition_23-2149853295.jpg?w=996&t=st=1702315693~exp=1702316293~hmac=521147d90663be87d599d654a68c6b4d50b51b45d9f0687efc9dc2894d50fd8f')"
      default:
        return "url('https://images.pexels.com/photos/1192671/pexels-photo-1192671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
    }
  };

 
  
  const beforeStyle = {
    content: '""',
    backgroundImage: getBackgroundImage(weatherCondition),
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  };
  return (
    <>
      <div className="app">
        <div className="overlay" style={beforeStyle}></div>
        <div className="search">
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter Location "
          />
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{result.name}</p>
            </div>
            <div className="temp">
              <h1>{temperature}°C</h1>
            </div>
            <div className="description">
              <p>{weatherCondition}</p>
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              <p className="bold">{feelsLike}°C</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {result.main ? <p>{result.main.humidity}%</p> : ""}
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p>{windSpeed}MPH</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
