import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      {/* Your component content here */}
      <div className="cart-items"></div>
      <Button buttonType="inverted">Go to checkout</Button>
    </div>
  );
};

export default CartDropdown;
