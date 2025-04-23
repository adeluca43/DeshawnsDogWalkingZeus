import { getDogs, getGreeting, deleteDog } from "./apiManager";
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

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this dog?");
    if (confirm) {
      await deleteDog(id);
     getDogs().then(setDogs); //Refresh the list after deletion
    }
  };


  return (<>
  <p>{greeting.message}</p>
  <ul className="dogs-list">
    {dogs.map((dog) => {
      return <li key={dog.id}>
        <Link to={`/dogs/${dog.id}`}>{dog.name} </Link>
        <button onClick={() => handleDelete(dog.id)}>Remove</button>
         </li> 
    })}
    <li><Link to={`/dogs/adddog`}><button type="button">Add Dog</button></Link></li>
  </ul>
  </>);
}