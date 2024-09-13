import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import DEV_URL from '../config/DevConfig';
import DEV_URL_R from '../config/ReactDevConfig';
import { useApi } from './ApiContext';

const ProductContext = createContext();

export function ProductProvider({ children }) {

  const {get_, post_, patch_, delete_} = useApi();
  const [products, setProducts] = useState(null);


    const getAllProducts = async () => {

      console.log('getAllProducts token', )
        const response = await get_(
            `${DEV_URL}/products/all`,
        )

        console.log('getAllProducts', response)

        if ( response.status === 200 ) {
            setProducts(response.data)
            return response.data
        } else {
            setProducts(null)
        }
    }


    // CREATE NEW PRODUCT
    const createProduct = async (body) => {

      console.log('DEV_URL', DEV_URL)
        const response = await post_(
          `${DEV_URL}/products/new`, 
          body,
        )

        console.log('CREATE NEW PRODUCT', response)
        return response
      } 
    


    // UPDATE PRODUCT
    const updateProduct = async (id, body) => {
      console.log('updateProduct', id, body)
      try {
        const response = await patch_(
          `${DEV_URL}/products/update/${id}`, 
          body,
        ) 
        console.log('updateProduct RESPONSE', response)
        return response
      } catch (error) {
        console.log('Error updateProduct', error)
      }
  
    }


    // DELETE THE PRODUCT
    const deleteItem = async (id) => {

      console.log('deleteItem', id)

      try {
        const response = await delete_(
          `${DEV_URL}/products/delete/${id}/`
        )
  
        console.log('deleteItem RESPONSE', response)
        return response;
      } catch (error) {
        console.log('Error deleteItem', error)
      }
    }
    


return (
    <ProductContext.Provider value={{ 
            getAllProducts,
            createProduct,
            updateProduct,
            deleteItem,
        }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}