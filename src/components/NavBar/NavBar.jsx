import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"

export default function NavBar ({carrito, active, setActive}) {

    const totalProducts = carrito.reduce((acc, item) => 
            acc + item.quantity
        , 0)

    return (
        <nav className={styles.headerContainer}>
            <Link to="/">Inicio</Link>
            <Link to="/contact">Contacto</Link>
            <Link to="/about">Acerca de nosotros</Link>
            <button onClick={()=>setActive(!active)} className={styles.miCarrito}>Mi Carrito: {totalProducts}</button>
        </nav>
    )
}