import { useEffect,useState } from "react";
import { getWalkers,getCities, getDogs, putDog } from "../apiManager";
import { Link } from "react-router-dom";


export const Walkers = () => {
const [ walkers, setWalkers] =useState ([]);
const [ cities, setCities] =useState ([]);
const [ dogs, setDogs] = useState([]);
const [ selectedCityId, setSelectedCityId] = useState (0);
const [dropdownId, setDropdownId] = useState(null)


useEffect (() => {
    getWalkers().then(setWalkers)
    getCities().then(setCities)
    getDogs().then(setDogs)
}, []);

let filterByCity;

if (selectedCityId === 0) {
    filterByCity = walkers
} else {
    filterByCity = walkers.filter((walker) => {
       return  walker.cities.includes(selectedCityId)
    })
}

const toggleDropdown = (walkerId) => {
    setDropdownId((id) => (id === walkerId ? null : walkerId))
}

    return ( 
        <div>
            <h2> List of Walkers</h2>
            <ul className = "walkers-list">
                {filterByCity.map((walker) => {
                    return <li key={walker.id} className="walker-list-item">{walker.name} 
                    <button type="button" onClick={() => toggleDropdown(walker.id)} className="walker-add-dog-button">Add Dog</button>
                    {dropdownId === walker.id && (<div className="dog-dropdown-list">
                        {dogs.filter((dog) => 
                        walker.cities.includes(dog.cityId) && dog.walkerId !== walker.id).map((dog) => (
                            <Link to={`/dogs/${dog.id}`} key={dog.id} className="add-dog-dog-item" onClick={() => putDog(dog, walker.id)}>{dog.name}</Link>
                        ))}
                    </div>)}</li>
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