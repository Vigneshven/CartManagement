import { useEffect, useState } from "react";

import AddProduct from "./component/AddProduct";
import ProductList from "./component/ProductList";
import Cart from "./component/Cart";

import {
  getProducts,
  getCart,
  createProduct,
  addCartItem,
  updateCartItems,
  deleteCartItem,
} from "./services/api";

import {
  setProduct,
  setCart,
  addProduct,
  addCartItem as addCartItemRedux,
  updateCartItem,
  clearCart,
  removeCartItem,
} from "./redux/shopSlice";

import { useDispatch, useSelector } from "react-redux";
import Header from "./component/Header";

export default function App() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.shop.products);

  const cart = useSelector((state) => state.shop.cart);

  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await getProducts();
        const cartData = await getCart();

        dispatch(setProduct(productsData));
        dispatch(setCart(cartData));
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, [dispatch]);

  const addNewProduct = async (product) => {
    try {
      const data = await createProduct(product);

      dispatch(addProduct(data));

      setShowAddProduct(false);
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (product,selectedQuantity=1) => {
    const existingItem = cart.find(
      (item) => String(item.productId) === String(product.id),
    );

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + selectedQuantity,
      };

      const data = await updateCartItems(existingItem.id, updatedItem);

      dispatch(updateCartItem(data));
    } else {
      const discountPrice =
        product.price - (product.price * product.discount) / 100;

      const cartItem = {
        productId: product.id,
        name: product.name,
        price: discountPrice,
        image: product.image,
        quantity: selectedQuantity,
      };

      const data = await addCartItem(cartItem);

      dispatch(addCartItemRedux(data));
    }
  };

  const removeFromCart = async (cartId) => {
    await deleteCartItem(cartId);

    dispatch(removeCartItem(cartId));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    alert(`Thank you for your purchase! Total paid: Rs.${totalPrice}`);

    try {
      await Promise.all(cart.map((item) => deleteCartItem(item.id)));
      dispatch(clearCart());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex h-30 flex-col items-center justify-center gap-5 ">
        <h1 className="text-shadow-black sm:text-3xl font-bold">
          Your Cart Total is Rs.{totalPrice}
        </h1>
        <button
          onClick={() => setShowAddProduct(true)}
          className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          Add Product
        </button>
        <hr className="border-gray-900 w-full" />
      </div>
      {showAddProduct && (
        <AddProduct
          onProductAdded={addNewProduct}
          onClose={() => setShowAddProduct(false)}
        />
      )}

      <ProductList products={products} onAddToCart={addToCart} />

      <Cart
        cart={cart}
        totalPrice={totalPrice}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
