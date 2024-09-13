import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import DEV_URL from '../config/DevConfig';
import DEV_URL_R from '../config/ReactDevConfig';

const ApiContext = createContext();

export function ApiProvider({ children }) {

    const token = Cookies.get('token');

    // GET METHOD 
    const get_ = async (endpoint) => {

      console.log('get_ token', token)
        try {
            const response = await axios.get(
                `${endpoint}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request header
                  },
                }
            )
            return response
        } catch (error) {
            console.log('Error get_', error)
            return error
        }
    }


    // POST METHOD
    const post_ = async (endpoint, body) => {
      try {
        const response = await axios.post(
          `${endpoint}`, 
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        ) 
        console.log('POST METHOD', response)
        return response
      } catch (error) {
        console.log('Error post_', error)
        return error
      }
  
    }


    // UPDATE METHOD
    const patch_ = async (endpoint, body) => {

      try {
        const response = await axios.patch(
          `${endpoint}`, 
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        )
        return response
      } catch (error) {
        console.log('Error patch_', error)
        return error
      }
  
    }


    // DELETE METHOD
    const delete_ = async (endpoint) => {

      try {
        const response = await axios.delete(`
          ${endpoint}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        )
        return response;
      } catch (error) {
        console.log('Error delete_', error)
        return error;
      }
  }
    


return (
    <ApiContext.Provider value={{ 
            get_,
            post_,
            patch_,
            delete_,
        }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  return useContext(ApiContext);
}