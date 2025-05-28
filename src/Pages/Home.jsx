import Loading from "../components/Loading/Loading"
import ListProducts from "../components/ListProduct/ListProducts"

export default function Home({ loading, products, handlerAddButton, handlerIncrease, handlerDecrease, carrito }) {
    return (
        <>
            {loading ?
                <Loading />
                : <ListProducts products={products} handlerAddButton={handlerAddButton} handlerIncrease={handlerIncrease} handlerDecrease={handlerDecrease} carrito={carrito} />
            }
        </>
    )
}