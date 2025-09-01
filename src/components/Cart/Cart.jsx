import { useContext, useEffect, useState } from "react"
import styles from "./Cart.module.css"
import { FaTrash } from "react-icons/fa"
import { CartContext } from "../../context/CartContext";

export default function Cart() {

    const { carrito, active, setActive, HandlerVaciarCarrito, handlerTrashButton } = useContext(CartContext)

    const totalPrice = carrito.reduce((acc, item) => {
        return acc + (Math.ceil(item.price) * item.quantity);
    }, 0);

    return (
        <>
            {/* fondo gris */}
            <div className={`${styles.grayBackground} ${active ? styles.show : ""}`} onClick={() => setActive(false)} ></div>

            {/* panel del carrito */}
            <div className={`${styles.cartContainer} ${active ? styles.open : ""}`}>
                <button className={` btn btn-dark ${styles.closeBtn}`} onClick={()=>setActive(false)}>X</button>
                <h5 className={styles.titleCarrito}>Resumen de tu compra</h5>
                {carrito.length ?
                    <>
                        <ul>
                            {carrito.map((product, index) => (
                                <li key={index} className={styles.liProduct}>
                                    <div className={styles.imgContainer}>
                                        <img src={product.images[0]} alt="" />
                                    </div>
                                    <div className={styles.infoProducts}>
                                        <span>{product.title}</span>
                                        <span>{product.quantity} x ${Math.ceil(product.price)}</span>
                                        <span><strong>Subtotal: ${product.quantity * Math.ceil(product.price)}</strong></span>
                                    </div>
                                    <div>
                                        <button className={` btn ${styles.customBtn} `} onClick={() => handlerTrashButton(product.id)}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                </li>))
                            }
                        </ul>
                        <p><strong>Total: ${totalPrice}</strong></p>
                        <button onClick={HandlerVaciarCarrito} className={` btn btn-dark ${styles.customBtnBgRed}`}>Vaciar carrito</button>
                    </>
                    : <p style={{paddingTop:"3rem"}}>No hay productos en el carrito</p>
                }
            </div>

        </>

    )
}