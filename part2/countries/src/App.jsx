import { useState, useEffect } from 'react'
import axios from "axios"
import Country from './Country'


const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  useEffect(() => loadFrontEnd(), [])

  const loadFrontEnd = () => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
      .catch(error => {
        console.error('Error fetching countries:', error);
      })
  }

  const updateFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const filteredCountries = countries.filter(
    country => country.name.common.toLowerCase().includes(filter)
  )

  const countriesToShow = (filteredCountries) => {
    if (filteredCountries.length > 10){
      return <p>Too many matches, specify another filter</p>
    }
    else {
      return(filteredCountries.map(
        countryData => <Country key={countryData.cca3} countryData={countryData}/>
        ))
      }
    }

  return (
    <div>find countries: <input onChange={updateFilter}></input>
      {countriesToShow(filteredCountries)}
    </div>
  )
}

export default App