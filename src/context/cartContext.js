import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import DEV_URL from '../config/DevConfig';
import DEV_URL_R from '../config/ReactDevConfig';
import { useApi } from './ApiContext';

const CartContext = createContext();

export function CartProvider({ children }) {

    const {get_, post_, patch_, delete_} = useApi();


    // GET CART 
    const getCart = async () => {

      const response = await get_(
          `${DEV_URL}/cart/user`,
      )

      console.log('GET CART', response)

      return response
    }


    // CREATE NEW CARD
    const createCart = async (body) => {

      const response = await post_(
          `${DEV_URL}/cart/new`,
          body
      )

      console.log('CREATE NEW CARD', response)

      return response
  
    }


    // ADD ITEM TO CARD
    const addItemToCart = async (id, body) => {

      const response = await patch_(
          `${DEV_URL}/cart/update/${id}`,
          body
      )

      console.log('ADD ITEM TO CARD', response)

      return response
  
    }


    // UPDATE ITEM'S QUANTITY
    const updateItem = async (body) => {

        const response = await patch_(
            `${DEV_URL}/cart/cart_item/update`,
            body
        )

        console.log("UPDATE ITEM'S QUANTITY", response)

        return response

    }


    // DELETE THE CAT ITEM
    const deleteCartItem = async (id) => {

        try {
          const response = await delete_(
            `${DEV_URL}/cart/delete_cart_item/${id}/`
          )
    
          console.log('DELETE THE CAT ITEM ', response)
          const check = await getCart()
          console.log('check', check)
          if ( check.data.cart_items.length === 0 ) {
            await deleteCart(check.data.id)
          }
          return response;
        } catch (error) {
          console.log('Error deleteCategory', error)
          return error
        }
    }


    // DELETE THE CAT 
    const deleteCart = async (id) => {

        try {
          const response = await delete_(
            `${DEV_URL}/cart/delete/${id}/`
          )
    
          console.log('DELETE THE CAT ', response)
          return response;
        } catch (error) {
          console.log('Error deleteCategory', error)
          return error
        }
    }
    


return (
    <CartContext.Provider value={{ 
            getCart,
            createCart,
            addItemToCart,
            updateItem,
            deleteCartItem,
            deleteCart,
        }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}