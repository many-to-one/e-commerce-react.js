import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/auth.css'
import { useUser } from "../context/userContext";


const Login = () => {
  const [user_, setUser_] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      username: user_,
      password: password,
    }
    console.log('loginData', loginData)
    const res = await login(loginData)
    if ( res === 'ok' ) {
      navigate('/');
    }
  
  };

  return (

    <div className='container-sm auth_base'>
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nazwa użytkownika</Form.Label>
        <Form.Control 
          type="username" 
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