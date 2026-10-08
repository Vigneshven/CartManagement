function Form() {
  return (
    <div>
      <form className="flex flex-col gap-3 w-80 border p-5 rounded">

        <input
          type="text"
          placeholder="Product name"
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Image URL"
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-500 text-white py-2 rounded"
        >
          Submit
        </button>

      </form>
    </div>
  )
}

export default Form