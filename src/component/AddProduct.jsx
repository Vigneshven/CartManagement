import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const productSchema = z.object({
  productName: z.string().min(2, "Product name is required"),

  productPrice: z
    .string()
    .min(1, "Price is required")
    .refine((value) => Number(value) > 0, {
      message: "Price must be greater than 0",
    }),

  productImage: z.string().url("Enter a valid image URL"),

  discount: z.string().min(1, "Please select a discount"),
});

export default function AddProduct({ onProductAdded, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data) => {
    const newProduct = {
      name: data.productName,
      price: Number(data.productPrice),
      image: data.productImage,
      discount: Number(data.discount),
    };

    await onProductAdded(newProduct);

    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Add New Product</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black"
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block font-medium">Product Name</label>

            <input
              {...register("productName")}
              placeholder="Enter product name"
              className="w-full rounded border px-3 py-2 outline-none focus:border-black"
            />

            {errors.productName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.productName.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block font-medium">Price</label>

            <input
              type="number"
              {...register("productPrice")}
              placeholder="Enter price"
              className="w-full rounded border px-3 py-2 outline-none focus:border-black"
            />

            {errors.productPrice && (
              <p className="mt-1 text-sm text-red-500">
                {errors.productPrice.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block font-medium">Image URL</label>

            <input
              {...register("productImage")}
              placeholder="Enter image URL"
              className="w-full rounded border px-3 py-2 outline-none focus:border-black"
            />

            {errors.productImage && (
              <p className="mt-1 text-sm text-red-500">
                {errors.productImage.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block font-medium">Discount</label>

            <select
              {...register("discount")}
              className="w-full rounded border px-3 py-2"
            >
              <option value="">Select Discount</option>
              <option value="10">10%</option>
              <option value="20">20%</option>
              <option value="30">30%</option>
              <option value="40">40%</option>
              <option value="50">50%</option>
            </select>

            {errors.discount && (
              <p className="mt-1 text-sm text-red-500">
                {errors.discount.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded border px-5 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded bg-black px-5 py-2 text-white hover:bg-gray-800"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
