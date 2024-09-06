import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import DEV_URL from '../config/DevConfig';
import DEV_URL_R from '../config/ReactDevConfig';

const ProductContext = createContext();

export function ProductProvider({ children }) {

    const [products, setProducts] = useState(null);

    // GET CART 
    const getAllProducts = async (token) => {

      console.log('getAllProducts token', token)
        const response = await axios.get(
            `${DEV_URL}/products/all`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request header
              },
            }
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
    const createProduct = async (body, token) => {
      try {
        const response = await axios.post(`${DEV_URL}/products/new`, 
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        )
  
        if ( response.status == 201 ) {
          console.log('CREATE PRODUCT RESPONSE', response)
          return response
        }
      } catch (error) {
        console.log('Error post product', error)
        return error
      }
  
    }


    // UPDATE PRODUCT
    const updateProduct = async (id, body, token) => {
      // console.log('CART BODY', body)
      try {
        const response = await axios.patch(`${DEV_URL}/products/update/${id}`, 
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        )
  
        console.log('CART RESPONSE', response)
        return response
      } catch (error) {
        console.log('Error post cart', error)
      }
  
    }


//     // UPDATE ITEM'S QUANTITY
//     const updateItem = async (body) => {

//       // console.log('CART UPDATE body', body)

//       try {
//         const response = await axios.patch(`${DEV_URL}/cart/cart_item/update/`, 
//           body,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, 
//             },
//           }
//         )
  
//         console.log('CART UPDATE RESPONSE', response)
//         if ( response.status == 201 ) {
//           console.log('CART UPDATE RESPONSE 200', response)
//         }
//         return response;
//       } catch (error) {
//         console.log('Error patch cart UPDATE', error)
//       }
//   }
    


return (
    <ProductContext.Provider value={{ 
            getAllProducts,
            createProduct,
            updateProduct,
            // createCart,
            // addItemToCart,
            // updateItem,
        }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}