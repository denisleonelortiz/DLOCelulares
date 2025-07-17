import { createContext, useContext } from "react";
import { CartContext } from "./CartContext";
import toast from "react-hot-toast";


export const CardProductContext = createContext()

export const CardProductProvider = ({ children }) => {

    const {carrito, setCarrito} = useContext(CartContext)

    function handlerAddButton(product) {
        let newProduct = { ...product, quantity: 1 }
        setCarrito([...carrito, newProduct])
        toast.success("Producto agregado al carrito")
    }

    function handlerIncrease(product) {
        let newCarrito = carrito.map(item =>
            item.id === product.id ?
                { ...item, quantity: item.quantity + 1 }
                : item
        )
        setCarrito(newCarrito)
        toast.success("Producto agregado al carrito")
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
        toast.error ("Producto eliminado del carrito")
    }

    return (
        <CardProductContext.Provider value={{handlerAddButton, handlerIncrease, handlerDecrease}}>
            {children}
        </CardProductContext.Provider>
    )
}