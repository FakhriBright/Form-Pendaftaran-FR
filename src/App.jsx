import { useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useToggle } from "./hooks/useToggle";
import { useWindowSize } from "./hooks/useWindowSize";

export default function App() {
  const [city, setCity] = useLocalStorage("city", "Jakarta");
  const [input, setInput] = useState("");
  const [isCelsius, toggleUnit] = useToggle(true);
  const { width } = useWindowSize();

  // Step 1: ambil koordinat kota
  const { data: geoData, loading: geoLoading, error: geoError } = useFetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
  );

  // Step 2: ambil data cuaca kalau koordinat sudah ada
  const latitude = geoData?.results?.[0]?.latitude;
  const longitude = geoData?.results?.[0]?.longitude;

  const { data: weatherData, loading: weatherLoading, error: weatherError } = useFetch(
    latitude && longitude
      ? `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius&timezone=auto`
      : null
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) setCity(input);
    setInput("");
  };

  const getTemperature = (tempC) => {
    return isCelsius ? `${tempC.toFixed(1)} °C` : `${(tempC * 9/5 + 32).toFixed(1)} °F`;
  };

  return (
    <div style={{
      maxWidth: "600px",
      margin: "auto",
      padding: "1rem",
      textAlign: "center",
      background: width < 600 ? "#f0f8ff" : "#e6f7ff",
      borderRadius: "10px"
    }}>
      <h1>Aplikasi Cuaca</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Cari kota..."
        />
        <button type="submit">Cari</button>
      </form>

      <button onClick={toggleUnit}>
        Ganti ke {isCelsius ? "°F" : "°C"}
      </button>

      {(geoLoading || weatherLoading) && <p>Loading...</p>}
      {(geoError || weatherError) && (
        <p style={{ color: "red" }}>
          Terjadi kesalahan: {geoError?.message || weatherError?.message}
        </p>
      )}

      {weatherData?.current_weather && (
        <div style={{ marginTop: "1rem" }}>
          <h2>{geoData?.results?.[0]?.name}, {geoData?.results?.[0]?.country}</h2>
          <p>{getTemperature(weatherData.current_weather.temperature)}</p>
          <p>Windspeed: {weatherData.current_weather.windspeed} km/h</p>
        </div>
      )}

      <small>Window width: {width}px</small>
    </div>
  );
}
