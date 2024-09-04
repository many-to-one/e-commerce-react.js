import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <div class="d-flex flex-column mb-3">
        <div class="p-2">
            <Link to="/users_admin" className="nav-item nav-link">Użytkownicy</Link>
        </div>
        <div class="p-2">
            <Link to="/category_admin" className="nav-item nav-link">Kategorie</Link>
        </div>
        <div class="p-2">
            <Link to="/products_admin" className="nav-item nav-link">Produkty</Link>
        </div>
    </div>
  )
}

export default Admin