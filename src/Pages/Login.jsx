import { useContext, useEffect, useState } from "react"
import styles from "./Login.module.css"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function Login() {

    const [credential, setCredential] = useState({ email: "", password: "" })
    const [error, setError] = useState({})
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
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newErrors = {}
        if (!credential.email) newErrors.email = "Se requiere un email"
        if (!credential.password) newErrors.password = "Se requiere contraseña"
        if (Object.keys(newErrors).length > 0) {
            setError(newErrors)
            return
        }

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

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className={styles.containerPadre}>
                <nav className={`navbar fixed-top ${styles.navLogin}`}>
                    <div class="container-fluid">
                        <Link to={"/"} className={`navbar-brand ${styles.namePage}`}>DLO Celulares</Link>
                    </div>
                </nav>
                <div className="d-flex align-items-start justify-content-center mt-5 min-vh-100 ">
                    <form className={`${styles.mainContainer} col-10`} onSubmit={handleSubmit}>
                        <div className={styles.spanInputContainer}>
                            <label>Usuario</label>
                            <input type="text" value={credential.email} name="email" placeholder="Escribir usuario" onChange={handleChange} className={styles.input} />
                            {error.email && <span style={{ color: "red" }}>{error.email}</span>}
                        </div>
                        <div className={styles.spanInputContainer}>
                            <label>Contraseña</label>
                            <input type="password" value={credential.password} name="password" placeholder="Escribir contraseña" onChange={handleChange} className={styles.input} />
                            {error.password && <span style={{ color: "red" }}>{error.password}</span>}
                        </div>
                        <button type="submit" className={styles.enterBtn}>Entrar</button>
                        {error.credenciales && <span style={{ color: "red" }}>{error.credenciales}</span>}
                    </form>
                </div>
            </div>
        </div>
    )
}