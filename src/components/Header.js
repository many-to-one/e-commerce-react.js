import React, { useEffect, useState } from 'react'
import '../styles/header.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext';
import Cookies from 'js-cookie';
import { NavDropdown } from 'react-bootstrap';
import { useCategory } from '../context/CategoryContext';

const Header = () => {

  const token = Cookies.get('token');
  const navigate = useNavigate();
  const { getMe, user} = useUser(); 
  const { getAllCategories } = useCategory();

  const [login, setLogin] = useState(false);
  const [categories, setCategories] = useState([]);

  const userMe= async () => {
    try {
        const res = await getMe(token);
        if ( res.status === 200 ){
          console.log('userMe:', user)
          setLogin(true)
        }

    } catch (error) {
        console.log('ERROR:', error)
        if ( error.status === 401 ) {
            console.log('Unauthorized:', error.status)
            navigate('/login');
        }
    }}


  useEffect(() => {
    userMe()
  }, [token])

  const fetchCategories = async () => {
    try {
        const res = await getAllCategories();
        console.log('fetchCategories:', res);
        // setShowCategories(true)
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
  }, [token])

  const goToCart = async () => {
    navigate('/cart')
  }

  const goToAdmin = async () => {
    navigate('/admin_panel')
  }

  const goToProducts = async (category) => {
    navigate('/products_by_category', { state: { category } });
  }

  // console.log('categories----', categories)

  return (
    <ul class="nav nav-underline Navi NaviContainer">
        <div className='NaviContainerRight'>
          <Link to="/" className="nav-item nav-link">Home</Link>
          <NavDropdown title="Kategorii" id="navbarScrollingDropdown">
              { categories.map((cat) => (
                <NavDropdown.Item  onClick={() => goToProducts(cat)} key={cat.id}>{cat.name}</NavDropdown.Item>
              )) }
          </NavDropdown>
          <Link to="/products" className="nav-item nav-link">Produkty</Link>
          <form action="" class="d-flex" role="search">
            <input className="form-control me-2 Search" type="search" placeholder="Szukaj..." aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Szukaj</button>
          </form>
        </div>
        <div className='NaviContainerLeft'>
        { login ? (
          <p>{user.username}</p>
        ):(
          <p></p>
        )}

        {/* { user.is_admin ? ( */}
          <div className='Icon' onClick={goToAdmin}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
          </div>
        {/* ): (
          <p></p>
          )} */}

          <div className='Icon' onClick={goToCart}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z"/>
            <path fillRule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
          </svg>

        </div>
    </ul>
  )
}


export default Header