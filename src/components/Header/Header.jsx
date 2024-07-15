import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div>
      <div className="header">
        <div className="header-contents">
          <h2>Order your favourite food here</h2>
          <p>
            QuickBite is a user-friendly and efficient food delivery app
            designed to bring delicious meals from your favorite local
            restaurants straight to your doorstep. Whether you're craving a
            quick snack, a hearty meal, or gourmet cuisine, QuickBite connects
            you with a diverse array of restaurants, ensuring that you have
            access to a wide variety of food options anytime, anywhere.
          </p>
          <button>View Menu</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
