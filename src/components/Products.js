import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import DEV_URL from '../config/DevConfig';
import Product from './single/Product';
import DEV_URL_R from '../config/ReactDevConfig';
import { useUser } from '../context/userContext';
import { useProduct } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const Products = () => {

  const { getMe, user} = useUser(); 
  const { getAllProducts} = useProduct(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState(null);

  const token = Cookies.get('token');
  const navigate = useNavigate();

  const userMe= async () => {
    try {
        await getMe(token);
        console.log('userMe:', user, token)
    } catch (error) {
        console.log('ERROR:', error)
        if ( error.status === 401 ) {
            console.log('Unauthorized:', error.status)
            navigate('/login');
        }
    }}


  useEffect(() => {
    userMe()
  }, [])


  const fetchProducts = async () => {
    try {
        const res = await getAllProducts();
        console.log('fetchProducts:', res)
        setProducts(res)
    } catch (error) {
        console.log('ERROR:', error)
        if ( error.status === 401 ) {
            console.log('Unauthorized:', error.status)
            navigate('/login');
        }
    }}

    useEffect(() => {
      fetchProducts()
    }, [])


  const addProduct = async() => {
    navigate('/add_product')
  } 

  return (
    <div className='Center'>
      <div class="d-flex justify-content-center align-items-center Gap20 Cursor">
        <h1>Produkty</h1>
      </div>

      <div className='ProdCont'>
        {products.length > 0 ? (
            <div className='container'>
              <div className='row'>
                {products.map((product) => (
                  <Product key={product.id} product={product} />
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
