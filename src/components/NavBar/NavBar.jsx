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
    const { setProductToSearch } = useContext(ProductContext)

    const totalProducts = carrito.reduce((acc, item) =>
        acc + item.quantity
        , 0)

    return (
        // <nav className={styles.navBarContainer}>
        //     <div className={styles.divNamePage}>
        //         <Link className={styles.namePage}>DLO Celulares</Link>
        //     </div>
        //     <div className={styles.divInputSearch}>
        //         <input
        //             type="search"
        //             onChange={(e)=>setProductToSearch(e.target.value)}
        //             className={styles.inputSearch}
        //             placeholder="Buscar..." />
        //     </div>
        //     <div className={styles.menuNav}>
        //         <Link to="/" className={styles.linkNav}>Inicio</Link>
        //         <Link to="/contact" className={styles.linkNav}>Contacto</Link>
        //         <Link to="/about" className={styles.linkNav}>Nosotros</Link>
        //         <button onClick={() => setActive(!active)} className={styles.miCarrito}> <FaShoppingCart /> {totalProducts}</button>
        //         <Link to="/login" className={styles.linkNav}>Iniciar Sesión</Link>
        //     </div>
        // </nav>

        <nav className="navbar navbar-expand-lg bg-body-tertiary py-0 sticky-top">
            <div className="container-fluid mt-0 bg-black  py-2">
                {/* <a class="navbar-brand" href="#">Dlo Celulares</a> */}
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
                    <input className="form-control" type="search" placeholder="Buscar" aria-label="Search" onChange={(e) => setProductToSearch(e.target.value)} />
                </form>

                <div className="collapse navbar-collapse bg-black" id="navbarSupportedContent">
                    <form className="d-flex d-lg-none" role="search">
                        <input className="form-control" type="search" placeholder="Buscar" aria-label="Search" onChange={(e) => setProductToSearch(e.target.value)} />
                    </form>
                    <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                        <li className="nav-item">
                            <Link to="/" className={`nav-link ${styles.linkNav}`}>Inicio</Link>
                            {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className={`nav-link ${styles.linkNav}`}>Contacto</Link>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li> */}
                        {/* <li className="nav-item">
                            <Link to="/about" className={`nav-link ${styles.linkNav}`}>Nosotros</Link>
                        </li> */}
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

        // <nav class="navbar navbar-expand-lg bg-body-tertiary">
        //     <div class="container-fluid">
        //         <a class="navbar-brand" href="#">Navbar</a>
        //         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //             <span class="navbar-toggler-icon"></span>
        //         </button>
        //         <div class="collapse navbar-collapse" id="navbarSupportedContent">
        //             <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        //                 <li class="nav-item">
        //                     <a class="nav-link active" aria-current="page" href="#">Home</a>
        //                 </li>
        //                 <li class="nav-item">
        //                     <a class="nav-link" href="#">Link</a>
        //                 </li>
        //                 <li class="nav-item dropdown">
        //                     <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        //                         Dropdown
        //                     </a>
        //                     <ul class="dropdown-menu">
        //                         <li><a class="dropdown-item" href="#">Action</a></li>
        //                         <li><a class="dropdown-item" href="#">Another action</a></li>
        //                         <li><hr class="dropdown-divider" /></li>
        //                         <li><a class="dropdown-item" href="#">Something else here</a></li>
        //                     </ul>
        //                 </li>
        //                 <li class="nav-item">
        //                     <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        //                 </li>
        //             </ul>
        //             <form class="d-flex" role="search">
        //                 <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        //                 <button class="btn btn-outline-success" type="submit">Search</button>
        //             </form>
        //         </div>
        //     </div>
        // </nav>
    )
}