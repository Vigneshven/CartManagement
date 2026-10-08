export default function CartItem({ item, onRemove }) {
  return (
    <div className="flex items-center gap-5 border-b py-5">

      <img
        src={item.image}
        alt={item.name}
        className="h-20 w-20 bg-gray-100 object-contain"
      />

      <div className="flex-1">
        <h3 className="font-bold">
          {item.name}
        </h3>

        <p className="mt-1 text-gray-500">
          Rs.{item.price} × {item.quantity}
        </p>
      </div>

      <p className="font-bold">
        Rs.{item.price * item.quantity}
      </p>

      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="rounded border px-3 py-1 text-sm hover:bg-black hover:text-white"
      >
        Remove
      </button>

    </div>
  );
}