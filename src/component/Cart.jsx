import CartItem from "./CartItem";

export default function Cart({
  cart,
  totalPrice,
  onRemove,
  onCheckout,
}) {
  if (cart.length === 0) {
    return (
      <>
        <h2>Shopping Cart</h2>
        <p>Your cart is empty.</p>
      </>
    );
  }

  return (
    <div>
      <h2>Shopping Cart</h2>

      <ul>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={onRemove}
          />
        ))}
      </ul>

      <div>
        <h3>Total: Rs.{totalPrice}</h3>

        <button onClick={onCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}