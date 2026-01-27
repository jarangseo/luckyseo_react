import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import useCartStore from "../../store/cart.store";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <Button buttonType="inverted" onClick={goToCheckout}>
        Go to checkout
      </Button>
    </div>
  );
};

export default CartDropdown;
