import React from 'react'
import { useLocation } from 'react-router-dom';

const UpdateProductAdmin = () => {

    const location = useLocation();
    const {product}  = location.state || {}; 
    const { id, title, images, price, description, thumbnail } = product || {};
    console.log('UpdateProductAdmin', title)
  return (
    <div>{title}</div>
  )
}

export default UpdateProductAdmin