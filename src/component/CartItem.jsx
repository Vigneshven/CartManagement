export default function CartItem({ item, onRemove }) {
  return (
    <li>
      <span>
        {item.name} - Rs.{item.price} x {item.quantity}
      </span>

      <button
        onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </li>
  );
}