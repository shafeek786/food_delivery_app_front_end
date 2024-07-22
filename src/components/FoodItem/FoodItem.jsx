import React, { useContext } from "react";
import "./FoodItem.css";
import PropTypes from "prop-types";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
const FoodItem = ({ id, name, description, image, price }) => {
  const { cartItems, addToCart, decrement } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-img" src={image} alt="" />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
          />
        ) : (
          <div className="food-item-counter">
            <img onClick={() => decrement(id)} src={assets.remove_icon_red} />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p className="text-lg">{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc text-base">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};
FoodItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
export default FoodItem;
