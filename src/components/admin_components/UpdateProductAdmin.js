import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useCategory } from '../../context/CategoryContext';
import { useUser } from '../../context/userContext';
import { useProduct } from '../../context/ProductContext';

const UpdateProductAdmin = () => {

    const location = useLocation();
    const {product}  = location.state || {}; 
    const { id, title, brand, price, discount_percentage, stock, description, thumbnail, category_id } = product || {};
    console.log('UpdateProductAdmin', title)

    const navigate = useNavigate();
    const { token } = useUser(); 
    // const [categories, setCategories] = useState([]);
    const {getAllCategories, categories} = useCategory();
    const { updateProduct } = useProduct();

    const [title_, setTilte] = useState('');
    const [categories_, setCategories] = useState([]);
    const [category, setCategory] = useState(0);
    const [price_, setPrice] = useState(0);
    const [discount_, setDiscount] = useState(0);
    const [stock_, setStock] = useState(0);
    const [brand_, setBrand] = useState('');
    const [image_, setImage] = useState('');
    const [description_, setDescription] = useState('');

  
    const getCategories = async () => {
      
      try {
        const res = await getAllCategories(token)
    
        console.log('UpdateProductAdmin getCategories', res.data)
    
        if ( res.status === 200 ) {
          setCategories(res.data)
          console.log('categories', categories)
        } 
      } catch (error) {
        if ( error.status === 401 ) {
          navigate('/login')
        } 
      }
  
    }

    useEffect(() => {
      getCategories()
    }, [])


    const editProduct = async () => {
      const postData = {
        title: title,
        category_id: parseInt(category),
        price: parseFloat(price), // Ensure price is a float
        discount_percentage: discount_percentage ? parseFloat(discount_percentage) : null, // Convert to float or set to null
        stock: parseInt(stock), // Ensure stock is an integer
        brand: brand || null, // Handle empty strings as null
        thumbnail: thumbnail || null, // Handle empty strings as null
        description: description || null, // Handle empty strings as null
     }
     const res = await updateProduct(postData, token)
     if ( res.status === 200 ) {
      navigate('/products_admin')
     } else {
      navigate('/')
     }
    }

  return (
    <form class="cart d-flex flex-column align-items-center AddProduct" onSubmit={editProduct}>

        <div class="input-group w-50 primary">
            <span class="input-group-text" id="addon-wrapping">Nazwa</span>
            <input 
              type="text" 
              class="form-control" 
              aria-describedby="addon-wrapping" 
              value={title} 
              onChange={(e) => setTilte(e.target.value)}/>
        </div>

        <div class="input-group w-50 primary">
            <span class="input-group-text" id="addon-wrapping">Marka</span>
            <input 
              type="text" 
              class="form-control" 
              aria-describedby="addon-wrapping" 
              value={brand} 
              onChange={(e) => setTilte(e.target.value)}/>
        </div>

        <div className="input-group w-50">
          <select className="form-select" aria-label="Default select example" onChange={(e) => setCategory(e.target.value)}>
            {/* Default option */}
            <option selected disabled>Kategoria</option>

            {/* Map through categories */}
            {categories_.map((cat) => (
              <option key={cat.id} value={parseInt(cat.id)} selected={cat.id === category_id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>


        <div class="input-group w-50">
            <span class="input-group-text" id="addon-wrapping">Cena</span>
            <input 
              type="text" 
              class="form-control" 
              aria-describedby="addon-wrapping"
              value={price} 
              onChange={(e) => setPrice(parseFloat(e.target.value))}/>
        </div>

        <div class="input-group w-50">
            <span class="input-group-text" id="addon-wrapping" onChange={(e) => setDiscount(parseFloat(e.target.value))}>Rabat</span>
            <input 
              type="text" 
              class="form-control" 
              aria-describedby="addon-wrapping"
              value={discount_percentage ? discount_percentage : 0}
            />
        </div>

        <div class="input-group w-50">
            <span class="input-group-text" id="addon-wrapping" >Ilość</span>
            <input 
              type="text" 
              class="form-control" 
              aria-describedby="addon-wrapping" 
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value))}/>
        </div>

        <div class="input-group w-50">
            <span class="input-group-text" id="addon-wrapping">Marka</span>
            <input type="text" class="form-control" aria-describedby="addon-wrapping" onChange={(e) => setBrand(e.target.value)}/>
        </div>

        <div class="input-group w-50">
            <span class="input-group-text" id="addon-wrapping">Zdjęcie</span>
            <input 
              type="text" 
              class="form-control" 
              aria-describedby="addon-wrapping" 
              value={thumbnail}
              onChange={(e) => setImage(e.target.value)}/>
        </div>

        <div class="input-group w-50 Height50">
            <span class="input-group-text" id="addon-wrapping">Opis</span>
            <textarea 
              type="text" 
              class="form-control" 
              aria-describedby="addon-wrapping" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
        </div>

        <button type="submit" class="btn btn-primary">Edytuj</button>

    </form>
  )
}

export default UpdateProductAdmin