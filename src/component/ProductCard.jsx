import { useState } from "react";

export default function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const discountPrice =
    product.price - (product.price * product.discount) / 100;

  const totalPrice = discountPrice * quantity;

  return (
    <div className="flex items-center gap-8 border-b p-6">
      <img
        src={product.image}
        alt={product.name}
        className="h-32 w-32 bg-gray-100 object-contain"
      />

      <div className="flex-1">
        <h3 className="text-xl font-bold">{product.name}</h3>

        <p className="mt-2 text-gray-500">Order today</p>

        <p className="mt-1 text-gray-500">Delivery by Dec 23</p>

        <p className="mt-1 text-gray-500">Only 8 Available</p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <select value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="rounded border border-gray-300 p-2" aria-label="Select quantity" >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) =>
          (<option key={qty} value={qty}> Qty: {qty}
          </option>))}
        </select>

        </div>

        <div>
          <p className="text-xl font-bold">Rs.{totalPrice}</p>

          <p className="text-sm text-gray-500 line-through">Rs.{product.price}</p>

          <p className="text-sm text-green-600">{product.discount}% OFF</p>
        </div>

        <button
          type="button"
          onClick={() => onAddToCart(product,quantity)}
          className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-black hover:text-white"
        >
          Add To Cart
        </button>
      </div>
      );
}
