import "./product-card.styles.scss";
import Button from "../button/button.component";
import useCartStore from "../../store/cart.store";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const addItemToCart = useCartStore((state) => state.addItemToCart);

  const addProductToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
