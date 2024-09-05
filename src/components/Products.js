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
        await getMe();
        console.log('userMe:', user)
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
        { user.is_admin ? (
          <div onClick={addProduct}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg>
        </div>
        ): (
          <p></p>
        )}
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
