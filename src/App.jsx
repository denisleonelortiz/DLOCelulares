import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
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
import Header from './components/Header/Header'



function App() {

  const [carrito, setCarrito] = useState([])
  const [active, setActive] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  

  function handlerTrashButton (id) {
        const newProductsOnCart = carrito.filter(product => product.id !== id)
        setCarrito(newProductsOnCart)
    }

  function handlerAddButton(product) {
    let newProduct = { ...product, quantity: 1 }
    setCarrito([...carrito, newProduct])
  }

  function handlerIncrease(product) {
    let newCarrito = carrito.map(item =>
      item.id === product.id ?
        { ...item, quantity: item.quantity + 1 }
        : item
    )
    setCarrito(newCarrito)
  }

  function handlerDecrease(product) {
    let newCarrito = carrito
      .map(item => {
        if (item.id === product.id) {
          if (item.quantity >= 1) {
            return { ...item, quantity: item.quantity - 1 }
          }
        }
        return item
      }
      )
      .filter(item => item.quantity > 0)
    setCarrito(newCarrito)
  }

  function HandlerVaciarCarrito() {
    setCarrito([])
  }



  useEffect(() => {
    fetch('https://dummyjson.com/products/category/smartphones')
      .then(res => res.json())
      .then(dataApi => {
        setData(dataApi.products)
        setLoading(false)
      })
      .catch(error => console.error("Error:", error))
  }, [])


  return (
    <div >
      <Header />
      <NavBar carrito={carrito} active={active} setActive={setActive} />
      <Cart active={active} products={carrito} HandlerVaciarCarrito={HandlerVaciarCarrito} handlerTrashButton={handlerTrashButton} />
      <Routes>
        <Route path='/' element={<Home loading={loading} products={data} handlerAddButton={handlerAddButton} handlerIncrease={handlerIncrease} handlerDecrease={handlerDecrease} carrito={carrito} />} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/product/:id' element={<DetailProduct products={data}/>}/>
        <Route path='/admin' element={<RutaProtegida isAuthenticated={isAuthenticated}> <Admin/> </RutaProtegida>}  />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
