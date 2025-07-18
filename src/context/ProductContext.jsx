import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [productToSearch, setProductToSearch] = useState("")
    const location = useLocation()


    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await fetch('https://68520aa18612b47a2c0beb0b.mockapi.io/products')
                if (!res.ok) {
                    throw new Error('Error al obtener los datos de la API')
                }
                const data = await res.json()
                setProducts(data)
                setLoading(false)

            } catch (error) {
                console.error(error.message)
            }
        }
        fetchApi()
    }, [])

    useEffect(()=> {
        setProductToSearch("")
    },[location.pathname])

    const updateProducts = async () => {
        try {
            const res = await fetch('https://68520aa18612b47a2c0beb0b.mockapi.io/products')
            if (!res.ok) {
                throw new Error('Problema al cargar los productos')
            }
            const data = await res.json()
            setProducts(data)
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                updateProducts,
                productToSearch,
                setProductToSearch
            }}>
            {children}
        </ProductContext.Provider>
    )
}