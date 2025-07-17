import { Link, useNavigate, useParams } from "react-router-dom"
import Loading from "../components/Loading/Loading"
import styles from "./DetailProduct.module.css"
import { useContext } from "react"
import { ProductContext } from "../context/ProductContext"


export default function DetailProduct() {

    const {products} = useContext(ProductContext)
    const { id } = useParams()
    const productSelected = products.find(product => product.id === id)
    const navigate = useNavigate()

    return (
        <>
            {productSelected ?
                (
                    <div>
                        <div className={styles.mainContainer}>
                            <img src={productSelected.images[2]} alt="" className={styles.imgContainer} />
                            <p className={styles.description}>{productSelected.description}</p>
                        </div>
                        <div className={styles.container}>
                            <button onClick={()=>navigate(-1)} className={styles.back}>Volver al inicio</button>
                        </div>
                    </div>
                )
                : <Loading />}

        </>
    )
}