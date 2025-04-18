import { useEffect, useState } from "react";
import { getCities, addCity } from "../apiManager";

export const Cities = () => {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      const cityData = await getCities();
      setCities(cityData);
    };
    fetchCities();
  }, []);

  const handleAddCity = async (event) => {
    event.preventDefault();
    const addedCity = {
      name: newCity,
    };
    await addCity(addedCity);

    const newCityList = await getCities();
    setCities(newCityList);
    setNewCity("");
  };

  return (
    <div>
      <h2> List of Cities</h2>
      <ul>
        {cities.map((city) => (
          <li key={city.id}>{city.name}</li>
        ))}
      </ul>

      <form onSubmit={handleAddCity}>
        <label> Enter a city name:</label>
        <input
          type="text"
          value={newCity}
          onChange={(event) => setNewCity(event.target.value)}
        />
        <button type="submit"> Add City </button>
      </form>
    </div>
  );
};
