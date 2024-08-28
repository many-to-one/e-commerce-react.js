import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import DEV_URL from '../config/DevConfig';
import DEV_URL_R from '../config/ReactDevConfig';

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState(null);


    const getCart = async () => {

        const response = await axios.get(
            `${DEV_URL}/cart/get`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request header
              },
            }
        )

        console.log('getCart', response)

        if ( response.status === 200 ) {
          setCart(response.data)
        }
    }


return (
    <CartContext.Provider value={{ 
            getCart,
            cart,
        }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}