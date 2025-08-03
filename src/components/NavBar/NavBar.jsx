import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { FaCartShopping } from "react-icons/fa6"
import { FaShoppingCart } from "react-icons/fa"
import { ProductContext } from "../../context/ProductContext"
import { FaBars } from 'react-icons/fa';



export default function NavBar() {

    const { carrito, active, setActive } = useContext(CartContext)
    const { setProductToSearch, productToSearch } = useContext(ProductContext)

    const totalProducts = carrito.reduce((acc, item) =>
        acc + item.quantity
        , 0)


    return (
        <>
            <div className="w-100 sticky-top">

                <nav className="navbar navbar-expand-lg bg-black ">
                    <div className="container">
                        <Link to={"/"} className={`navbar-brand ${styles.namePage}`}>DLO Celulares</Link>

                        {/* boton carrito y hamburguesa para pantallas chicas */}
                        <div>
                            <button onClick={() => setActive(!active)} className={` bg-black d-lg-none ${styles.miCarrito2}`} type="button">
                                <FaShoppingCart /> {totalProducts}
                            </button>

                            <button className="navbar-toggler border border-white rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                {/* <span className="navbar-toggler-icon"></span> */}
                                <FaBars color="white" />
                            </button>
                        </div>

                        <form className="position-absolute start-50 translate-middle-x d-none d-lg-block " role="search">
                            <input className="form-control" type="search" placeholder="Buscar" aria-label="Search" value={productToSearch} onChange={(e) => setProductToSearch(e.target.value)} />
                        </form>

                        <div className="collapse navbar-collapse bg-black" id="navbarSupportedContent">
                            <form className="d-flex d-lg-none" role="search">
                                <input className="form-control" type="search" placeholder="Buscar" aria-label="Search" value={productToSearch} onChange={(e) => setProductToSearch(e.target.value)} />
                            </form>
                            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                                <li className="nav-item">
                                    <Link to="/" className={`nav-link ${styles.linkNav}`}>Inicio</Link>
                                    {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
                                </li>
                                <li className="nav-item">
                                    <Link to="/contact" className={`nav-link ${styles.linkNav}`}>Contacto</Link>
                                </li>

                                <li className="nav-item">
                                    <button onClick={() => setActive(!active)} className={`nav-link d-none d-lg-block ${styles.miCarrito}`}> <FaShoppingCart /> {totalProducts}</button>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className={`nav-link ${styles.linkNav}`}>Iniciar sesion</Link>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}