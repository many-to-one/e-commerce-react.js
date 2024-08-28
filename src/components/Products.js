import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import DEV_URL from '../config/DevConfig';
import Product from './single/Product';
import DEV_URL_R from '../config/ReactDevConfig';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = Cookies.get('token'); // Retrieve token from cookies

        const response = await axios.get(`${DEV_URL}/products/all`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        });

        setProducts(response.data); // Set users state with fetched data
        console.log('products', response.data)
      } catch (err) {
        setError(err.message); // Handle any errors
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchProducts(); // Call the function to fetch users
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Display loading message while data is being fetched
  }

  if (error) {
    console.log('Error: ', error)
    window.location.href = `${DEV_URL_R}/login`
  }

  return (
    <div className='Center'>
      <h1>Produkty</h1>
      {products.length > 0 ? (
          <div className='container text-center'>
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
  );
};

export default Products;
