import React, { useEffect } from 'react'
import { useProduct } from '../context/ProductContext'


const Home = () => {

  // const {getAllProducts} = useProduct();

  // const fetchProducts = async () => {
  //   await getAllProducts()
  // }

  // useEffect(() => {
  //   fetchProducts()
  // }, [])

  return (
    <div>Wellcome to the Home page</div>
  )
}

export default Home