import { Link, useNavigate, useParams } from "react-router-dom"
import Loading from "../components/Loading/Loading"
import styles from "./DetailProduct.module.css"
import { useContext } from "react"
import { ProductContext } from "../context/ProductContext"
import { CardProductContext } from "../context/CardProductContext"


export default function DetailProduct() {

    const { products } = useContext(ProductContext)
    const { handlerAddButton } = useContext(CardProductContext)
    const { id } = useParams()
    const productSelected = products.find(product => product.id === id)
    const navigate = useNavigate()
    const descuento = 0.10
    const precio = Math.ceil(productSelected.price)

    return (
        <>
            {productSelected ?
                (
                    <div className=" mb-5">
                        <div className={styles.mainContainer}>
                            <img src={productSelected.images[2]} alt="" className={styles.imgContainer} />
                            <div>
                                <h1>{productSelected.title}</h1>
                                <h5 className=" me-2">${precio}</h5>
                                <hr />
                                <span></span>
                                <p className={styles.description}>{productSelected.description}</p>

                            </div>
                        </div>
                        <div className={styles.container}>
                            <button onClick={() => handlerAddButton(productSelected)} className={styles.back}>Agregar al carrito</button>
                        </div>
                    </div>
                )
                : <Loading />}

        </>
    )
}