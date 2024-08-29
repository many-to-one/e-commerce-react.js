import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import DEV_URL from '../config/DevConfig';
import DEV_URL_R from '../config/ReactDevConfig';

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState(null);
    const token = Cookies.get('token');


    // GET CART 
    const getCart = async () => {

        const response = await axios.get(
            `${DEV_URL}/cart/user`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request header
              },
            }
        )

        console.log('getCart', response)

        if ( response.status === 200 ) {
          setCart(response.data)
        } else {
          setCart(null)
        }
    }


    // CREATE NEW CARD
    const createCart = async (body) => {
      try {
        const response = await axios.post(`${DEV_URL}/cart/new`, 
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        )
  
        if ( response.status == 201 ) {
          console.log('CART RESPONSE', response)
        }
      } catch (error) {
        console.log('Error post cart', error)
      }
  
    }


    // CREATE NEW CARD
    const addItemToCart = async (id, body) => {
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
    


return (
    <CartContext.Provider value={{ 
            getCart,
            cart,
            createCart,
            addItemToCart,
        }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}