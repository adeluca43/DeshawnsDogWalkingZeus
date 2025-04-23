//THIS FILE IS BEFORE IMPLEMENTING ANY CHECKBOX HANDLING

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getCities, getWalkers, getWalkerCities, putWalker } from "../apiManager"

export const EditWalker = () => {
    const [walker, setWalker] = useState({})
    const [allWalkers, setAllWalkers] = useState([])
    const [allCities, setAllCities] = useState([])
    const [allWalkerCities, setAllWalkerCities] = useState([])


    //return the id of the current walker based on the URL
    const { walkerId } = useParams()
    //convert to int
    const currentWalkerId = parseInt(walkerId)
    
    //load initial data
    useEffect(() => {

        const fetchData = async () => {
            const cityData = await getCities();
            setAllCities(cityData);
            const walkerData = await getWalkers();
            setAllWalkers(walkerData);
            const walkerCitiesData = await getWalkerCities();
            setAllWalkerCities(walkerCitiesData);
        }
        fetchData()
    }, [])

    //set walker after loading all walkers
    useEffect(() => {
        const matchedWalker = allWalkers.find(w => w.id === currentWalkerId)
        if (matchedWalker) {
            setWalker(matchedWalker);
          } else{
            console.log("Error finding walker")
          }
    }, [allWalkers])

    //if we haven't received the walker information yet, display loading message
    if(!walker || !walker.id) return <p>Loading walker...</p>

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(walker)
        putWalker(currentWalkerId, walker)
    }

    return(
        <div className="edit-walker-container">
            <h1>Walker Details</h1>
            <h6>Name</h6>
            <form className="walker-form"
            onSubmit={handleSubmit}>

                <input 
                className="walker-name-input"
                type="text"
                placeholder={walker.name}
                value={walker.name} 
                onChange={(e) => setWalker({...walker, name: e.target.value})}
                />

                <h6>Cities</h6>
                <ul className="walker-cities-list">
                    {allCities.map((city) => (
                        <li className="walker-cities-list-item" key={city.id}>
                            <input
                            type="checkbox"
                            id={`checkbox-${city.id}`}
                            />
                            <label htmlFor={`checkbox-${city.id}`}>{city.name}</label>
                        </li>
                    ))}
                </ul>

                <input type="submit" value="Submit" />
            </form>
        </div>
    )

}