import React, { useEffect, useState } from 'react'
import { useProduct } from '../context/ProductContext'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import Cookies from 'js-cookie';


const Home = () => {

  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const { getMe, user} = useUser(); 

  const token = Cookies.get('token');

  const userMe= async () => {
    try {
        const res = await getMe(token);
        if ( res.status === 200 ){
          console.log('userMe:', user)
          setLogin(true)
        }

    } catch (error) {
        console.log('ERROR:', error)
        if ( error.status === 401 ) {
            console.log('Unauthorized:', error.status)
            navigate('/login');
        }
    }}

  useEffect(() => {
    userMe()
  }, [])

  return (
    <div>
      {login ? (
        <div>Wellcome to the Home page</div>
      ):(
        <p></p>
      )}
    </div>
  )
}

export default Home