import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCities, getWalkers, postDog } from "../apiManager"

export const AddDogForm = () => {
    const [dogName, setDogName] = useState("")
    const [dogCityId, setDogCityId] = useState(0)
    const [dogWalkerId, setDogWalkerId] = useState(0)
    const [allCities, setAllCities] = useState([])
    const [allWalkers, setAllWalkers] = useState([])

    useEffect(() => {
        const fetchCities = async () => {
            const cityData = await getCities()
            setAllCities(cityData)
        }
        const fetchWalkers = async () => {
            const walkerData = await getWalkers()
            setAllWalkers(walkerData)
        }
        
        fetchWalkers()
        fetchCities()
    }, [])
    const navigate = useNavigate()

    return(
        <>
        <h1>Enter Dog Details</h1>
        <form
        className="dog-form"
        onSubmit={async (e) => {
            e.preventDefault()
            const newDog = {
                name: dogName,
                cityId: dogCityId,
                walkerId: dogWalkerId 
                }
                const id = await postDog(newDog)
                navigate(`/dogs/${id}`)
            }
        }
        >
            <input
            className="dog-name-input"
            type="text"
            placeholder="Enter dog name"
            value={dogName}
            onChange={(nameEvent) => {
                setDogName(nameEvent.target.value)
            }}
            />

            <select className="city-dropdown"
            defaultValue="Select a city"
            onChange={(cityEvent) => {
                setDogCityId(cityEvent.target.value)
            }}>
                <option value="Select a city" disabled>
                    Select a city
                </option>
                {allCities.map((cityObj) => {
                    return (
                        <option
                        value={cityObj.id}
                        key={cityObj.id}
                        >
                            {cityObj.name}
                        </option>
                    )
                })}
            </select>

            <select className="walker-dropdown"
            defaultValue="Select a walker"
            onChange={(walkerEvent) => {
                setDogWalkerId(walkerEvent.target.value)
            }}>
                <option value="Select a walker" disabled>
                    Select a walker
                </option>
                {allWalkers.map((walkerObj) => {
                    return (
                        <option
                        value={walkerObj.id}
                        key={walkerObj.id}
                        >
                            {walkerObj.name}
                        </option>
                    )
                })}
            </select>

            <input type="submit" />
        </form>
        </>
    )
}