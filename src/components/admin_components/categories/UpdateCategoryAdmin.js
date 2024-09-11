import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useCategory } from '../../../context/CategoryContext';
import { useApi } from '../../../context/ApiContext';
import DEV_URL from '../../../config/DevConfig';

const UpdateCategoryAdmin = () => {

    const location = useLocation();
    const {category}  = location.state || {}; 
    const { id, name } = category || {};
    const { updateCategory } = useCategory();
    const {get_, post_, patch_, delete_} = useApi();
    const navigate = useNavigate();

    const [name_, setName_] = useState(name);

    const editCategory = async (e) => {
      e.preventDefault()
      const postData = {
        'name': name_
      }
      const res = await updateCategory(id, postData) 
      if ( res.status === 200 ) {
        navigate('/categories_admin')
      } else if ( res.status === 401 ) {
        navigate('login')
      } else {
        console.log('ERROR', res)
      }
    }

  return (
    <form class="cart d-flex flex-column align-items-center AddProduct" onSubmit={editCategory}>
        <div class="input-group w-50 primary">
            <span class="input-group-text" id="addon-wrapping">Nazwa</span>
            <input 
              type="text" 
              class="form-control" 
              aria-describedby="addon-wrapping" 
              value={name_}
              onChange={(e) => setName_(e.target.value)}/>
        </div>
        <button type="submit" class="btn btn-primary">Dodaj</button>
    </form>
  )
}

export default UpdateCategoryAdmin