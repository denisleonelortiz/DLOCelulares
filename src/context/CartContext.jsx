import { createContext, useState } from "react";
import toast from "react-hot-toast";


export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [carrito, setCarrito] = useState([])
    const [active, setActive] = useState(false)

    const handlerTrashButton = (id) => {
        const newProductsOnCart = carrito.filter(product => product.id !== id)
        setCarrito(newProductsOnCart)
        toast.error("Producto eliminado del carrito")
    }

    const HandlerVaciarCarrito = () => {
        setCarrito([])
        toast.error("Carrito vacío")

    }

    return (
        <CartContext.Provider value={{ carrito, setCarrito, active, setActive, handlerTrashButton, HandlerVaciarCarrito }}>
            {children}
        </CartContext.Provider>
    )
}