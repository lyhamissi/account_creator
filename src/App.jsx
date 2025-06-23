import { useState } from 'react'
import { BrowserRouter, Route, Router } from 'react-router-dom'
import Home from './Component/Home'


function App() {

  return (
    <>
    <BrowserRouter>
    <Router>
      <Route path='/home' element={<Home/>}/>
    </Router>
    </BrowserRouter>
     
    </>
  )
}

export default App
