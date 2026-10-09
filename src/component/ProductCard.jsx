import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  setProductSelection,
} from "../redux/shopSlice";

export default function ProductCard({ productId }) {
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.shop.products.find((item) => String(item.id) === String(productId)),
  );
  const selection = useSelector(
    (state) =>
      state.shop.productSelections[productId] ?? {
        quantity: 1,
        selectedDiscount: 0,
      },
  );

  if (!product) return null;

  const { quantity, selectedDiscount } = selection;

  const discountPrice =
    product.price * (1 - selectedDiscount / 100);

  const totalPrice = discountPrice * quantity;
  const discountOptions = Array.isArray(product.discount)
    ? product.discount
    : product.discount != null
      ? [product.discount]
      : [];

  return (
    <div className="overflow-hidden rounded-b-lg flex flex-col items-center sm:flex-row sm:items-center gap:4 sm:gap-8 border-b p-4 sm:p-6">
      <img
        src={product.image}
        alt={product.name}
        className="h-32 w-32 transition-transform duration-200 hover:scale-110 bg-gray-100 object-contain"
      />

        <div className="flex flex-col">
          <h3 className="text-xl font-bold">{product.name}</h3>
        </div>
        <div className="flex w-full flex-1 flex-col justify-center text-center">
        <p className="mt-2 text-gray-500">Order today</p>

        <p className="mt-1 text-gray-500">Delivery by Oct 23</p>

        <p className="mt-1 text-gray-500">Only 8 Available</p>
        </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <label className="block mb-1">Select Discount</label>

        <select
          value={selectedDiscount}
          onChange={(e) =>
            dispatch(
              setProductSelection({
                productId,
                field: "selectedDiscount",
                value: Number(e.target.value),
              }),
            )
          }
          className="w-3xs rounded border px-3 py-2"
        >
          <option value={0}>No Discount</option>

          {discountOptions.map((discount) => (
            <option key={discount} value={discount}>
              {discount}% OFF
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-center gap-3">
        <select value={quantity}
          onChange={(e) =>
            dispatch(
              setProductSelection({
                productId,
                field: "quantity",
                value: Number(e.target.value),
              }),
            )
          }
          className="rounded border border-gray-300 p-2" aria-label="Select quantity" >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) =>
          (<option key={qty} value={qty}> Qty: {qty}
          </option>))}
        </select>

      </div>

      <div className="w-full flex flex-col items-center md:flex flex-1">
        <p className="text-xl font-bold">Rs.{totalPrice}</p>

        <p className="text-sm text-gray-500 line-through">Rs.{product.price}</p>

        <p className="text-sm text-green-600">{selectedDiscount}% OFF</p>
      </div>

      <button
        type="button"
        onClick={() =>
          dispatch(
            addProductToCart({
              product,
              quantity,
              selectedDiscount,
            }),
          )
        }
        className="mt-2 rounded border border-gray-300 px-4 py-2 text-sm hover:bg-black hover:text-white"
      >
        Add To Cart
      </button>
    </div>
  );
}
