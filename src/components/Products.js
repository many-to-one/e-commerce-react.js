import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import DEV_URL from '../config/DevConfig';
import Product from './single/Product';
import DEV_URL_R from '../config/ReactDevConfig';
import { useUser } from '../context/userContext';
import { useProduct } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import { useCategory } from '../context/CategoryContext';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';


const Products = () => {

  const { getMe, user} = useUser(); 
  const { getAllProducts} = useProduct(); 
  const { getAllCategories } = useCategory();
  const { getCart } = useCart(); 

  const [products, setProducts] = useState([]);
  const [productsMain, setProductsMain] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState(null);
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState(null);

  const token = Cookies.get('token');
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
        const res = await getAllCategories();
        console.log('fetchCategories in Products:', res);
        // setShowCategories(true)
        setCategories(res.data)
    } catch (error) {
        console.log('ERROR:', error)
        if ( error.status === 401 ) {
            console.log('Unauthorized:', error.status)
            navigate('/login');
        }
    }}

  useEffect(() => {
    fetchCategories();
  }, [token])



  const fetchProducts = async () => {
    try {
        const res = await getAllProducts();
        console.log('fetchProducts:', res)
        setProducts(res)
        setProductsMain(res)
    } catch (error) {
        console.log('ERROR:', error)
        if ( error.status === 401 ) {
            console.log('Unauthorized:', error.status)
            navigate('/login');
        }
    }}

    
    useEffect(() => {
      if (token) {
        fetchProducts();
      }
    }, [token]); 


    const getProductsByCat = async (catId) => {
      const filteredProducts = products.filter(product => product.category_id === catId);
      setProducts(filteredProducts);
      setShow(false)
      // console.log('filteredProducts', filteredProducts)
    }

    const handleShow = async() => {
      setShow(true);
      setProducts(productsMain)
    }
    // const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);



  return (
    <div className='Center'>

<     Button variant="primary" onClick={handleShow}>
        Kategorie
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Kategorie:</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {categories.map((cat) => (
            <p key={cat.id} onClick={() => getProductsByCat(cat.id)}>{cat.name}</p>
          ))}
        </Offcanvas.Body>
      </Offcanvas>

      {/* <div class="d-flex justify-content-center align-items-center Gap20 Cursor">
        <div className="befoeProductsCats">
          <h1>Produkty</h1>
          <div className='ProductsCats'>
            {categories.map((cat) => (
              <p key={cat.id} onClick={() => getProductsByCat(cat.id)}>{cat.name}</p>
            ))}
          </div>
        </div>
      </div> */}
      <div></div>

      <div className='ProdCont'>
        {products.length > 0 ? (
            <div className='container'>
              <div className='row'>
                {products.map((product) => (
                  <Product 
                    key={product.id} 
                    product={product} 
                    // cart={cart} 
                  />
                ))}
              </div>
            </div>
        ) : (
          <p>No products found.</p>
        )}
      </div>

    </div>
  );
};

export default Products;
