import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { checkoutCart } from "../redux/shopSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shop.cart);
  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0,
  );

  const onCheckout = async () => {
    alert(`Thank you for your purchase! Total paid: Rs.${totalPrice}`);
    await dispatch(checkoutCart());
  };

  return (
    <div className="mx-auto mt-2 w-full p-6">
      <h2 className="mb-6 text-center text-2xl font-bold">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="py-10 text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div>
            {cart.map((item) => (
              <CartItem key={item.id} itemId={item.id} />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between  pt-5">
            <h3 className="text-xl font-bold">Total: Rs.{totalPrice}</h3>

            <button
              type="button"
              onClick={onCheckout}
              className="rounded bg-black px-5 py-2 text-white hover:bg-gray-800"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
