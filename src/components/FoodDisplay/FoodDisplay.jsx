import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="foodDisplay" id="foodDisplay">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list
          .filter((item) => category === "All" || category === item.category)
          .map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              image={item.image}
              price={item.price}
            />
          ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
