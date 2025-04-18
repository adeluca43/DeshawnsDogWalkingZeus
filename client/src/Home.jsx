import { getDogs, getGreeting } from "./apiManager";
import { useEffect, useState } from "react";
import { Link} from "react-router-dom";

export default function Home() {
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    getGreeting()
      .then(setGreeting)
      .catch(() => {
        console.log("API not connected");
      });
  }, []);

  useEffect(() => {
    getDogs().then(setDogs)
  }, [])

  return (<>
  <p>{greeting.message}</p>
  <ul className="dogs-list">
    {dogs.map((dog) => {
      return <li key={dog.id}>
        <Link to={`/dogs/${dog.id}`}>{dog.name} </Link> </li> 
    })}
    <li><Link to={`/dogs/adddog`}><button type="button">Add Dog</button></Link></li>
  </ul>
  </>);
}