import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import DEV_URL from '../config/DevConfig';
import DEV_URL_R from '../config/ReactDevConfig';

const CategoryContext = createContext();

export function CategoryProvider({ children }) {

    const [categories, setCategories] = useState(null);
    const token = Cookies.get('token');


    // GET CART 
    const getAllCategories = async () => {

      console.log('getAllCategories token', token)
        const response = await axios.get(
            `${DEV_URL}/category/all`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request header
              },
            }
        )

        console.log('getAllCategories', response)

        if ( response.status === 200 ) {
            setCategories(response.data)
        } else {
            setCategories(null)
        }
    }


//     // CREATE NEW CARD
//     const createCart = async (body) => {
//       try {
//         const response = await axios.post(`${DEV_URL}/cart/new`, 
//           body,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, 
//             },
//           }
//         )
  
//         if ( response.status == 201 ) {
//           console.log('CART RESPONSE', response)
//         }
//       } catch (error) {
//         console.log('Error post cart', error)
//       }
  
//     }


//     // ADD ITEM TO CARD
//     const addItemToCart = async (id, body) => {
//       // console.log('CART BODY', body)
//       try {
//         const response = await axios.patch(`${DEV_URL}/cart/update/${id}`, 
//           body,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, 
//             },
//           }
//         )
  
//         console.log('CART RESPONSE', response)
//         if ( response.status == 201 ) {
//           console.log('CART RESPONSE 200', response)
//         }
//       } catch (error) {
//         console.log('Error post cart', error)
//       }
  
//     }


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
    <CategoryContext.Provider value={{ 
        getAllCategories,
        categories,
            // createCart,
            // addItemToCart,
            // updateItem,
        }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  return useContext(CategoryContext);
}