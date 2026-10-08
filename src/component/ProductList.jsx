import ProductCard from "./ProductCard";

export default function ProductList({ products = [], onAddToCart }) {

  return (
    <>
      <h3>Products</h3>

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </>
  );
}