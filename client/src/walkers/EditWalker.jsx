import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getCities, getWalkers, getWalkerCities, putWalker, postWalkerCity } from "../apiManager"
import { Form, Button } from "react-bootstrap"

export const EditWalker = () => {
    const [walker, setWalker] = useState({})
    const [allWalkers, setAllWalkers] = useState([])
    const [allCities, setAllCities] = useState([])
    const [allWalkerCities, setAllWalkerCities] = useState([])
    const [walkerCities, setWalkerCities] = useState([])

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

    //when the walker loads, load the cities that they walk in
    useEffect(() => {
        const matchWC = allWalkerCities.filter(wc => (wc.walkerId === currentWalkerId))
        setWalkerCities(matchWC)
    }, [walker, allWalkerCities])

    useEffect(() => {
        console.log(walkerCities)
    }, [walkerCities])

    //if we haven't received the walker information yet, display loading message
    if(!walker || !walker.id) return <p>Loading walker...</p>

    const handleSubmit = async () => {
        putWalker(currentWalkerId, walker);

    // Find new walkerCities (not already in the original full list)
    const existingKeys = new Set(
        allWalkerCities
            .filter(wc => wc.walkerId === currentWalkerId)
            .map(wc => `${wc.walkerId}-${wc.cityId}`)
    );

    const newWalkerCities = walkerCities.filter(wc => {
        const key = `${wc.walkerId}-${wc.cityId}`;
        return !existingKeys.has(key);
    });

    // Post the new walkerCity relationships
    for (const wc of newWalkerCities) {
        try {
            await postWalkerCity(wc);
            console.log("Posted:", wc);
        } catch (error) {
            console.error("Failed to post walkerCity", wc, error);
        }
    }

    const updatedWalkerCities = await getWalkerCities();
    setAllWalkerCities(updatedWalkerCities);

    const updatedCurrentWalkerCities = updatedWalkerCities.filter(wc => wc.walkerId === currentWalkerId);
    setWalkerCities(updatedCurrentWalkerCities);

    console.log("Updated walker:", walker);
    console.log("Newly posted walkerCities:", newWalkerCities);

    }

    const handleClicked = (eventTrigger, cityId) => {
        setWalkerCities(prevWalkerCities => {
            // Check if this city already exists in walkerCities
            const alreadyExists = prevWalkerCities.some(wc => wc.cityId === cityId && wc.walkerId === currentWalkerId);
    
            if (eventTrigger) {
                if (!alreadyExists) {
                    // Add new entry if it doesn't exist
                    return [...prevWalkerCities, { cityId, walkerId: currentWalkerId }];
                }
                return prevWalkerCities; // Do nothing if it already exists
            } else {
                // Remove the city if unchecked
                return prevWalkerCities.filter(wc => wc.cityId !== cityId);
            }
        });
    }

    const handleDefaultChecked = (cityId) => {
            return allWalkerCities.find(wc => (cityId == wc.cityId && currentWalkerId == wc.walkerId))
    }

    return(
        <div className="edit-walker-container">
            <h1>Walker Details</h1>
            <h6>Name</h6>
            <Form className="walker-form"
                onSubmit={(eventTrigger)=>{
                    eventTrigger.preventDefault()
                    handleSubmit(eventTrigger.target.value)    
                }} >

                <input 
                className="walker-name-input"
                type="text"
                placeholder={walker.name}
                value={walker.name} 
                onChange={(e) => setWalker({...walker, name: e.target.value})}
                />

                <h6>Cities</h6>
                {allCities.map((city)=> {
                    return (
                    <Form.Check
                    key={city.id}
                    type='checkbox'
                    id={`city-${city.id}`}
                    label={city.name}
                    checked={!!walkerCities.find(wc => wc.cityId === city.id && wc.walkerId === currentWalkerId)}
                    onChange={(e) => { handleClicked(e.target.checked, city.id)}}
                    />
                )})}

                <Button type="submit">Update</Button>
            </Form>
        </div>
    )

}