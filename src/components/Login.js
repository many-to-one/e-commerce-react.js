import { useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/auth.css'
import DEV_URL from "../config/DevConfig";
import { redirect } from "react-router-dom";

const Login = () => {
  const [user_, setUser_] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');



  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${DEV_URL}/auth/login`,
        new URLSearchParams({
          username: user_,
          password: password,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      console.log('Token:', response);

      // Check if the response is successful
    if (response.status === 200) {
      
      // Set token in state and cookie
      setToken(response.data.access_token);
      Cookies.set('token', response.data.access_token, { expires: 7 }); // Expires in 7 days
      console.log('Token stored in cookie:', response.data.access_token);

      // Redirect to the desired URL after successful login
      window.location.href = 'http://localhost:3000/';
    } else {
      setError('Login failed. Please check your credentials.');
      console.error('Login failed:', response);
    }
    } catch (err) {
      // Handle errors
      setError('Login failed. Please check your credentials.');
      console.error('Error during login:', err);
    }
  };



  return (

    <div className='container-sm auth_base'>
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nazwa użytkownika</Form.Label>
        <Form.Control 
          type="username" 
          // placeholder="Podaj nazwę" 
          onChange={(e) => setUser_(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Hasło</Form.Label>
        <Form.Control 
          type="password" 
          // placeholder="Wpisz hasło" 
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Zaloguj
      </Button>
    </Form>
    </div>
  );
};

export default Login;