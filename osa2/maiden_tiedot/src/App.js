import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = (props) => {
  return (
    <div>
      {props.country.name.common}
      <div>
        <button onClick={() => props.handleSelected(props.country)}>show</button>
      </div>
    </div>
  )
}

const Language = ({ language }) => {
  return (
    <li>
      {language}
    </li>
  )
}

const ShowCountry = ({ country }) => {
  const languages = Object.values(country.languages)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])
  console.log(weather)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {languages.map((language) =>
          <Language key={language} language={language} />
        )}
      </ul>
      <img
        src={country.flags.svg}
        height='150px'
        alt='flag'
      />
      <h2>Weather in {country.capital}</h2>
      <p>temperature {weather?.main.temp ?? ''} Celcius</p>
      {weather?.weather ? <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img> : <p>weather icon</p>}
      <p>wind {weather?.wind.speed ?? ''} m/s</p>

    </div>
  )
}

const Countries = (props) => {
  const searchedCountries = props.countries.filter(country => country.name.common.toLowerCase().indexOf(props.search.toLowerCase()) !== -1)

  if (searchedCountries.length > 10) {
    return 'too many matches, specify another filter'
  } else if (searchedCountries.length === 1) {
    return (
      <div>
        <ShowCountry country={searchedCountries[0]} />
      </div>
    )
  } else if (props.selected.length !== 0) {
    return (
      <div>
        <ShowCountry country={props.selected} />
      </div>
    )
  } else {
    return (
      <div>
        {searchedCountries.map(country =>
          <Country key={country.name.common} country={country} handleSelected={props.handleSelected}/>
        )}
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [selected, setSelected] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchCountry = (event) => {
    setSearchCountry(event.target.value)
    setSelected([])
  }

  const handleSelected = (country) => {
    setSelected(country)
  }

  return (
    <div>
      <form>
        <div>
          find countries:
          <input
            value={searchCountry}
            onChange={handleSearchCountry}
          />
        </div>
      </form>
      <Countries countries={countries} search={searchCountry} selected={selected} handleSelected={handleSelected}/>
    </div>
  )
}

export default App