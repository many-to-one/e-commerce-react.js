import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetail  = () => {

  const location = useLocation();
  const product  = location.state || {}; // Destructure product from location.state
  console.log('product ---', product)
  // console.log('location.state:', location.state);

  // Check if product is available
  if (!product) {
    return <p>Product not found.</p>;
  }

  const { id, title, images, price, stock, rating, description, thumbnail } = product;

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6">
          {/* Main Product Image */}
          <div className="mb-3">
            {thumbnail && <img src={thumbnail} alt={title} className="img-fluid rounded" />}
          </div>
          {/* Product Image Gallery */}
          {images && images.length > 0 && (
            <div className="d-flex flex-wrap">
              {images.map((image, index) => (
                <div key={index} className="p-2">
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="img-thumbnail"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="col-md-6">
          <h2>{title}</h2>
          <p><strong>Price:</strong> ${price.toFixed(2)}</p>
          <p><strong>Stock:</strong> {stock > 0 ? `${stock} items available` : 'Out of stock'}</p>
          <p><strong>Rating:</strong> {rating ? `${rating}/5` : 'No ratings yet'}</p>
          <p><strong>Description:</strong></p>
          <p>{description}</p>
          {/* Optional: Add-to-Cart Button */}
          <button className="btn btn-primary mt-3">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail ;
