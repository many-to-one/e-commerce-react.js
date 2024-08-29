import axios from 'axios';
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import DEV_URL from '../../config/DevConfig';
import Cookies from 'js-cookie';
import '../../styles/App.css'
import { useCart } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';

const ProductDetail  = () => {

  const { getCart, cart, createCart, addItemToCart } = useCart(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await getCart(); 
      } catch (error) {
        if ( error.response.status === 401 ) {
          navigate('/login')
        }
        // console.log('******ProductDetail********', error); 
      }
    };

    fetchCart(); 
  }, [])

  console.log('cart ---', cart);

  const location = useLocation();
  const product  = location.state || {}; 
  console.log('product ---', product)
  // console.log('location.state:', location.state);

  // Check if product is available
  if (!product) {
    return <p>Product not found.</p>;
  }

  const { id, title, images, price, stock, rating, description, thumbnail } = product;
  const token = Cookies.get('token');


  const addItemToCart_ = async (id, body) => {
    // console.log('CART BODY', body)
    try {
      const response = await axios.patch(`${DEV_URL}/cart/update/${id}`, 
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      )

      console.log('CART RESPONSE', response)
      if ( response.status == 201 ) {
        console.log('CART RESPONSE 200', response)
      }
    } catch (error) {
      console.log('Error post cart', error)
    }

  }


  const addToCard = async (e) => {
    e.preventDefault();

    if ( cart === null ) {
      // CREATE NEW CART IF THERE IS NO ONE
      const body = [
        {
          product_id: id,
          quantity: 1
        }
      ]
      try {
        await createCart(body)
      } catch (error) {
        if ( error.response.status === 401 ) {
          // navigate('/login')
          console.log('Error post cart', error)
        }
      }
    } else {
      console.log('THE USER ALLREADY HAS A CART')
      // ADD ITEM TO CART IF USER IT ALLREADY HAS
      const item = {
        product_id: id,
        quantity: 1
      }
      try {
        await addItemToCart(cart.id, item)
      } catch (error) {
        if ( error ) { //error.response.status === 401
          navigate('/login')
        }
      }
    }

  }


  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6">
          {/* Main Product Image */}
          <div className="mb-3">
            {thumbnail && <img src={thumbnail} alt={title} className="img-fluid rounded" />}
          </div>
          {/* Product Image Gallery */}
          {images && images.length > 0 && (
            <div className="d-flex flex-wrap">
              {images.map((image, index) => (
                <div key={index} className="p-2">
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="img-thumbnail"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-md-6">
          <h2>{title}</h2>
          <p><strong>Price:</strong> ${price.toFixed(2)}</p>
          <p><strong>Stock:</strong> {stock > 0 ? `${stock} items available` : 'Out of stock'}</p>
          <p><strong>Rating:</strong> {rating ? `${rating}/5` : 'No ratings yet'}</p>
          <p><strong>Description:</strong></p>
          <p>{description}</p>
          {/* Optional: Add-to-Cart Button */}
          <button onClick={addToCard} className="btn btn-primary mt-3">Add to Cart</button>
        </div>
      </div>
      <div className="Message">
        Dodano do koszyka!
      </div>
    </div>
  );
};

export default ProductDetail ;
