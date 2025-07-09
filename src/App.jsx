import { useState } from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './Component/Home'
import Layout from './Component/Layout'
import './App.css'
import Contact from './Component/Contact'
import About from './Component/About'
import Login from './Component/Login'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
          </Route>
          <Route path='/login' element={<Login />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
