import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import DEV_URL from '../config/DevConfig';
import DEV_URL_R from '../config/ReactDevConfig';
import { useApi } from './ApiContext';

const CategoryContext = createContext();

export function CategoryProvider({ children }) {

    const [categories, setCategories] = useState(null);
    const {get_, post_, patch_, delete_} = useApi();

    const getAllCategories = async () => {

        const response = await get_(
            `${DEV_URL}/category/all`,
        )

        console.log('getAllCategories', response)

        if ( response.status === 200 ) {
            setCategories(response.data)
        } else {
            setCategories(null)
        }

        return response
    }


    // CREATE NEW CATEGORY
    const createCategory = async (body) => {

      try {
        const response = await post_(
          `${DEV_URL}/category/new`, 
          body
        )
  
        return response

      } catch (error) {
        console.log('Error post cart', error)
      }
  
    }


    // UPDATE CATEGORY
    const updateCategory = async (id, body) => {
      console.log('updateCategory', id, body)
      try {
        const response = await patch_(
          `${DEV_URL}/category/update/${id}`, 
          body,
        ) 
        console.log('updateCategory RESPONSE', response)
        return response
      } catch (error) {
        console.log('Error updateCategory', error)
      }
  
    }
  
 // DELETE THE CATEGORY
    const deleteCategory = async (id) => {

      console.log('deleteCategory', id)

      try {
        const response = await delete_(
          `${DEV_URL}/category/delete/${id}/`
        )
  
        console.log('deleteCategory RESPONSE', response)
        return response;
      } catch (error) {
        console.log('Error deleteCategory', error)
      }
  }
    


return (
    <CategoryContext.Provider value={{ 
        getAllCategories,
        categories,
        createCategory,
        updateCategory,
        deleteCategory,
        }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  return useContext(CategoryContext);
}