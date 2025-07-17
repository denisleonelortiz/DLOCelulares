import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"
import './App.css'
import NavBar from './components/NavBar/NavBar'
import Cart from './components/Cart/Cart'
import Home from './Pages/Home'
import Contact from './Pages/Contact'
import AboutUs from './Pages/AboutUs'
import DetailProduct from './Pages/DetailProduct'
import Admin from './Pages/Admin'
import RutaProtegida from './components/Auth/RutaProtegida'
import Login from './Pages/Login'
import Footer from './components/Footer/Footer'
import { Toaster } from 'react-hot-toast'



function App() {

  const location = useLocation()
  const hideNavBar = location.pathname === "/login" || location.pathname === "/admin"

  return (
    <div className="main">
      {!hideNavBar && (
        <>
          <NavBar />
          <Cart />
        </>
      )
      }

      <div className="mainContent">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/product/:id' element={<DetailProduct />} />
          <Route path='/admin' element={<RutaProtegida> <Admin /> </RutaProtegida>} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>

      {!hideNavBar && <Footer />}

      <Toaster
        position='top-<right>'
        toastOptions={{
          duration: 2500,
        }}
      />

    </div>
  )
}

export default App
