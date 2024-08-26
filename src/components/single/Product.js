import React from 'react';
// import './Product.css'; // Optional: Import custom styles if needed

const Product = ({ product }) => {

  const { title, images, price, description, thumbnail } = product;
  console.log('description', description)
  return (
    <div className="product-card">
      {thumbnail && <img src={thumbnail} alt={title} className="img-thumbnail" />}
      <h2>{title}</h2>
      {images && images.length > 0 ? (
        images.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 1} of ${title}`} className="product-image" />
        ))
      ) : (
        <p></p>
      )}
      <p><strong>Price:</strong> ${price.toFixed(2)}</p>
      {description && <p><strong>Description:</strong> {description}</p>}
    </div>
  );
};

export default Product;
