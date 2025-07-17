import { useContext, useState } from "react"
import CardProduct from "../CardProduct/CardProduct"
import styles from "./ListProduct.module.css"
import { ProductContext } from "../../context/ProductContext"

export default function ListProducts() {

    const [paginaActual, setPaginaActual] = useState(1)
    const { products, productToSearch } = useContext(ProductContext)

    const productsFiltered = products.filter((product) => product.title.toLowerCase().includes(productToSearch.toLowerCase()))

    const cantidadDeProductosPorPagina = 10;
    const cantidadDePaginas = Math.ceil(productsFiltered.length / 10)
    const ultimoProducto = paginaActual * cantidadDeProductosPorPagina
    const primerProducto = ultimoProducto - cantidadDeProductosPorPagina
    const productosParaMostrar = productsFiltered.slice(primerProducto, ultimoProducto)

    const paginaAnterior = () => {
        setPaginaActual(prev => prev > 1 ? prev - 1 : prev)
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const paginaSiguiente = () => {
        setPaginaActual(prev => prev < cantidadDePaginas ? prev + 1 : prev)
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.cardsContainer}>
                {productsFiltered.length > 0 ? (
                    productosParaMostrar.map(item => <CardProduct product={item} key={item.id} />)
                ) : (
                    <p>No hay resultados para la búsqueda...</p>
                )}
            </div>
            <nav className={`${productosParaMostrar.length === 0 ? "d-none" : ""}`}>
                <ul className="pagination">
                    <li className="page-item">
                        <button className={`page-link text-black ${paginaActual === 1 ? "disabled" : ""}`} onClick={paginaAnterior}>
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    {Array.from({ length: cantidadDePaginas }, (e, index) =>
                        <li className="page-item" key={index}>
                            <button className={`page-link text-black ${index + 1 === paginaActual ? 'active' : ''}`} onClick={() => {
                                setPaginaActual(index + 1)
                                window.scrollTo({ top: 0, behavior: "smooth" });

                            }}>
                                {index + 1}
                            </button>
                        </li>)}
                    <li className="page-item">
                        <button className={`page-link text-black ${paginaActual === cantidadDePaginas ? "disabled" : ""}`} onClick={paginaSiguiente}>
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}   