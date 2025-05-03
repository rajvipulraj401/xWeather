
import React from "react";
import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [submittedCity, setSubmittedCity] = useState("");
  const [cityData, setCityData] = useState();
  const [loading, setLoading] = useState(false);

  // Step 1: - so whenever we get new SubmittedCity we will call the with that city
  useEffect(() => {
    //Milestone :-- do the api call now

    // step 1:-- First return when the submittedCity is empty (HANDLING the mount cases)
    //  submittedCity == ""
    if (submittedCity == "") return;

    // step 1: - start the loading state
    setLoading(true);

    // step 2:-- use the fetch method only
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=3d962750a69347e6a2a130843250105&q=${submittedCity}`
        );

        if (!response.ok) throw new Error();
        // console.log(response);
        const res = await response.json();
        console.log(res);
        // return res;
        setCityData(res);
        // alert("Data got");
      } catch (err) {
        console.error(`This is error:- ${err}`);
        alert("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    // if (!cityData)
    fetchWeather();
  }, [submittedCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Q) can i use city state value here when the form is submitted here or it can be old value
    // Ans - yes i can because that will be the latest value before submitting

    /*Logic - Now i have the city name and now i want to call the api with this query parameter and my api key as the query
     */

    setSubmittedCity(city);
  };

  return (
    <>
      <div className="app-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* <form onSubmit={()=> handleSubmit(data)}>
      Note - event is given by react to us and other data we have so thats whye 
      we did above way
      */}

          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {/* //Step2 :-- show all the city card from the cityCard state */}

        {loading && <p>Loading data...</p>}
        <div className="weather-cards">
          <div className="weather-card">
            <h4>Temperature</h4>
            <h5>{`${cityData?.current?.temp_c} c`}</h5>
            {/* use optional chaining to see if the data of object 
            exists or not */}
          </div>
          <div className="weather-card">
            <h4>Humidity</h4>
            <h5>{`${cityData?.current?.humidity}`}</h5>
          </div>
          <div className="weather-card">
            <h4>Condition</h4>
            <h5>{`${cityData?.current?.condition?.text}`}</h5>
          </div>
          <div className="weather-card">
            <h4>Wind Speed</h4>
            <h5>{`${cityData?.current?.wind_kph} k/h`}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
