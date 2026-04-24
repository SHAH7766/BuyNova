import React from 'react'
import { RegisterProduct } from "./Pages/RegisterProduct"
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from "./Components/Navbar"
import Products from './Pages/Products'
import Detail from './Pages/Detail'
import Alluser from './Pages/Alluser'
import Login from './Pages/Login'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/register-product' element={<RegisterProduct />} />
          <Route path='/show-products' element={<Products />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/activeusers' element={<Alluser />} />
          <Route path='/' element={<h1>Home</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
