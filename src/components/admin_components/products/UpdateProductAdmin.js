import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useCategory } from '../../../context/CategoryContext';
import { useUser } from '../../../context/userContext';
import { useProduct } from '../../../context/ProductContext';

const UpdateProductAdmin = () => {

    const location = useLocation();
    const {product}  = location.state || {}; 
    const { id, title, brand, price, discount_percentage, stock, description, thumbnail, category_id } = product || {};
    // console.log('UpdateProductAdmin', title)

    const navigate = useNavigate();
    // const { token } = useUser(); 
    const {getAllCategories} = useCategory();
    const { updateProduct } = useProduct();

    const [title_, setTilte] = useState(title);
    const [categories_, setCategories] = useState([]);
    const [category_id_, setCategoryId] = useState(category_id);
    // const [price_, setPrice] = useState(price || 0);
    const [price_, setPrice] = useState(price ? price.toString() : '');
    const [discount_, setDiscount] = useState(discount_percentage);
    const [stock_, setStock] = useState(stock);
    const [brand_, setBrand] = useState(brand);
    const [thumbnail_, setImage] = useState(thumbnail);
    const [description_, setDescription] = useState(description);

  
    const getCategories = async () => {
      
      try {
        const res = await getAllCategories()
    
        console.log('UpdateProductAdmin getCategories', res.data)
    
        if ( res.status === 200 ) {
          setCategories(res.data)
          // console.log('categories', categories)
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


    const editProduct = async (e) => {
      e.preventDefault()
      const postData = {
        title: title_,
        category_id: parseInt(category_id_),
        price: parseFloat(price_), 
        discount_percentage: discount_ ? parseFloat(discount_) : null, 
        stock: parseInt(stock_), 
        brand: brand_ || null, 
        thumbnail: thumbnail_ || null, 
        description: description_ || null, 
     }

     const res = await updateProduct(id, postData)
    //  console.log('editProduct', res)
     if ( res.status === 200 ) {
      navigate('/products_admin')
     } else {
      navigate('/')
     }
    }


    const handlePriceChange = (e) => {
      const value = e.target.value;
      // Allow only numbers and a single decimal point
      if (/^\d*\.?\d*$/.test(value)) {
        setPrice(value);
      }
    };

    

  return (

      <form class="cart d-flex flex-column align-items-center AddProduct" onSubmit={editProduct}>

        <div class="input-group w-50 primary">
            <span class="input-group-text" id="addon-wrapping">Nazwa</span>
            <input 
              type="text" 
              class="form-control" 
              aria-describedby="addon-wrapping" 
              value={title_} 
              onChange={(e) => setTilte(e.target.value)}/>
        </div>

        <div class="input-group w-50 primary">
            <span class="input-group-text" id="addon-wrapping">Marka</span>
            <input 
              type="text" 
              class="form-control" 
              aria-describedby="addon-wrapping" 
              value={brand_} 
              onChange={(e) => setBrand(e.target.value)}/>
        </div>

        <div className="input-group w-50">
          <select className="form-select" aria-label="Default select example" onChange={(e) => setCategoryId(e.target.value)}>
            {/* Default option */}
            <option selected disabled>Kategoria</option>

            {/* Map through categories */}
            {categories_.map((cat) => (
              <option key={cat.id} value={parseInt(cat.id)} selected={cat.id === category_id_}>
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
              value={price_} 
              onChange={handlePriceChange}
            />
        </div>

        <div class="input-group w-50">
            <span class="input-group-text" id="addon-wrapping">Rabat</span>
            <input 
              type="text" 
              class="form-control" 
              aria-describedby="addon-wrapping"
              value={discount_ ? discount_ : 0}
              onChange={(e) => setDiscount(parseFloat(e.target.value))}
            />
        </div>

        <div class="input-group w-50">
            <span class="input-group-text" id="addon-wrapping" >Ilość</span>
            <input 
              type="text" 
              class="form-control" 
              aria-describedby="addon-wrapping" 
              value={stock_}
              onChange={(e) => setStock(parseInt(e.target.value))}/>
        </div>

        <div class="input-group w-50">
            <span class="input-group-text" id="addon-wrapping">Zdjęcie</span>
            <input 
              type="text" 
              class="form-control" 
              aria-describedby="addon-wrapping" 
              value={thumbnail_}
              onChange={(e) => setImage(e.target.value)}/>
        </div>

        <div class="input-group w-50 Height50">
            <span class="input-group-text" id="addon-wrapping">Opis</span>
            <textarea 
              type="text" 
              class="form-control" 
              aria-describedby="addon-wrapping" 
              value={description_}
              onChange={(e) => setDescription(e.target.value)}
            />
        </div>
        <button type='submit' class="btn btn-primary">Edytuj</button>
        </form>

  )
}

export default UpdateProductAdmin