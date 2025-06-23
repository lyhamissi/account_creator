import { useState } from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './Component/Home'
import Layout from './Component/Layout'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
          <Route path='/home' element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
