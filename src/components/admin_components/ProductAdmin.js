import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../../styles/App.css'

const ProductAdmin = ({ product }) => {

    const { id, title, images, price, description, thumbnail, stock } = product;
    console.log('description', description)

    const navigate = useNavigate();

    return (
        <div>
            <tr>
                <th scope="row">{ id }</th>
                <td><img className="Image" src={thumbnail} alt="Product Image" /></td>
                <td>{ title }</td>
                <td>{ price }</td>
                <td>{ stock }</td>
            </tr>
        </div>
    )
}

export default ProductAdmin