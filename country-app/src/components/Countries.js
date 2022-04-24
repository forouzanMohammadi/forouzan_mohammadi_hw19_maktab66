import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from './ThemContext'
import Filter from './Filter'

export default function Countries() {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const { lightMode } = useContext(ThemeContext)

  useEffect(() => {
    try {
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const fetchData = async () => {
    const response = await fetch('https://restcountries.com/v2/all')
    const data = await response.json()
    setCountries(data)
  }

  const searchCountries = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput) {
      const filteredCountries = countries.filter((country) =>
        Object.values(country)
          .join('')
          .toLowerCase()
          .includes(searchValue.toLowerCase()),
      )
      setFiltered(filteredCountries)
    } else {
      setFiltered(countries)
    }
  }

  return (
    <>
      <Filter
        searchCountries={searchCountries}
        searchInput={searchInput}
        fetchData={fetchData}
        setCountries={setCountries}
      />
      {searchInput.length > 0 ? (
        <div className={lightMode ? 'light-theme' : ''}>
          <section className="grid">
            {filtered.map((country) => {
              const {
                name,
                population,
                region,
                capital,
                flag,
                numericCode,
              } = country
              return (
                <article key={numericCode}>
                  <Link to={`/Countries/${name}`}>
                    <div>
                      <div className={lightMode ? 'details-light' : 'details'}>
                        <img src={flag} alt={name} />
                        <div className="content">
                          <h3>{name}</h3>
                          <h4>
                            Population: <span>{population}</span>
                          </h4>
                          <h4>
                            Region: <span>{region}</span>
                          </h4>
                          <h4>
                            Capital: <span>{capital}</span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              )
            })}
          </section>
        </div>
      ) : (
        <div className={lightMode ? 'light-theme' : ''}>
          <section className="grid">
            {countries.map((country) => {
              const {
                name,
                population,
                region,
                capital,
                flag,
                numericCode,
              } = country
              return (
                <article key={numericCode}>
                  <Link to={`/Countries/${name}`}>
                    <div>
                      <div className={lightMode ? 'details-light' : 'details'}>
                        <img src={flag} alt={name} />
                        <div className="content">
                          <h3>{name}</h3>
                          <h4>
                            Population: <span>{population}</span>
                          </h4>
                          <h4>
                            Region: <span>{region}</span>
                          </h4>
                          <h4>
                            Capital: <span>{capital}</span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              )
            })}
          </section>
        </div>
      )}
    </>
  )
}
