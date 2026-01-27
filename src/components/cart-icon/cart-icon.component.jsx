import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import useCartStore from "../../store/cart.store";

const CartIcon = () => {
  const toggleCart = useCartStore((state) => state.toggleCart);
  const cartCount = useCartStore((state) => state.getCartCount());

  return (
    <div className="cart-icon-container" onClick={toggleCart}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
