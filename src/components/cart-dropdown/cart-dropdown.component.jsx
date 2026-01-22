import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useCart } from "../../contexts/cart.context";

const CartDropdown = () => {
  const { cartItems } = useCart();
  return (
    <div className="cart-dropdown-container">
      {/* Your component content here */}
      <div className="cart-items">
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <Button buttonType="inverted">Go to checkout</Button>
    </div>
  );
};

export default CartDropdown;
