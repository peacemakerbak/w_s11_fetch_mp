import React, { useState, useEffect } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import DogForm from './DogForm'
import DogsList from './DogsList'

export default function App() {
  const [dogs, setDogs] = useState([])
  const [currentDogID, setCurrentDogID] = useState(null)
  
  useEffect(() => {
    getDogs()
  }, []) // Ensure the fetch function is called when the component mounts

  const getDogs = () => {
    fetch('/api/dogs')
      .then(res => {
        if (!res.ok) throw new Error('Problems getting dogs')
        return res.json()
      })
      .then(dogs => setDogs(dogs))
      .catch(err => console.error(err))
  }

  return (
    <div>
      <nav>
        <NavLink to="/">Dogs</NavLink>
        <NavLink to="/form">Form</NavLink>
      </nav>
      <Routes>
        <Route 
          path="/" 
          element={<DogsList
            dogs={dogs}
            getDogs={getDogs}
            setCurrentDogID={setCurrentDogID}
          />} 
        />
        <Route 
          path="/form" 
          element={<DogForm 
            dog={currentDogID && dogs.find(dog => dog.id === currentDogID)} 
            getDogs={getDogs}
            reset={() => setCurrentDogID(null)}
          />} 
        />
      </Routes>
    </div>
  )
}
