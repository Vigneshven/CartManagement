import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

export default function ProductList() {
  const products = useSelector((state) => state.shop.products);

  return (
    <div className="mx-auto mt-5 w-full p-6">
      <h3 className="mb-6 text-center text-2xl font-bold">Products</h3>

      {products.map((product) => (
        <ProductCard
          key={product.id}
          productId={product.id}
        />
      ))}
    </div>
  );
}
