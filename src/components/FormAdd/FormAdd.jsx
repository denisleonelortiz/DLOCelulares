import { useContext } from "react"
import { AdminContext } from "../../context/AdminContext"
import styles from "./FormAdd.module.css"


export default function FormAdd() {

    const { handleSubmit, handleChange, product, errors, setShowFormAdd  } = useContext(AdminContext)

    return (
        <form className={styles.addForm} onSubmit={handleSubmit}>
            <div className={styles.containerBtnClose}>
                <button className={styles.closeBtn} onClick={() => setShowFormAdd(false)}>x</button>
            </div>
            <div className=" mb-3">
                <h2>Nuevo Producto</h2>
            </div>
            <div className={styles.itemForm}>
                <div className={styles.nameInput}>
                    <label htmlFor="">Nombre :</label>
                </div>
                <div className={styles.inputContainer}>
                    <input type="text" name="title" value={product.title} className={styles.input} onChange={handleChange} />
                    {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}
                </div>
            </div>
            <div className={styles.itemForm}>
                <div className={styles.nameInput}>
                    <label htmlFor="">Precio :</label>
                </div>
                <div className={styles.inputContainer}>
                    <input type="number" name="price" value={product.price} className={styles.input} onChange={handleChange} />
                    <span style={{ color: "red" }}>{errors.price || ""}</span>
                </div>
            </div>
            <div className={styles.itemForm}>
                <div className={styles.nameInput}>
                    <label htmlFor="">Imagen (URL) :</label>
                </div>
                <div className={styles.inputContainer}>
                    <input type="text" name="images" value={product.images} className={styles.input} onChange={handleChange} />
                    {errors.images && <span style={{ color: "red" }}>{errors.images}</span>}
                </div>
            </div>
            <div className={styles.itemForm}>
                <div className={styles.nameInput}>
                    <label htmlFor="">Descripción :</label>
                </div>
                <div className={styles.inputContainer}>
                    <textarea type="text" name="description" value={product.description} placeholder="Escriba descripción del producto" className={styles.textarea} onChange={handleChange} />
                    {errors.description && <span style={{ color: "red" }}>{errors.description}</span>}
                </div>
            </div>
            <button className={styles.addBtn} type="submit">Agregar</button>
        </form>
    )
}