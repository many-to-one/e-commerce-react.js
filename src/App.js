import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes 
} from 'react-router-dom';
import Login from './components/Login';
import Products from './components/Products';
import UsersList from './components/UsersList ';
import ProductDetail from './components/single/ProductDetail ';

function App() {
  return (
    <div className="App">
    <Router>
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/product" element={<ProductDetail />} />
      <Route path="/users" element={<UsersList />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
  </div>
  );
}

export default App;
