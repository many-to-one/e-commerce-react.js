import React, { useEffect, useState } from 'react'
import { useCategory } from '../../../context/CategoryContext';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../DeleteConfirmationModal ';


const CategoriesAdmin = () => {

    const { getAllCategories, deleteCategory } = useCategory();
    const navigate = useNavigate();

    const [showCategories, setShowCategories] = useState(false);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const fetchCategories = async () => {
        try {
            const res = await getAllCategories();
            console.log('fetchCategories:', res);
            setShowCategories(true)
            setCategories(res.data)
        } catch (error) {
            console.log('ERROR:', error)
            if ( error.status === 401 ) {
                console.log('Unauthorized:', error.status)
                navigate('/login');
            }
        }}
  
      useEffect(() => {
        fetchCategories();
      }, [])
  
  
      const addProduct = async() => {
        navigate('/add_category')
      } 
  
  
      const editProduct = async (category) => {
        // console.log('editProduct', product)
        navigate('/update_category_admin', {state:{category}} )
      }
  
  
      const deleteCat = async () => {
        const res = await deleteCategory(itemToDelete)
        console.log('deleteCategory', res)
        if ( res.status === 200 ) {
          console.log('deleteCategory 200', res)
          handleClose()
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
              handleDelete={deleteCat} 
            />
        </div>
          <table class="table">
            <thead>
                <tr>
                <th scope="col">NAZWA</th>
                <th></th>
                <th></th>
                </tr>
            </thead>
            {categories.map((cat) => (
              <tbody>
                <tr>
                    {/* <td><img className="Image" src={product.thumbnail} alt="Product Image" /></td> */}
                    <td>{ cat.name }</td>
                    <td className='Cursor' onClick={() => editProduct(cat)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                    </svg>
                    </td>
                    <td className='Cursor' onClick={() => handleDeleteClick(cat.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                    </td>
                </tr>
              </tbody>
            ))}
          </table>
          <button type="button" class="btn btn-primary" onClick={addProduct}>Dodaj</button>
        </div>
      )
      }


export default CategoriesAdmin