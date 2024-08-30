import React, { useEffect, useState } from 'react'
import '../styles/cart.css'
import { useCart } from '../context/cartContext';
import CartProductDetail from './single/CartProductDetail';

const Cart = () => {

    const { getCart, cart} = useCart(); 

    const userCart = async () => {
        try {
            const res = await getCart();
            console.log('CART:', cart)
        } catch (error) {
            console.log('ERROR:', error)
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