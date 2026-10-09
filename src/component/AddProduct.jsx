import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";

import {
  createProductAsync,
  setShowAddProduct,
} from "../redux/shopSlice";

const productSchema = z.object({
  productName: z.string().min(2, "Product name is required"),

  productPrice: z
    .string()
    .min(1, "Price is required")
    .refine((value) => Number(value) > 0, {
      message: "Price must be greater than 0",
    }),

  productImage: z.string().url("Enter a valid image URL"),

  discount: z.string().min(1, "Enter atleast 1 discount").refine((value) => value.split(",").every((items) => {
    const discounts = Number(items.trim())
    return discounts !== "" && discounts >= 0 && discounts <= 100

  }), {
    message: "Discount Should between 0 to 100 separated by comma"
  }),
});

export default function AddProduct() {
  const dispatch = useDispatch();
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
      discount: data.discount.split(",").map((value)=>Number(value.trim())),
    };

    await dispatch(createProductAsync(newProduct)).unwrap();

    reset();
    dispatch(setShowAddProduct(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Add New Product</h2>

          <button
            type="button"
            onClick={() => dispatch(setShowAddProduct(false))}
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

            <input
              type="text"
              {...register("discount")}
              min="0"
              max="100"
              placeholder="Enter Discount 10,20,30"
              className="w-full rounded border px-3 py-2 outline-none focus:border-black"

            />
            {errors.discount && (
              <p className="mt-1 text-sm text-red-500">
                {errors.discount.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => dispatch(setShowAddProduct(false))}
              className="rounded border px-5 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button type="submit" className="rounded bg-black px-5 py-2 text-white hover:bg-gray-800">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
