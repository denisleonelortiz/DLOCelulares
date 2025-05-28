import { useEffect, useState } from "react"
import styles from "./CardProduct.module.css"
import { Link } from "react-router-dom"

export default function CardProduct({ product, handlerAddButton, handlerIncrease, handlerDecrease, carrito }) {

    const { title, price, images, id } = product
    const [quantity, setQuantity] = useState(0)



    function handlerClicked() {
        handlerAddButton(product)
        setClicked(1)
    }

    function handlerRest() {
        handlerDecrease(product)
        setClicked(prev => prev - 1)
    }

    function handlerSum() {
        handlerIncrease(product)
        setClicked(prev => prev + 1)
    }

    useEffect(()=> {
        let newQuantity = carrito.find(item => item.id === product.id)?.quantity || 0
        setQuantity(newQuantity)
    },[carrito])



    return (
        <div className={styles.container}>
            <Link to={`/product/${id}`}>
                <div className={styles.imgContainer}>
                    <img src={images[0]} alt="" className={styles.img} />
                </div>
            </Link>
            <h2>${Math.ceil(price)}</h2>
            <h2>{title}</h2>
            {quantity === 0 ?
                <div className={styles.btnContainer}>
                    <button className={styles.button} onClick={() => handlerClicked()} >Agregar al carrito</button>
                </div>

                : <div className={styles.btnContainer}>
                    <button className={styles.btnRestSum} onClick={() => handlerRest()}>-</button>
                    <span>{quantity} en tu carrito</span>
                    <button className={styles.btnRestSum} onClick={() => handlerSum()}>+</button>
                </div>
            }
        </div>
    )
}