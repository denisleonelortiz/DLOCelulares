import { useContext, useEffect, useState, useRef } from "react"
import styles from "./CardProduct.module.css"
import { Link } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import { CardProductContext } from "../../context/CardProductContext"

export default function CardProduct({ product }) {

    const { title, price, images, id } = product
    const [quantity, setQuantity] = useState(0)
    const { carrito } = useContext(CartContext)
    const { handlerAddButton, handlerIncrease, handlerDecrease } = useContext(CardProductContext)
    const addBtnRef = useRef(null)
    const [showAddBtn, setShowAddBtn] = useState(true);

    useEffect(() => {
        let newQuantity = carrito.find(item => item.id === product.id)?.quantity || 0

        setQuantity(newQuantity)
    }, [carrito])

    useEffect(() => {
        if (addBtnRef.current) {
            addBtnRef.current.blur(); // quita el estado activo del botón al renderizar
        }
    }, [quantity]);


    const handleDecrease = () => {
        handlerDecrease(product);
        setShowAddBtn(false);
        setTimeout(() => setShowAddBtn(true), 50); // 50ms de retraso evita el pseudo-hover
    };


    return (
        <div className={styles.container}>
            <Link to={`/product/${id}`}>
                <div className={styles.imgContainer}>
                    <img src={images[0]} alt="" className={styles.img} />
                </div>
            </Link>
            <h2>${Math.ceil(price)}</h2>
            <h2>{title}</h2>

            <div className={styles.btnContainer}>
                {quantity === 0 ?
                    <button className={styles.button} onClick={() => handlerAddButton(product)} ref={addBtnRef} >Agregar al carrito</button>

                    : <>
                        <button className={`btn px-3 ${styles.btnRestSum}`} onClick={() => handleDecrease(product)} ref={addBtnRef}>-</button>
                        <span className=" m-auto">{quantity} en tu carrito</span>
                        <button className={`btn px-3 ${styles.btnRestSum}`} onClick={() => handlerIncrease(product)}>+</button>
                    </>
                }
            </div>
        </div>
    )
}