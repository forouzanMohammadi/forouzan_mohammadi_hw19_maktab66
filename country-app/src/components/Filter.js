import React, { useContext, useRef} from 'react'
import { ThemeContext } from './ThemContext'

export default function Filter({ searchCountries, searchInput, fetchData, setCountries}) {
  const { lightMode } = useContext(ThemeContext)
  const regionRef = useRef()

  const selectRegion=()=>{
    const selectValue = regionRef.current.value;
    if(selectValue.trim()){
      const fetchSelect = async()=>{
        const response = await fetch(`https://restcountries.com/v2/region/${selectValue}`)
        const data = await response.json();
        if(selectValue === "All"){
          try{
            fetchData()
          }catch(error){
            console.log(error);
          }
          return;
        }
        setCountries(data)
      }
      try{
        fetchSelect();
      }catch(error){
        console.log(error);
      }
    }
  }

  return (
    <div className={lightMode ? 'light-theme' : ''}>
      <section className="filter">
        <form className={lightMode ? 'form-control-light' : 'form-control'}>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="🔎 Search for a country..."
            value={searchInput}
            onChange={(e) => searchCountries(e.target.value)}
          />
        </form>

        <div className={lightMode ? 'region-filter-light' : 'region-filter'}>
          <select
            name="select"
            id="select"
            className="select"
            ref={regionRef}
            onChange={selectRegion}
          >
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </section>
    </div>
  )
}
