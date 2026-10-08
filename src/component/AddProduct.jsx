import { useSelector, useDispatch } from "react-redux";

import {
  setProductName,
  setProductPrice,
  setProductImage,
  resetProductForm,
} from "../redux/productSlice";

export default function AddProduct({ onProductAdded }) {
  const dispatch = useDispatch();

  const {
    productName,
    productPrice,
    productImage,
  } = useSelector((state) => state.product);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !productPrice || !productImage) {
      alert("Please enter product name, price, and image URL");
      return;
    }

    const newProduct = {
      name: productName,
      price: Number(productPrice),
      image: productImage,
    };

    try {
      await onProductAdded(newProduct);

      dispatch(resetProductForm());

      alert("Product added successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  return (
    <>
      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>

          <input
            type="text"
            value={productName}
            onChange={(e) =>
              dispatch(setProductName(e.target.value))
            }
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label>Price</label>

          <input
            type="number"
            value={productPrice}
            onChange={(e) =>
              dispatch(setProductPrice(e.target.value))
            }
            placeholder="Enter price"
          />
        </div>

        <div>
          <label>Image URL</label>

          <input
            type="text"
            value={productImage}
            onChange={(e) =>
              dispatch(setProductImage(e.target.value))
            }
            placeholder="Enter image URL"
          />
        </div>

        <button type="submit">
          Add Product
        </button>
      </form>
    </>
  );
}