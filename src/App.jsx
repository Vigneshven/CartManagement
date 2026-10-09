import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddProduct from "./component/AddProduct";
import Cart from "./component/Cart";
import Header from "./component/Header";
import ProductList from "./component/ProductList";
import { loadShopData, setShowAddProduct } from "./redux/shopSlice";

export default function App() {
  const dispatch = useDispatch();
  const { cart, showAddProduct } = useSelector((state) => state.shop);
  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0,
  );

  useEffect(() => {
    dispatch(loadShopData());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="flex h-30 flex-col items-center justify-center gap-5">
        <h1 className="text-shadow-black sm:text-3xl font-bold">
          Your Cart Total is Rs.{totalPrice}
        </h1>
        <button
          type="button"
          onClick={() => dispatch(setShowAddProduct(true))}
          className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          Add Product
        </button>
        <hr className="border-gray-900 w-full" />
      </div>

      {showAddProduct && <AddProduct />}
      <ProductList />
      <Cart />
    </div>
  );
}
