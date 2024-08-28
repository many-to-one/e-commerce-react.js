import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import DEV_URL from '../config/DevConfig';
import DEV_URL_R from '../config/ReactDevConfig';

const UserContext = createContext();

export function UserProvider({ children }) {

  const [user, setUser] = useState(null);
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
      console.log('Token:', response);

      if (response.status === 200) {

        setUser(response.data.access_token);
        Cookies.set('token', response.data.access_token, { expires: 7 }); // Expires in 7 days
        console.log('Token stored in cookie:', response.data.access_token);
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
    

  const logout = () => {
    setUser(null);
    // Also remove user data from local storage or cookies here if needed
  };

  // const userData = (userId) => {

  //       axios.post(`${serverIP}/auth/accessToken/`, userId,)
  //       .then((response) => {
  //           console.log('response.userData', response.data);
  //           // setAccesToken(response.data.AccesToken)
  //           setUser(response.data.user)
  //       })
  //       .catch ((error) => {
  //          console.error('Error posting data:', error);
  //          // setError('Error posting data')
  //       });
  // }


return (
    <UserContext.Provider value={{ 
            login,
            user,
        }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}