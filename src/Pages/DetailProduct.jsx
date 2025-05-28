import { Link, useNavigate, useParams } from "react-router-dom"
import Loading from "../components/Loading/Loading"
import styles from "./DetailProduct.module.css"


export default function DetailProduct({ products }) {
    const { id } = useParams()
    const productSelected = products.find(product => product.id === Number(id))
    const navigate = useNavigate()

    return (
        <>
            {productSelected ?
                (
                    <div >
                        <div className={styles.mainContainer}>
                            <img src={productSelected.images[2]} alt="" className={styles.imgContainer} />
                            <p className={styles.description}>{productSelected.description}</p>
                        </div>
                        <div className={styles.container}>
                            <button onClick={()=>navigate(-1)} className={styles.back}>Atrás</button>
                        </div>
                    </div>
                )
                : <Loading />}

        </>
    )
}