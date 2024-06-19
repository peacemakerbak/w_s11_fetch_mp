import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function DogsList({ dogs, getDogs, setCurrentDogID }) { // usse the correct prop name
  const navigate = useNavigate()
  const editDog = (id) => {
    setCurrentDogID(id) 
    navigate('/form')
  }
  const deleteDog = (id) => {
    fetch(`/api/dogs/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Problems deleting dog')
        getDogs()
        setCurrentDogID(null) 
      })
  }

  return (
    <div>
      <h2>Dogs Shelter</h2>
      <ul>
        {dogs.map((dog) => (
          <li key={dog.id}>
            {dog.name}, {dog.breed}, {dog.adopted ? 'adopted' : 'NOT adopted'}
            <div>
              <button onClick={() => editDog(dog.id)}>Edit</button>
              <button onClick={() => deleteDog(dog.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
