import styles from "./Admin.module.css"
import { useContext, useState } from "react"
import { ProductContext } from "../context/ProductContext"
import { Link, useNavigate } from "react-router-dom"
import FormAdd from "../components/FormAdd/FormAdd"
import { AdminContext } from "../context/AdminContext"
import FormEdition from "../components/FormEdition/FormEdition"
import Loading from "../components/Loading/Loading"
import { AuthContext } from "../context/AuthContext"
import { FaBars } from "react-icons/fa6"




export default function Admin() {

    const { products, loading } = useContext(ProductContext)
    const { showForm, setShowFormAdd, setErrors, handleOpenEditor, openEditor, deleteProduct, handleSubmit, product, handleChange, errors, productSelected, setProductSelected, handleSubmitEditProduct, setEditedProduct, editedProduct, setOpenEditor } = useContext(AdminContext)
    const { setIsAuthenticated, isAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value })
    }

    const handleOnClickeditButton = (p) => {
        setProductSelected(p)
        setEditedProduct(p)
        setOpenEditor(true)

        const modalEl = document.getElementById('exampleModal');
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
    }

    const logOut = () => {
        localStorage.removeItem("isAuth")
        navigate("/")
        setTimeout(() => {
            localStorage.removeItem("isAuth");
            setIsAuthenticated(false);
        }, 50);
    }

    return (
        <>
            {loading ? <Loading /> :
                <div className=" w-100">
                    <nav className="navbar navbar-expand-lg bg-black sticky-top">
                        <div className="container">
                            <span className="navbar-brand text-white font-cursive fs-5 fw-bold">DLO Celulares</span>
                            <button className="navbar-toggler border border-white rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <FaBars color="white" />
                            </button>
                            <div className="collapse navbar-collapse gap-4" id="navbarNavAltMarkup">
                                {/* <div className="navbar-nav ms-auto">
                                    <button className={`nav-link text-white btn-border-lg border-white rounded ${styles.btnNav}`} aria-current="page" onClick={handleOnClick}>Agregar producto</button>
                                </div> */}
                                <div className="navbar-nav ms-auto">
                                    <button
                                        type="button"
                                        className="btn btn-dark"
                                        data-bs-toggle="modal"
                                        data-bs-target="#addProductModal"
                                    >
                                        Agregar producto
                                    </button>

                                </div>
                                <div className="navbar-nav">
                                    <button
                                        className="btn btn-dark"
                                        aria-current="page" 
                                        onClick={logOut}
                                    >
                                        Cerrar sesión
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div
                        className="modal fade"
                        id="addProductModal"
                        tabIndex="-1"
                        aria-labelledby="editProductModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content bg-dark text-white">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="editProductModalLabel">
                                        Agregar Producto
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>

                                <div className="modal-body ">
                                    <form onSubmit={handleSubmit}>
                                        {/* Nombre */}
                                        <div className="mb-3">
                                            <label className="form-label">Nombre</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={product.title}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                            {errors.title && <span className="text-danger">{errors.title}</span>}
                                        </div>

                                        {/* Precio */}
                                        <div className="mb-3">
                                            <label className="form-label">Precio</label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={product.price === '' ? '' : Math.ceil(product.price)}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                            {errors.price && <span className="text-danger">{errors.price}</span>}
                                        </div>

                                        {/* Imagen */}
                                        <div className="mb-3">
                                            <label className="form-label">Imagen (URL)</label>
                                            <input
                                                type="text"
                                                name="images"
                                                value={product.images}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                            {errors.images && <span className="text-danger">{errors.images}</span>}
                                        </div>

                                        {/* Descripción */}
                                        <div className="mb-3">
                                            <label className="form-label">Descripción</label>
                                            <textarea
                                                name="description"
                                                value={product.description}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Escriba descripción del producto"
                                            ></textarea>
                                            {errors.description && <span className="text-danger">{errors.description}</span>}
                                        </div>

                                        {/* Botón de envío */}
                                        <div className="d-flex justify-content-end">
                                            <button type="submit" className="btn btn-success">
                                                Aceptar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 style={{ color: "black", padding: "1rem 0" }}>Panel Administrativo</h1>
                    <div className={`${styles.listProducts} container`}>
                        {products.map((product, index) =>
                            <div key={index} className={styles.card}>
                                <div className={styles.productInformation}>
                                    <img src={product.images[0]} alt="" className={styles.img} />
                                    <span>{product.title}</span>
                                    <span>${Math.ceil(product.price)}</span>
                                </div>
                                <div className={styles.buttonsContainer}>
                                    {/* <button className={styles.btn} onClick={() => handleOpenEditor(product)}>Editar</button> */}
                                    <button
                                        type="button"
                                        className="btn btn-dark"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editProductModal"
                                        onClick={() => handleOnClickeditButton(product)}
                                    >
                                        Editar
                                    </button>
                                    <button className="btn btn-dark" onClick={() => deleteProduct(product)}>Eliminar</button>
                                </div>
                            </div>)}
                    </div>
                    {/* modal editar producto */}
                    <div
                        className="modal fade"
                        id="editProductModal"
                        tabIndex="-1"
                        aria-labelledby="editProductModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content bg-dark text-white">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="editProductModalLabel">
                                        Editar Producto
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>

                                <div className="modal-body ">
                                    <form onSubmit={handleSubmitEditProduct}>
                                        {/* Nombre */}
                                        <div className="mb-3">
                                            <label className="form-label">Nombre</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={editedProduct.title}
                                                onChange={handleChangeEdit}
                                                className="form-control"
                                            />
                                            {errors.title && <span className="text-danger">{errors.title}</span>}
                                        </div>

                                        {/* Precio */}
                                        <div className="mb-3">
                                            <label className="form-label">Precio</label>
                                            <input
                                                type="number"
                                                name="price"
                                                value={editedProduct.price === '' ? '' : Math.ceil(editedProduct.price)}
                                                onChange={handleChangeEdit}
                                                className="form-control"
                                            />
                                            {errors.price && <span className="text-danger">{errors.price}</span>}
                                        </div>

                                        {/* Imagen */}
                                        <div className="mb-3">
                                            <label className="form-label">Imagen (URL)</label>
                                            <input
                                                type="text"
                                                name="images"
                                                value={editedProduct.images}
                                                onChange={handleChangeEdit}
                                                className="form-control"
                                            />
                                            {errors.images && <span className="text-danger">{errors.images}</span>}
                                        </div>

                                        {/* Descripción */}
                                        <div className="mb-3">
                                            <label className="form-label">Descripción</label>
                                            <textarea
                                                name="description"
                                                value={editedProduct.description}
                                                onChange={handleChangeEdit}
                                                className="form-control"
                                                placeholder="Escriba descripción del producto"
                                            ></textarea>
                                            {errors.description && <span className="text-danger">{errors.description}</span>}
                                        </div>

                                        {/* Botón de envío */}
                                        <div className="d-flex justify-content-end">
                                            <button type="submit" className="btn btn-success" >
                                                Aceptar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}