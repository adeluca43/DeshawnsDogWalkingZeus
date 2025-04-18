import { useEffect, useState } from "react";
import { getWalkers, getDogs } from "../apiManager";
import { useParams } from "react-router-dom";

export const DogDetails = () => {
const {dogId} = useParams ();
const numDogId = parseInt(dogId);
  const [dog, setDog] = useState({});
  const [dogs, setDogs] = useState([]);
  const [walker, setWalker] = useState({});
  const [walkers, setWalkers] = useState([]);
  useEffect(() => {
    getDogs().then(res => {setDogs(res)});
  }, []);

  useEffect(() => {
    getWalkers().then(res => {setWalkers(res)});
  }, []);

  useEffect(() => {
    for (let dogObj of dogs) {
      if (dogObj.id === numDogId) {
        setDog(dogObj);
        break;
      }
    }
    
  }, [dogs]);

  useEffect(() => {
    for (let walkerObj of walkers) {
      if (walkerObj.id === dog.walkerId) {
         setWalker(walkerObj);
         break;}
    }
    
  }, [dog, walkers]);

  

  return (
    <div>
      <p>{dog.name}</p>
      <p>{walker.name}</p>
    </div>
  );
};
