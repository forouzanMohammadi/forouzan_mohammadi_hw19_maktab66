import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Countries from './components/Countries'
import Header from './components/Header'
import Country from './components/Country'
import NotFound from './components/NotFound'
import Borders from './components/Borders'


function App() {

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/" element={<Countries />} />
        <Route path="Countries" element={<Countries />} />
        <Route path="Countries/:name" element={<Country />} />
        <Route path="Countries/:alpha2Code" element={<Borders />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
