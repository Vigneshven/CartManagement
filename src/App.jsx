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

import{
  setProduct,
  setCart,
  addProduct,
  updateCartItem,
  clearCart,
  removeCartItem,
} from "./redux/shopSlice"

import { useDispatch,useSelector } from "react-redux";

export default function App() {
  const dispatch = useDispatch();

  const products = useSelector((state)=>state.shop.product)

  const cart = useSelector((state)=>state.shop.cart)

  const [showAddProduct,setShowAddProduct]=useState(false)
  
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
    try{
      const data = await createProduct(product);

     dispatch(addProduct(data))

     setShowAddProduct(false)
    }catch(err){
      console.log(err)
    }
  };

  const addToCart = async (product) => {
    const existingItem = cart.find(
      (item) =>
        String(item.productId) === String(product.id)
    );

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      const data = await updateCartItems(
        existingItem.id,
        updatedItem
      );

      dispatch(updateCartItem(data))
    } else {
      const cartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      };

      const data = await addCartItem(cartItem);

      dispatch(addCartItem(data))
    }
  };

  const removeFromCart = async (cartId) => {
    await deleteCartItem(cartId);

    dispatch(removeCartItem)
  };

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    alert(
      `Thank you for your purchase! Total paid: Rs.${totalPrice}`
    );

    try {
      await Promise.all(
        cart.map((item) =>
          deleteCartItem(item.id)
        )
      );
      dispatch(clearCart())
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Your Cart Total is Rs.{totalPrice}</h1>

      <button onClick={(prev)=>!prev}>{
        showAddProduct?"Close":"Add Product"
        
        }</button>

      {showAddProduct&&<AddProduct
        onProductAdded={addNewProduct}
      />}

      <ProductList
        products={products}
        onAddToCart={addToCart}
      />

      <Cart
        cart={cart}
        totalPrice={totalPrice}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}