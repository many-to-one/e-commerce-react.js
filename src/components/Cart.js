import React, { useEffect, useState } from 'react'
import '../styles/cart.css'
import { useCart } from '../context/cartContext';
import CartProductDetail from './single/CartProductDetail';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const { getCart, cart} = useCart(); 
    const navigate = useNavigate();

    const userCart = async () => {
        try {
            const res = await getCart();
            console.log('CART:', cart)
        } catch (error) {
            console.log('ERROR:', error)
            if ( error.status === 401 ) {
                console.log('Unauthorized:', error.status)
                navigate('/login');
            }
        }
    }

    useEffect(() => {
        userCart()
    }, [])

  return (
    <div className="card CartCont">
        <div className="card-body">
            {cart ? (
                <CartProductDetail cart={cart}/>
            ):(
                <p>Koszyk jest pusty...</p>
            )}
        </div>
    </div>
  )
}

export default Cart