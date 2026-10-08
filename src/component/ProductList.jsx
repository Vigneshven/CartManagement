import ProductCard from "./ProductCard";

export default function ProductList({ products = [], onAddToCart }) {
  return (
    <div className="mx-auto mt-5 max-w-4xl p-6">
      <h3 className="mb-6 text-2xl font-bold">Products</h3>

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
