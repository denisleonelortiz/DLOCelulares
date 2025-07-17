import Loading from "../components/Loading/Loading"
import ListProducts from "../components/ListProduct/ListProducts"
import { useContext } from "react"
import { ProductContext } from "../context/ProductContext"
import Pagination from "../components/Pagination/Pagination"

export default function Home() {

    const { loading } = useContext(ProductContext)

    return (
        <>
            {loading ?
                <Loading />
                : <ListProducts />

            }
        </>
    )
}