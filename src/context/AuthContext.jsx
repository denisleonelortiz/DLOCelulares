import { createContext, useState } from "react";


export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
   const [isAuthenticated, setIsAuthenticated] = useState(()=>{
    return localStorage.getItem("isAuth") === "true"
   })

   return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
        {children}
    </AuthContext.Provider>
   )
}