import React from 'react'
import { useLocation } from 'react-router-dom';

const PayPage = () => {
  const location = useLocation();
    const { cartId, totalAmount, otherData } = location.state || {};

    return (
        <div>
            <h1>Payment Page</h1>
            <p>Cart ID: {cartId}</p>
            <p>Total Amount: {totalAmount}</p>
            <p>Other Data: {otherData}</p>
            {/* Your payment form or logic */}
        </div>
    );
}

export default PayPage