import axios from "axios";
import { useState } from "react";

function App() {
    const [deg, setdeg] = useState("0");
    const [city, setcity] = useState("");
    const [desc, setdesc] = useState("");
    const [enteredvalue, setenteredvalue] = useState("");
    const [error, setError] = useState("");

    function handleInput(event) {
        setenteredvalue(event.target.value);
    }

    function getData() {
        var weather = axios(`https://api.openweathermap.org/data/2.5/weather?q=${enteredvalue}&appid=6f5caee398c665d52f7cb102e2523d90&units=metric`);

        weather
            .then(function (dalta) {
                setdeg(dalta.data.main.temp);
                setdesc(dalta.data.weather[0].main);
                setcity(dalta.data.name);
                setError("");
            })
            .catch(function (error) {
                setError("Error fetching weather data. Please try again.");
            });
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            getData();
        }
    }

    return (
        <div className="flex flex-row justify-center h-[80vh] items-center">
            <div style={{ backgroundImage: "linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)" }} className="p-3 rounded-md shadow w-3/4 md:w-2/4 lg:w-1/4">
                <h2 className="font-semibold text-2xl">Hey! ⛅</h2>
                <p className="text-base">Do you want to know the weather Report :)</p>
                <input onChange={handleInput} onKeyPress={handleKeyPress} type="text" className="rounded-md h-7 text-sm mt-2 p-2 outline-none" placeholder="City Name?" />
                <br />
                <button onClick={getData} className="bg-black text-white rounded-lg p-1 text-sm my-2 mt-2">Get Report ⚡</button>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                <p className="text-sm font-medium mt-2">Degree: {deg}°C | City: {city}</p>
                <p className="text-sm font-medium mt-2">Weather: {desc}</p>
            </div>
        </div>
    );
}

export default App;
