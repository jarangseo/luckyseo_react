import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import useCartStore from "../../store/cart.store";

const CartIcon = () => {
  const cartCount = useCartStore((state) => state.getCartCount());
  const { toggleCart } = useCartStore((state) => state.actions);

  return (
    <div className="cart-icon-container" onClick={toggleCart}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
