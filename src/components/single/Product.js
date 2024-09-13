import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './Product.css'; // Optional: Import custom styles if needed

const Product = ({ product }) => {

  const { id: productId, title, images, price, description, thumbnail } = product;
  // const { id: cartId, user_id, total_amount, cart_items } = cart
  // console.log('description', description)

  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to the product detail page with the product id
    navigate(`/product/${productId}`);
  };

  return (
    <div className="col-6 col-sm-3" style={{ cursor: 'pointer' }} key={productId}>
      <Link className="card Card" state={ product } to="/product">
        {thumbnail && <img src={thumbnail} alt={title} className="card-img-top" />}
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + 1} of ${title}`} className="card-img-top" />
          ))
        ) : (
          <p></p>
        )}
        <div class="card-body">
          <p class="card-text">{title}</p>
          <p class="card-text">{price}</p>
        </div>
      </Link>
    </div>
  );

};

export default Product;
