import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Products from './components/Products';
import UsersList from './components/UsersList';
import ProductDetail from './components/single/ProductDetail ';
import Layout from './components/Layout';
import Header from './components/Header';
import Home from './components/Home';
import { UserProvider } from './context/userContext';
import { CategoryProvider } from './context/CategoryContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/cartContext';
import Cart from './components/Cart';
import PayPage from './components/PayPage';
import Addproduct from './components/Addproduct';
import Admin from './components/Admin';
import ProductsAdmin from './components/admin_components/ProductsAdmin';
import ProductAdmin from './components/admin_components/ProductAdmin';
import UpdateProductAdmin from './components/admin_components/UpdateProductAdmin';



function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add_product" element={<Addproduct />} />
        <Route path="/product" element={<ProductDetail />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<PayPage />} />
        <Route path="/admin_panel" element={<Admin />} />
        <Route path="/products_admin" element={<ProductsAdmin />} />
        <Route path="/product_admin" element={<ProductAdmin />} />
        <Route path="/update_product_admin" element={<UpdateProductAdmin />} />
      </Routes>
    </>
  );
}

export default function AppWithRouter() {
  return (
    // <div className="App">
      <UserProvider>
        <CategoryProvider>
          <ProductProvider>
            <CartProvider>
              <Router>
                <App />
              </Router>
            </CartProvider>
          </ProductProvider>
        </CategoryProvider>
      </UserProvider>
    // </div>
  );
}
