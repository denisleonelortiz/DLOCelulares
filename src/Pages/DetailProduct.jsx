import { Link, useNavigate, useParams } from "react-router-dom"
import Loading from "../components/Loading/Loading"
import styles from "./DetailProduct.module.css"
import { useContext, useEffect, useState } from "react"
import { ProductContext } from "../context/ProductContext"
import { CardProductContext } from "../context/CardProductContext"
import ProductCarousel from "../components/ProductCarousel/ProductCarousel"
import { CartContext } from "../context/CartContext"


export default function DetailProduct() {
    const { carrito } = useContext(CartContext)
    const { products } = useContext(ProductContext)
    const { handlerAddButton, handlerIncrease, handlerDecrease } = useContext(CardProductContext)
    const { id } = useParams()
    const productSelected = products.find(product => product.id === id)
    const [quantity, setQuantity] = useState(0)
    const precio = Math.ceil(productSelected.price)


    useEffect(() => {
        let newQuantity = carrito.find(item => item.id === productSelected.id)?.quantity || 0

        setQuantity(newQuantity)
    }, [carrito])

    return (
        <>
            {productSelected ?
                (
                    <div className=" mb-5 w-100">
                        <div className={` flex-column ${styles.mainContainer}`}>
                            <div className=" w-100 flex-column flex-md-row-reverse">
                                <ProductCarousel images={productSelected.images} />
                            </div>
                            {/* <img src={productSelected.images[2]} alt="" className={styles.imgContainer} /> */}
                            <div className=" p-5 d-flex flex-column jus">
                                <div>
                                    <h2>{productSelected.title}</h2>
                                    <h3 className=" me-2">${precio}</h3>
                                    <hr />
                                    <p className={styles.description}>{productSelected.description}</p>
                                </div>
                                <div className=" mt-5 d-flex justify-content-center">
                                    <div className={styles.btnContainer}>
                                        {quantity === 0 ?
                                            <button className={styles.back} onClick={() => handlerAddButton(productSelected)} >Agregar al carrito</button>

                                            : <>
                                                <button className={styles.btnRestSum} onClick={() => handlerDecrease(productSelected)}>-</button>
                                                <span>{quantity} en tu carrito</span>
                                                <button className={styles.btnRestSum} onClick={() => handlerIncrease(productSelected)}>+</button>
                                            </>
                                        }
                                    </div>
                                </div>
                                {/* <button onClick={() => handlerAddButton(productSelected)} className={styles.back}>Agregar al carrito</button> */}
                            </div>
                        </div>
                        <div className={styles.container}>
                        </div>
                    </div>
                )
                : <Loading />}

        </>
    )
}