import { useContext, useState } from "react"
import styles from "./FormEdition.module.css"
import { AdminContext, AdminProvider } from "../../context/AdminContext"
import { ProductContext } from "../../context/ProductContext"
import Swal from "sweetalert2"

export default function FormEdition() {

    const { productSelected, setOpenEditor, setProductSelected, validateInputs, errors } = useContext(AdminContext)
    const { updateProducts } = useContext(ProductContext)

    const [editedProduct, setEditedProduct] = useState(productSelected)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value })
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
                Swal.fire({
                    title: "Buen trabajo!",
                    text: `Producto modificado correctamente: ${JSON.stringify(data.title)}`,
                    icon: "success",
                    scrollbarPadding: false
                })
                // alert('Producto modificado correctamente')
                console.log(data);

                setOpenEditor(false)
                setProductSelected(null)
                updateProducts()
            } catch (error) {
                console.error(error.message)
            }
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center">

        <form className={styles.addForm} onSubmit={handleSubmitEditProduct}>
            <div className={styles.containerBtnClose}>
                <button className={styles.closeBtn} onClick={() => setOpenEditor(false)}>x</button>
            </div>
            <div className=" mb-3">
                <h2>Editar Producto</h2>
            </div>
            <div className={styles.itemForm}>
                <div className={styles.nameInput}>
                    <label htmlFor="">Nombre :</label>
                </div>
                <div className={styles.inputContainer}>
                    <input type="text" name="title" value={editedProduct.title} className={styles.input} onChange={handleChange} />
                    {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}
                </div>
            </div>
            <div className={styles.itemForm}>
                <div className={styles.nameInput}>
                    <label htmlFor="">Precio :</label>
                </div>
                <div className={styles.inputContainer}>
                    <input type="number" name="price" value={Math.ceil(editedProduct.price)} className={styles.input} onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.price || ""}</span>
                </div>
            </div>
            <div className={styles.itemForm}>
                <div className={styles.nameInput}>
                    <label htmlFor="">Imagen (URL) :</label>
                </div>
                <div className={styles.inputContainer}>
                    <input type="text" name="images" value={editedProduct.images} className={styles.input} onChange={handleChange} />
                    {errors.images && <span style={{ color: "red" }}>{errors.images}</span>}
                </div>
            </div>
            <div className={styles.itemForm}>
                <div className={styles.nameInput}>
                    <label htmlFor="">Descripción :</label>
                </div>
                <div className={styles.inputContainer}>
                    <textarea type="text" name="description" value={productSelected.description} placeholder="Escriba descripción del producto" className={styles.textarea} onChange={handleChange} />
                    {errors.description && <span style={{ color: "red" }}>{errors.description}</span>}
                </div>
            </div>
            <button className={styles.addBtn} type="submit">Aceptar</button>
        </form>
        </div>
        // <div className=" container">
        //     <form className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: "600px" }} onSubmit={handleSubmitEditProduct}>

        //         <div className="d-flex justify-content-end mb-3">
        //             <button type="button" className="btn-close" onClick={() => setOpenEditor(false)} aria-label="Close"></button>
        //         </div>

        //         <div className="mb-4 text-center">
        //             <h2>Editar Producto</h2>
        //         </div>

        //         <div className="mb-3">
        //             <label className="form-label">Nombre:</label>
        //             <input
        //                 type="text"
        //                 name="title"
        //                 value={editedProduct.title}
        //                 className="form-control"
        //                 onChange={handleChange}
        //             />
        //             {errors.title && <div className="text-danger">{errors.title}</div>}
        //         </div>

        //         <div className="mb-3">
        //             <label className="form-label">Precio:</label>
        //             <input
        //                 type="number"
        //                 name="price"
        //                 value={Math.ceil(editedProduct.price)}
        //                 className="form-control"
        //                 onChange={handleChange}
        //             />
        //             {errors.price && <div className="text-danger">{errors.price}</div>}
        //         </div>

        //         <div className="mb-3">
        //             <label className="form-label">Imagen (URL):</label>
        //             <input
        //                 type="text"
        //                 name="images"
        //                 value={editedProduct.images}
        //                 className="form-control"
        //                 onChange={handleChange}
        //             />
        //             {errors.images && <div className="text-danger">{errors.images}</div>}
        //         </div>

        //         <div className="mb-4">
        //             <label className="form-label">Descripción:</label>
        //             <textarea
        //                 name="description"
        //                 value={productSelected.description}
        //                 placeholder="Escriba descripción del producto"
        //                 className="form-control"
        //                 onChange={handleChange}
        //                 rows={4}
        //             />
        //             {errors.description && <div className="text-danger">{errors.description}</div>}
        //         </div>

        //         <button type="submit" className="btn btn-primary w-100">Aceptar</button>
        //     </form>
        // </div>
        
    )
}