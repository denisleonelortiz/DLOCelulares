import CardProduct from "../CardProduct/CardProduct"
import styles from "./ListProduct.module.css"

export default function ListProducts ({products, handlerAddButton, handlerIncrease, handlerDecrease, carrito}) {
    
    return (
        <div className={styles.cardsContainer}>
            {products.map(item => <CardProduct product={item} key={item.id} handlerAddButton={handlerAddButton} handlerIncrease={handlerIncrease} handlerDecrease={handlerDecrease} carrito={carrito}/>)}
        </div>
    )
}