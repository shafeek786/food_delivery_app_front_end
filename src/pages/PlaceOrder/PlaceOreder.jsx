import React, { useContext } from "react";
import "./PlaceOreder.css";
import { StoreContext } from "../../Context/StoreContext";

const PlaceOreder = () => {
  const { getTotal, cartItems } = useContext(StoreContext);
  const deliveryCharge = cartItems && Object.keys(cartItems).length > 0 ? 2 : 0;

  return (
    <form action="" className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Informatin</p>
        <div className="multi-fields">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email ID" />
        <input type="text" placeholder="Street" />.
        <div className="multi-fields">
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone Number" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2> Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>${getTotal()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>

              <p>${deliveryCharge}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotal() + deliveryCharge}</p>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOreder;
