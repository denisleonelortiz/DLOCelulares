import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { CardProductProvider } from './context/CardProductContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { AdminProvider } from './context/AdminContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <CartProvider>
        <CardProductProvider>
          <AuthProvider>
            <AdminProvider>
              <Router>
                <App />
              </Router>
            </AdminProvider>
          </AuthProvider>
        </CardProductProvider>
      </CartProvider>
    </ProductProvider>
  </StrictMode>,
)
