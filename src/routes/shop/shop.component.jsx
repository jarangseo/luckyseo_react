import "./shop.styles.scss";
import { useProducts } from "../../contexts/products.context";

const Shop = () => {
  const { products } = useProducts();
  console.log(products);
  return (
    <div>
      {products?.map((category) => (
        <div key={category.id}>
          <h1>{category.name}</h1>
          <div>
            {category.items?.map((item) => (
              <div key={item.id}>{item.name}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shop;
