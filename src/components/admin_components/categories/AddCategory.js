import React, { useState } from 'react'
import { useCategory } from '../../../context/CategoryContext';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {

    const { createCategory } = useCategory();
    const navigate = useNavigate();
    const [name, setName] = useState(null);

    const postCategory = async (e) => {
      e.preventDefault()
        const postData = {
            'name': name
        }
        try {
            const res = await createCategory(postData)
        
            console.log('createCategory res', res)
      
            if ( res.status === 201 ) {
              navigate('/categories_admin');
            }
          } catch (error) {
            console.log('createCategory error', error.response)
            if ( error.status === 401 ) {
              navigate('/login')
            } 
          }
    }

  return (
    <form class="cart d-flex flex-column align-items-center AddProduct" onSubmit={postCategory}>
        <div class="input-group w-50 primary">
            <span class="input-group-text" id="addon-wrapping">Nazwa</span>
            <input type="text" class="form-control" aria-describedby="addon-wrapping" onChange={(e) => setName(e.target.value)}/>
        </div>
        <button type="submit" class="btn btn-primary">Dodaj</button>
    </form>
  )
}

export default AddCategory