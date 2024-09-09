import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import DEV_URL from '../config/DevConfig';
import DEV_URL_R from '../config/ReactDevConfig';

const UserContext = createContext();

export function UserProvider({ children }) {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const login = async(loginData) => {

    try {
      const response = await axios.post(
        `${DEV_URL}/auth/login`,
        loginData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      console.log('LOGIN RESOINSE:', response);

      if (response.status === 200) {

        Cookies.set('token', response.data.access_token, { expires: 7 }); // Expires in 7 days
        // console.log('Token stored in cookie:', response.data.access_token);
        setToken(response.data.access_token)
        console.log('Token:', response.data.access_token);
        return 'ok'
  
      } else {
        setError('Login failed. Please check your credentials.');
        console.error('Login failed:', response);
        return error
      }
      } catch (err) {
        setError('Login failed. Please check your credentials.');
        console.error('Error during login:', err);
        return error
      }
  };


  const getMe = async(token) => {

    // const token = Cookies.get('token');
    
    const response = await axios.get(
      `${DEV_URL}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request header
        },
      }
    );
    console.log('getMe RESPONSE:', response);
    if ( response.status === 200 ) {
      setUser(response.data)
    }
    return response
  };
    

  const logout = () => {
    setUser(null);
    // Also remove user data from local storage or cookies here if needed
  };



return (
    <UserContext.Provider value={{ 
            login,
            user,
            token,
            getMe,
        }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}