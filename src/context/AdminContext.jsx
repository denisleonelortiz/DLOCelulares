import { createContext, useContext, useState } from "react";
import { ProductContext } from "./ProductContext";
import Swal from "sweetalert2";




export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {

    const [showForm, setShowFormAdd] = useState(false)
    const [product, setProduct] = useState({
        title: '',
        price: '',
        images: [],
        description: ''
    })
    const [errors, setErrors] = useState({})
    const [openEditor, setOpenEditor] = useState(false)
    const [productSelected, setProductSelected] = useState({
        title: "",
        price: "",
        images: "",
        description: ""
    })
    const [editedProduct, setEditedProduct] = useState("")


    const { updateProducts } = useContext(ProductContext)

    const validateInputs = (p) => {
        const newErrors = {}
        if (!p.title.trim()) newErrors.title = "Se requiere un nombre"
        if (!p.price || p.price <= 0) newErrors.price = "Debe tener un precio válido"
        if (!p.images.length) newErrors.images = "Debe tener una imagen del producto"
        if (!p.description.trim()) newErrors.description = "Completar con una descripcion del producto"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleOpenEditor = (p) => {
        setProductSelected(p)
        setOpenEditor(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validateInputs(product)) {
            try {
                const res = await fetch('https://68520aa18612b47a2c0beb0b.mockapi.io/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(product)
                })
                if (!res.ok) throw new Error("Error al agregar el producto")
                const data = await res.json()
                updateProducts()
                console.log("Producto agregado:", data);

                await Swal.fire({
                    title: "Buen trabajo!",
                    text: `Producto agregado correctamente: ${JSON.stringify(data.title)}`,
                    icon: "success",
                    scrollbarPadding: false
                })
                
                // alert(`Producto agregado correctamente: ${JSON.stringify(data.title)}`)
                setProduct({
                    title: '',
                    price: '',
                    images: '',
                    description: ''
                })
                setShowFormAdd(false)
            } catch (error) {
                console.error(error.message)
                Swal.fire({
                    title: "Ups!",
                    text: "Hubo un problema al agregar el producto",
                    icon: "error"
                })
                // alert("Hubo un problema al agregar el producto")
            }
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: name === "images" ? [value] : value })
    }

    const deleteProduct = async (p) => {
        // const accept = window.confirm(`¿Estas seguro de borrar ${p.title}?`)

        const accept = await Swal.fire({
            title: `¿Estas seguro que quieres borrar el producto ${p.title}?`,
            text: "Esta accion no se puede revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, quiero borrarlo!",
            cancelButtonText: "No, cancelar",
            scrollbarPadding: false
        })

        if (accept.isConfirmed) {
            try {
                const res = await fetch(`https://68520aa18612b47a2c0beb0b.mockapi.io/products/${p.id}`, {
                    method: "DELETE"
                })
                if (!res.ok) {
                    throw new Error("Error al intentar borrar el producto")
                }
                const data = await res.json()
                await updateProducts()
                console.log("producto eliminado:", data);
                Swal.fire({
                    title: "Operación exitosa",
                    text: "Producto eliminado correctamente",
                    icon: "success",
                    scrollbarPadding: false
                })
                // alert("Producto eliminado correctamente")
            } catch (error) {
                error.message
            }
        }
    }

    const handleSubmitEditProduct = async (e) => {
        e.preventDefault()
        if (validateInputs(editedProduct)) {
            try {
                const res = await fetch(`https://68520aa18612b47a2c0beb0b.mockapi.io/products/${productSelected.id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(editedProduct),
                    }
                )

                if (!res.ok) {
                    throw new Error('Error al actualizar el producto')
                }

                const data = await res.json()
                await Swal.fire({
                    title: "Buen trabajo!",
                    text: `Producto modificado correctamente: ${JSON.stringify(data.title)}`,
                    icon: "success",
                    scrollbarPadding: false
                })

               



                setOpenEditor(false)
                setProductSelected(null)
                updateProducts()
            } catch (error) {
                console.error(error.message)
            }
        }
    }

 
    return (
        <AdminContext.Provider value={{ showForm, setShowFormAdd, errors, setErrors, product, validateInputs, handleSubmit, handleChange, handleOpenEditor, openEditor, productSelected, setOpenEditor, setProductSelected, deleteProduct, handleSubmitEditProduct, setEditedProduct, editedProduct }}>
            {children}
        </AdminContext.Provider>
    )
}