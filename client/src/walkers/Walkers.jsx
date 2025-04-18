import { useEffect,useState } from "react";
import { getWalkers,getCities } from "../apiManager";


export const Walkers = () => {
const [ walkers, setWalkers] =useState ([]);
const [ cities, setCities] =useState ([]);
const [ selectedCityId, setSelectedCityId] = useState (0);


useEffect (() => {
    getWalkers().then(setWalkers)
    getCities().then(setCities)
}, []);

let filterByCity;

if (selectedCityId ===0) {
    filterByCity = walkers
} else {
    filterByCity = walkers.filter((walker) => {
       return  walker.cities.includes(selectedCityId)
    })
}

    return ( 
        <div>
            <h2> List of Walkers</h2>
            <ul className = "walkers-list">
                {filterByCity.map((walker) => {
                    return <li key={walker.id}>{walker.name}</li>
                })}
            </ul>
<select
className= "cityFilter"
defaultValue="Select a city"
onChange={(e) =>setSelectedCityId(parseInt(e.target.value))}>
    <option value="Select a city" disabled>
                    Select a city
                </option>
    {cities.map((city)=> {
        return (
      <option  key= {city.id} 
      value={city.id}>
        {city.name}
      </option>
        )
    })}
</select>
        </div>)
}