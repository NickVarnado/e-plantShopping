import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";
import PropTypes from "prop-types";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  /**
   * Calculate the total amount of the cart.
   * @returns {number} The total amount of the cart.
   */
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + calculateTotalCost(item), 0);
  };

  /**
   * Handle continuing shopping.
   * @param {*} e
   */
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  /**
   * Handle incrementing the quantity of an item in the cart.
   * @param {*} item
   */
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  /**
   * Handle decrementing the quantity of an item in the cart.
   * @param {*} item
   */
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    } else {
      handleRemove(item);
    }
  };

  /**
   * Handle removing an item from the cart.
   * @param {*} item
   */
  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  /**
   * Calculate the total cost of an item based on the cost and the quantity.
   * @param {*} item
   * @returns {number} The total cost of the item.
   */
  const calculateTotalCost = (item) => {
    return parseFloat(item.cost.substring(1)) * item.quantity;
  };

  /**
   * Handle the checkout process
   */
  const handleCheckoutShopping = () => {
    alert("Coming Soon ");
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
CartItem.propTypes = {
  onContinueShopping: PropTypes.func.isRequired,
};

export default CartItem;
