import React,{useContext} from 'react'
import { Outlet } from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMoon} from "@fortawesome/free-solid-svg-icons"
import { ThemeContext } from './ThemContext'


export default function Header() {
  const{lightMode, setLightMode}= useContext(ThemeContext)
  const handleTheme = () => {
    setLightMode(!lightMode)
  }

  return (
    <>
      <header className={lightMode? "header-light":"header"}>
        <div>
          <h1>Where in the world?</h1>
        </div>
        <div>
          <FontAwesomeIcon onClick={handleTheme} icon={faMoon}></FontAwesomeIcon>
          <span>&nbsp;Dark Mode</span>
        </div>
      </header>
      <Outlet />
    </>
  )
}
