import style from "./products.module.css";
import { Card, type Product } from "../Card/Card";

export const Products = ({ products }: { products: Product[] }) => {
  
  return (
    <>
      {products.length > 0 ? (
        <section className={style.productsSection}>
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <p
          className={style.emptyMessage}
        >
          No products found
        </p>
      )}
    </>
  );
};
