import { useContext, useEffect, useState } from "react"
import styles from "./Login.module.css"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function Login() {

    const [credential, setCredential] = useState({ email: "", password: "" })
    const [error, setError] = useState({})
    const [validated, setValidated] = useState(false)
    const navigate = useNavigate()
    const { setIsAuthenticated } = useContext(AuthContext)

    useEffect(() => {
        if (localStorage.getItem("isAuth") === "true") {
            setIsAuthenticated(true)
            navigate("/admin")
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredential({ ...credential, [name]: value })

        if (error.credenciales) {
            setError({ credenciales: "" })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget;

        if (!form.checkValidity()) {
            e.stopPropagation();
        } else {
            // Aquí iría tu lógica de login si el formulario es válido
            try {
                const res = await fetch("/data/users.json")
                const users = await res.json()

                const userValidate = users.find(user => user.email === credential.email && user.password === credential.password)

                if (!userValidate) {
                    setError({ credenciales: "Credenciales inválidas" })
                } else if (userValidate.role === "admin") {
                    setIsAuthenticated(true)
                    localStorage.setItem("isAuth", "true")
                    navigate("/admin")
                } else {
                    navigate("/")
                }
            } catch (error) {
                console.log(error.message);
            }

        }
        setValidated(true);


        // const newErrors = {}
        // if (!credential.email) newErrors.email = "Se requiere un email"
        // if (!credential.password) newErrors.password = "Se requiere contraseña"
        // if (Object.keys(newErrors).length > 0) {
        //     setError(newErrors)
        //     return
        // }


    }

    return (
        // <div className="container d-flex justify-content-center align-items-center">
        //     <div className={styles.containerPadre}>
        //         <nav className={`navbar container-fluid fixed-top ${styles.navLogin}`}>
        //             <div class="container">
        //                 <Link to={"/"} className={`navbar-brand ${styles.namePage}`}>DLO Celulares</Link>
        //             </div>
        //         </nav>
        //         <div className="d-flex align-items-start justify-content-center mt-5 min-vh-100 ">
        //             <form className={`${styles.mainContainer} col-10`} onSubmit={handleSubmit}>
        //                 <div className={styles.spanInputContainer}>
        //                     <label>Usuario</label>
        //                     <input type="text" value={credential.email} name="email" placeholder="Escribir usuario" onChange={handleChange} className={styles.input} />
        //                     {error.email && <span style={{ color: "red" }}>{error.email}</span>}
        //                 </div>
        //                 <div className={styles.spanInputContainer}>
        //                     <label>Contraseña</label>
        //                     <input type="password" value={credential.password} name="password" placeholder="Escribir contraseña" onChange={handleChange} className={styles.input} />
        //                     {error.password && <span style={{ color: "red" }}>{error.password}</span>}
        //                 </div>
        //                 <button type="submit" className={styles.enterBtn}>Entrar</button>
        //                 {error.credenciales && <span style={{ color: "red" }}>{error.credenciales}</span>}
        //             </form>
        //         </div>
        //     </div>
        // </div>
        <div className=" bg-light w-100 d-flex flex-column align-items-center">
            <nav className="  w-100 bg-black d-flex align-items-center justify-content-center py-3 ">
                <Link to={"/"} className=" text-white text-decoration-none font-cursive fw-bold fs-5">DLO Celulares</Link>
            </nav>
            <div className={`bg-white p-5 border rounded shadow mt-2 ${styles.responsiveCard}`} style={{ width: "100%", maxWidth: "450px" }}>
                <h5>Ingresá a tu cuenta</h5>
                <button className=" btn btn-dark my-4 w-100">Ingresar con Google</button>
                <div className="d-flex align-items-center mb-4">
                    <div className="flex-grow-1 border-bottom"></div>
                    <span className="px-2">o con tu e-mail</span>
                    <div className="flex-grow-1 border-bottom"></div>
                </div>
                <form onSubmit={handleSubmit} className={` needs-validation ${validated ? "was-validated" : ""}`} noValidate>
                    <div className="form-floating mb-1">
                        <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" onChange={handleChange} autoComplete="username" required />
                        <label htmlFor="floatingInput">Email address</label>
                        <div class="invalid-feedback">Por favor ingresa un email válido.</div>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" onChange={handleChange} autoComplete="current-password" required />
                        <label htmlFor="floatingPassword">Password</label>
                        <div className="invalid-feedback">Por favor ingresa tu contraseña.</div>
                    </div>
                    <div className=" d-flex justify-content-end mb-1 mt-1">
                        <Link className=" text-decoration-none" style={{ fontSize: "0.9rem" }}>Olvidé mi contraseña</Link>
                    </div>
                    {error.credenciales && <div className=" alert alert-danger p-1" role="alert">{error.credenciales}</div>}
                    <button type="submit" className=" btn btn-dark w-100">INGRESAR</button>
                </form>
                <div className="d-flex align-items-center my-4">
                    <div className="flex-grow-1 border-bottom"></div>
                    <span className="px-2">o</span>
                    <div className="flex-grow-1 border-bottom"></div>
                </div>
                <div className=" fw-semibold mb-2">¿Aún no tienes cuenta?</div>
                <button className=" btn btn-dark w-100">Registrate con tu email</button>
            </div>
        </div>
    )
}