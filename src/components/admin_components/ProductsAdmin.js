import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Product from '../single/Product';
import DEV_URL from '../../config/DevConfig';
import axios from 'axios';
import { useUser } from '../../context/userContext';

const ProductsAdmin = () => {

    const token = Cookies.get('token');
    const navigate = useNavigate();
    const { getMe, user} = useUser(); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchProducts = async () => {
        try {

            const response = await axios.get(`${DEV_URL}/products/all`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request header
            },
            });

            setProducts(response.data); // Set users state with fetched data
            console.log('products', response.data)
        } catch (err) {
            console.log('products err', err)
            setError(err.message); // Handle any errors
        } finally {
            setLoading(false); // Stop the loading spinner
        }
        };

        fetchProducts(); // Call the function to fetch users
    }, []);



    return (
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
    )
    }

export default ProductsAdmin