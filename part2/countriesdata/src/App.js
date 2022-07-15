import { useState, useEffect }  from 'react'
import axios from 'axios'

import Result from './components/Result'

const App = () => {
  const [countriesInfo, setCountriesInfo] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountriesInfo(response.data)
      })
  },[])

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const handleSearchCountries = (e) => {
    setSearchQuery(e.target.value);
    let result = countriesInfo.filter(country => 
      country.name['common'].toLowerCase().includes(e.target.value.toLowerCase())
    )
    setSearchResult(result);
  }

  return (
    <div>
      find countries
      <input 
      value={searchQuery}
      onChange={handleSearchCountries}
      />
      <Result result={searchResult}/>
    </div>
  )
}

export default App;
