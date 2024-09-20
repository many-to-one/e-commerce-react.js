import React from 'react'
import { useLocation } from 'react-router-dom';
import Product from '../single/Product';

const ProductsByCategory = () => {

  const location = useLocation();
  const { category } = location.state || {};

    console.log('ProductsByCategory', category)
  return (
    // <div>
    //     <p>{category.name}</p>
    //     {category.products.map((product) => (
    //       <Product 
    //                 key={product.id} 
    //                 product={product} 
    //                 // cart={cart} 
    //               />
    //     ))}
    // </div>

      <div className='Center'>
        <div class="d-flex justify-content-center align-items-center Gap20 Cursor">
          <h1>{category.name}</h1>
        </div>
  
        <div className='ProdCont'>
          {category.products.length > 0 ? (
              <div className='container'>
                <div className='row'>
                  {category.products.map((product) => (
                    <Product 
                      key={product.id} 
                      product={product} 
                      // cart={cart} 
                    />
                  ))}
                </div>
              </div>
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
  )
}

export default ProductsByCategory