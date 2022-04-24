import React, { useState, useEffect,useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import { ThemeContext } from './ThemContext'


const Borders = () => {
  const [borders, setBorders] = useState([])
  const { alpha2Code} = useParams()
  const{lightMode}= useContext(ThemeContext)

  useEffect(() => {
    axios.get(`https://restcountries.com/v2/alpha/${alpha2Code}`).then((res) => {
      const borders = res.data
      setBorders(borders)
      console.log(borders);
    })
}, [alpha2Code])

  return (
    <div className={lightMode? "light-theme":""}>
      <section className="country">
        <Link to="/" className={lightMode? "btn btn-light":"btn btn-dark"}>
          <i className="fas fa-arrow-left"></i> Back Home
        </Link>
        {borders.map((c) => {
          const {
            numericCode,
            flag,
            name,
            nativeName,
            population,
            region,
            subregion,
            capital,
            topLevelDomain,
            currencies,
            languages,
            borders,
          } = c

          return (
            <article key={numericCode}>
              <div className="country-inner">
                <div className="flag">
                  <img src={flag} alt={name} />
                </div>

                <div className="country-details">
                  <div>
                    <h2>{name}</h2>
                    <h5>
                      Native Name: <span>{nativeName}</span>
                    </h5>
                    <h5>
                      Population: <span>{population.toLocaleString()}</span>
                    </h5>
                    <h5>
                      Region: <span>{region}</span>
                    </h5>
                    <h5>
                      Sub Region: <span>{subregion}</span>
                    </h5>
                    <h5>
                      Capital: <span>{capital}</span>{" "}
                    </h5>
                  </div>

                  <div>
                    <h5>
                      Top Level Domain: <span>{topLevelDomain}</span>
                    </h5>
                    {
                      currencies && <h5>Currencies: <span>{currencies[0].name}</span></h5>
                    }
                    
                    <h5>
                      Languages: <span>{languages[0].name}</span>
                    </h5>
                  </div>
                </div>
              </div>

              <div>
                <h3>Border Countries: </h3>
                <div className="borders">
                  {borders?.map((border) => {
                    return (
                      <ul key={border}>
                        <li className={lightMode? "border-list-light":"border-list-dark"}>{border}</li>
                      </ul>
                    )
                  })}
                </div>
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}

export default Borders;