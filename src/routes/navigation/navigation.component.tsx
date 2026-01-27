import { Link, Outlet } from "react-router-dom";
import { Fragment } from "react";
import CrownLogo from "../../assets/crown.svg?react";
import "./navigation.styles.scss";
import { useUser } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import useCartStore from "../../store/cart.store";

const Navigation = () => {
  const { currentUser } = useUser();
  const isCartOpen = useCartStore((state) => state.isCartOpen);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {currentUser ? (
            <span onClick={signOutUser}>Sign Out</span>
          ) : (
            <Link className="nav-link" to="/auth">
              Sign In
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
