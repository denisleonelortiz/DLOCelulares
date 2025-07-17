import { useContext, useEffect, useState } from "react"
import styles from "./Cart.module.css"
import { FaTrash } from "react-icons/fa"
import { CartContext } from "../../context/CartContext";

export default function Cart() {

    const { carrito, active, HandlerVaciarCarrito, handlerTrashButton } = useContext(CartContext)

    const totalPrice = carrito.reduce((acc, item) => {
        return acc + (Math.ceil(item.price) * item.quantity);
    }, 0);

    return (
        <>
            {active ?
                <div className={styles.cartContainer}>
                    <h4 className={styles.titleCarrito}>Carrito</h4>
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
                                            <button className={styles.trashButton} onClick={() => handlerTrashButton(product.id)}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </li>))
                                }
                            </ul>
                            <p><strong>Total: ${totalPrice}</strong></p>
                            <button onClick={HandlerVaciarCarrito} className={styles.btn}>Vaciar carrito</button>
                        </>
                        : <p>No hay productos en el carrito</p>
                    }
                </div>
                : null}
        </>

    )
}