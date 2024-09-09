import React, { useEffect, useState } from 'react'
import '../styles/product.css'
import axios from 'axios'; 
import Cookies from 'js-cookie';
import PROD_URL from '../config/ProdConfig';
import { useNavigate } from 'react-router-dom';
import { useCategory } from '../context/CategoryContext';
import { useUser } from '../context/userContext';
import { useProduct } from '../context/ProductContext';

const Addproduct = () => {

  // const token = Cookies.get('token');
  const navigate = useNavigate();
  // const [categories, setCategories] = useState([]);
  const { token } = useUser(); 
  const { createProduct } = useProduct();
  const {getAllCategories, categories} = useCategory();

  const [title, setTilte] = useState('');
  const [category, setCategory] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState(0);
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async() => {
    
    try {
      const res = await getAllCategories()
  
      console.log('Addproduct getCategories', res)
  
      if ( res.status === 200 ) {
        // setCategories(res.data)
        console.log('categories', categories)
      } 
    } catch (error) {
      if ( error.status === 401 ) {
        navigate('/login')
      } 
    }

  }


  const postProduct = async(e) => {
    e.preventDefault()
    console.log('title', title)
    console.log('category', category)
    console.log('price', price)
    console.log('discount', discount)
    console.log('stock', stock)
    console.log('brand', brand)
    console.log('image', image)
    console.log('description', description)

    // const postData = {
    //   "title": title,
    //   "category_id": parseInt(category),
    //   "price": price,
    //   "discount_percentage": discount,
    //   "stock": stock,
    //   "brand": brand,
    //   "thumbnail": image,
    //   "description": description,
    // }

    const postData = {
      title: title,
      category_id: parseInt(category),
      price: parseFloat(price), // Ensure price is a float
      discount_percentage: discount ? parseFloat(discount) : null, // Convert to float or set to null
      stock: parseInt(stock), // Ensure stock is an integer
      brand: brand || null, // Handle empty strings as null
      thumbnail: image || null, // Handle empty strings as null
      description: description || null, // Handle empty strings as null
   }

    try {
      const res = await createProduct(postData, token)
  
      console.log('postProduct', res)

      if ( res.status === 201 ) {
        navigate('/product', { state: res.data });
      }
    } catch (error) {
      console.log('postProduct error', error.response)
      if ( error.status === 401 ) {
        navigate('/login')
      } 
    }

  }


  return (

      <form class="cart d-flex flex-column align-items-center AddProduct" onSubmit={postProduct}>

        <div class="input-group w-50 primary">
            <span class="input-group-text" id="addon-wrapping">Nazwa</span>
            <input type="text" class="form-control" aria-describedby="addon-wrapping" onChange={(e) => setTilte(e.target.value)}/>
        </div>

        <div className="input-group w-50">
          <select className="form-select" aria-label="Default select example" onChange={(e) => setCategory(e.target.value)}>
            <option selected>Kategoria</option>
            {categories ? (
              categories.map((cat) => (
                <option key={cat.id} value={parseInt(cat.id)}>{cat.name}</option>
              ))
            ) : (
              <option disabled>Not Found</option>
            )}
          </select>
        </div>


        <div class="input-group w-50">
            <span class="input-group-text" id="addon-wrapping">Cena</span>
            <input type="text" class="form-control" aria-describedby="addon-wrapping" onChange={(e) => setPrice(parseFloat(e.target.value))}/>
        </div>

        <div class="input-group w-50">
            <span class="input-group-text" id="addon-wrapping" onChange={(e) => setDiscount(parseFloat(e.target.value))}>Rabat</span>
            <input type="text" class="form-control" aria-describedby="addon-wrapping"/>
        </div>

        <div class="input-group w-50">
            <span class="input-group-text" id="addon-wrapping" >Ilość</span>
            <input type="text" class="form-control" aria-describedby="addon-wrapping" onChange={(e) => setStock(parseInt(e.target.value))}/>
        </div>

        <div class="input-group w-50">
            <span class="input-group-text" id="addon-wrapping">Marka</span>
            <input type="text" class="form-control" aria-describedby="addon-wrapping" onChange={(e) => setBrand(e.target.value)}/>
        </div>

        <div class="input-group w-50">
            <span class="input-group-text" id="addon-wrapping">Zdjęcie</span>
            <input required type="text" class="form-control" aria-describedby="addon-wrapping" onChange={(e) => setImage(e.target.value)}/>
        </div>

        <div class="input-group w-50 Height50">
            <span class="input-group-text" id="addon-wrapping">Opis</span>
            <textarea type="text" class="form-control" aria-describedby="addon-wrapping" onChange={(e) => setDescription(e.target.value)}/>
        </div>

        <button type="submit" class="btn btn-primary">Wystaw</button>

    </form>
    
  )
}

export default Addproduct