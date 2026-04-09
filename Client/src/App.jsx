import React from 'react'
import { RegisterProduct } from "./Pages/RegisterProduct"
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from "./Components/Navbar"
import Products from './Pages/Products'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/register-product' element={<RegisterProduct />} />
          <Route path='/show-products' element={<Products />} />
          <Route path='/' element={<h1>Home</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
