import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import DEV_URL from '../../config/DevConfig';
import Cookies from 'js-cookie';
import '../../styles/App.css'
import { useCart } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';

const ProductDetail  = () => {

  const { getCart, createCart, addItemToCart } = useCart(); 
  const navigate = useNavigate();
  const location = useLocation();
  const product  = location.state || {}; 

  const [add, setAdd] = useState(false);

  // Check if product is available
  if (!product) {
    return <p>Product not found.</p>;
  }

  const { id: productId, title, images, price, stock, rating, description, thumbnail } = product;

  const item = {
    product_id: productId,
    quantity: 1
  }


  const addToCard = async (e) => {
    e.preventDefault();
    const cart = await getCart()
    console.log('cart', cart)
    if ( cart.status === 404 ) {
      // CREATE NEW CART IF THERE IS NO ONE
      const body = [
        item
      ]
      try {
        const res = await createCart(body)
        if ( res.status === 201 ) {
          setAdd(true)
        }
      } catch (error) {
        if ( error.response.status === 401 ) {
          // navigate('/login')
          console.log('Error post cart', error)
        }
      }

    } else {

      console.log('THE USER ALLREADY HAS A CART', cart)
      // ADD ITEM TO CART IF USER IT ALLREADY HAS
      try {
        console.log('addItemToCart ', cart.data.id, item)
        const res = await addItemToCart(cart.data.id, item)
        if ( res.status === 200 ) {
          setAdd(true)
        }
      } catch (error) {
        if ( error ) { //error.response.status === 401
          navigate('/login')
        }
      }
      
    }

  }


  const closeMess = async () => {
    setAdd(false)
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
      { add ? (
        <div className="Message">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-bag-check" viewBox="0 0 16 16" color='green'>
            <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
          </svg>
          Dodano do koszyka!
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x closeMess Cursor" viewBox="0 0 16 16" onClick={closeMess}>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </div>
      ): (
        <p></p>
      ) }
    </div>
  );
};

export default ProductDetail ;
