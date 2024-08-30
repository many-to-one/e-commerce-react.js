import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Products from './components/Products';
import UsersList from './components/UsersList';
import ProductDetail from './components/single/ProductDetail ';
import Layout from './components/Layout';
import Header from './components/Header';
import Home from './components/Home';
import { UserProvider } from './context/userContext';
import { CartProvider } from './context/cartContext';
import Cart from './components/Cart';
import PayPage from './components/PayPage';

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
        <Route path="/product" element={<ProductDetail />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<PayPage />} />
      </Routes>
    </>
  );
}

export default function AppWithRouter() {
  return (
    <div className="App">
      <UserProvider>
        <CartProvider>
        <Router>
          <App />
        </Router>
        </CartProvider>
      </UserProvider>
    </div>
  );
}
