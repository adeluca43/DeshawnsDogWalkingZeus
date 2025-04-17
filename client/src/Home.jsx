import { getDogs, getGreeting } from "./apiManager";
import { useEffect, useState } from "react";

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
    console.log("dogs populated")
  }, [])

  return (<>
  <p>{greeting.message}</p>
  <ul className="dogs-list">
    {dogs.map((dog) => {
      return <li key={dog.id}>{dog.name}</li>
    })}
  </ul>
  </>);
}