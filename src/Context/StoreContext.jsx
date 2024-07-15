import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { food_list } from "../assets/assets";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const decrement = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedItems = { ...prev };
      delete updatedItems[itemId];
      return updatedItems;
    });
  };
  const getTotal = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }

    return totalAmount;
  };
  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    decrement,
    getTotal,
    removeFromCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreContextProvider;
