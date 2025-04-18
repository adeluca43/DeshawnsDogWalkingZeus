export const getGreeting = async () => {
  const res = await fetch("/api/hello");
  return res.json();
};

export const getDogs = async () => {
  const res = await fetch("/api/dogs");
  return res.json();
}

export const getWalkers = async () => {
  const res = await fetch ("/api/walkers");
  return res.json();
}

export const getCities = async () => {
  const res = await fetch("/api/cities");
  return res.json();
}

export const postDog = async (dog) => {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: dog.name,
      cityId: dog.cityId,
      walkerId: dog.walkerId
    })
  }

  const response = await fetch("/api/dogs/", postOptions)
  const data = await response.json()
  return data.id
}

export const putDog = async (dog, walker) => {
  
  const dogToPut = {
    ...dog,
    walkerId: walker
  }
  const putOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dogToPut)
  }
  const response = await fetch(`/api/dogs/${dog.id}`, putOptions)
  return await response.json()
}