import { useEffect,useState } from "react";
import { getWalkers,getCities, getDogs, putDog, getWalkerCities,deleteWalker } from "../apiManager";
import { Link } from "react-router-dom";


export const Walkers = () => {
const [ allWalkers, setAllWalkers ] = useState([])
const [ walkers, setWalkers] =useState ([]);
const [ cities, setCities] =useState ([]);
const [ dogs, setDogs] = useState([]);
const [ selectedCityId, setSelectedCityId] = useState (0);
const [ walkerCities, setWalkerCities ] = useState([])
const [ dropdownId, setDropdownId ] = useState(null)


useEffect (() => {
    getWalkers().then(setAllWalkers)
    getWalkers().then(setWalkers)
    getCities().then(setCities)
    getDogs().then(setDogs)
    getWalkerCities().then(setWalkerCities)
}, []);


useEffect(() => {
    if (selectedCityId === 0) {
        setWalkers(allWalkers)
    } else {
        //filter the walker cities to match the selected city and the walkers in it
        const tempFilter = walkerCities.filter(wc => wc.cityId === selectedCityId).map(wc => wc.walkerId)

        const matchedWalkers = allWalkers.filter(walker => tempFilter.includes(walker.id))
        setWalkers(matchedWalkers)
    }
}, [selectedCityId, walkerCities, allWalkers])

const toggleDropdown = (walkerId) => {
    setDropdownId((id) => (id === walkerId ? null : walkerId))
}

    return ( 
        <div>
            <h2> List of Walkers</h2>
            <ul className = "walkers-list" key={walkers.id}>
                {walkers.map((walker) => {
                    return <li key={walker.id} className="walker-list-item">
                        <Link to={`/walkers/${walker.id}`}>{walker.name} </Link>
                    <button type="button" onClick={() => toggleDropdown(walker.id)} className="walker-add-dog-button">Add Dog</button>
                    <button
      className="walker-remove-button"
      onClick={async () => {
        const confirm = window.confirm("Are you sure you want to remove this walker?");
        if (confirm) {
          await deleteWalker(walker.id);
          const updatedWalkers = await getWalkers();
          setAllWalkers(updatedWalkers);
          setWalkers(updatedWalkers); // refresh the filtered list
          const updatedDogs = await getDogs();
          setDogs(updatedDogs); // refresh dogs so unassigned ones show up correctly
        }
      }}
    >
      Remove
    </button>
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