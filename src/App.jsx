// import React, { useState } from "react";
// import "./App.css";

// const App = () => {
//   const [userVal, setUserVal] = useState("");
//   const [passVal, setPassVal] = useState("");
//   return (
//     <>
//       {/* <div>App</div> */}
//       <form action="submit" className="form-conatiner">
//         <div>
//           <label htmlFor="Username">Username</label>
//           <input
//             type="text"
//             placeholder="username"
//             required
//             value={userVal}
//             onChange={(e) => setUserVal(e.target.value)}
//           />
//         </div>

//         <div>
//           <label htmlFor="Password">Password</label>
//           <input
//             type="password"
//             placeholder="password"
//             required
//             value={passVal}
//             onChange={(e) => setPassVal(e.target.value)}
//           />
//         </div>

//         <div>
//           <button type="submit">submit</button>
//         </div>
//       </form>

//       {userVal == "user" && passVal == "password" && <p>Welcome ,user!</p>}
//     </>
//   );
// };

// export default App;

// ------------------v2
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setWeatherData(null); // clear old data

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=3d962750a69347e6a2a130843250105&q=${city}`
      );

      if (!response.ok) {
        throw new Error("Invalid city");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>

      {loading && <p>Loading data…</p>}

      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <strong>Temperature:</strong> {weatherData.current.temp_c}°C
          </div>
          <div className="weather-card">
            <strong>Humidity:</strong> {weatherData.current.humidity}%
          </div>
          <div className="weather-card">
            <strong>Condition:</strong> {weatherData.current.condition.text}
          </div>
          <div className="weather-card">
            <strong>Wind Speed:</strong> {weatherData.current.wind_kph} km/h
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
