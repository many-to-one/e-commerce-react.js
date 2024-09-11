import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import DEV_URL from '../../../config/DevConfig';
import axios from 'axios';
import { useUser } from '../../../context/userContext';
import ProductAdmin from './ProductAdmin';
import { useProduct } from '../../../context/ProductContext';
import DeleteConfirmationModal from '../DeleteConfirmationModal ';


const ProductsAdmin = () => {

    const token = Cookies.get('token');
    const navigate = useNavigate();
    // const { token } = useUser(); 
    const { getAllProducts, deleteItem} = useProduct(); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);


    const fetchProducts = async () => {
      try {
          const res = await getAllProducts();
          console.log('fetchProducts:', res)
          setProducts(res)
      } catch (error) {
          console.log('ERROR:', error)
          if ( error.status === 401 ) {
              console.log('Unauthorized:', error.status)
              navigate('/login');
          }
      }}

    useEffect(() => {
      fetchProducts()
    }, [])


    const addProduct = async() => {
      navigate('/add_product')
    } 


    const editProduct = async (product) => {
      console.log('editProduct', product)
      navigate('/update_product_admin', {state:{product}} )
    }


    const deleteProduct = async () => {
      const res = await deleteItem(itemToDelete)
      console.log('editProduct', res)
      if ( res.status == 200 ) {
        console.log('deleteItem 200', res)
        handleClose()
        // navigate('/products_admin')
        window.location.reload()
      }
    }


    const handleDeleteClick = (itemId) => {
      console.log('handleDeleteClick', itemId)
      setItemToDelete(itemId); // Store the item to delete
      setShowModal(true); // Show the modal
    };
  
    const handleClose = () => {
      setShowModal(false); // Close the modal
      setItemToDelete(null); // Clear the item
    };



    return (
      <div className='CartCont w-75'>
        <div>
          {/* Modal */}
          <DeleteConfirmationModal 
            show={showModal} 
            handleClose={handleClose} 
            handleDelete={deleteProduct} 
          />
      </div>
        <table class="table">
          <thead>
              <tr>
              <th scope="col">ID</th>
              <th scope="col"></th>
              <th scope="col">NAZWA</th>
              <th scope="col">CENA</th>
              <th scope="col">ILOŚĆ</th>
              <th scope="col"></th>
              <th scope="col"></th>
              </tr>
          </thead>
          {products.map((product) => (
            <tbody>
            <tr>
              <th scope="row">{ product.id }</th>
              <td><img className="Image" src={product.thumbnail} alt="Product Image" /></td>
              <td>{ product.title }</td>
              <td>{ product.price }</td>
              <td>{ product.stock }</td>
              <td className='Cursor' onClick={() => editProduct(product)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                </svg>
              </td>
              <td className='Cursor' onClick={() => handleDeleteClick(product.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
              </td>
              </tr>
            </tbody>
          ))}
        </table>
        <button type="button" class="btn btn-primary" onClick={addProduct}>Dodaj nowy</button>
      </div>
    )
    }

export default ProductsAdmin