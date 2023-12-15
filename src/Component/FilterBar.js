export default function FilterBar(props) {
  const { price, setPrice, setCategory } = props;

  return (
    // main container of filter bar
    <div className="p-4 bg-gray-100 h-96  rounded-md ">
      {/* heading */}
      <h1 className="text-2xl font-bold mb-4">FilterBar</h1>

      {/* price ranger and price slider  */}
      <div className="mb-4">
        {/* sub heading */}
        <span className="block text-lg font-semibold mb-2">
          Price: {`<= ${price}`}
        </span>
        {/* slider  */}
        <input
          type="range"
          min="100"
          max="50000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full"
        />
      </div>

      {/* sort item by category */}
      <div>
        {/* sub heading */}
        <span className="block text-lg font-semibold mb-2">Category:</span>

        {/* radio buttons for different category */}
        <div className="flex flex-col space-y-2">
          {/* men category */}
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-indigo-600"
              id="men"
              value="men"
              name="category"
              onClick={() => setCategory("men")}
            />
            <span className="ml-2">Men</span>
          </label>

          {/* women category */}
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-indigo-600"
              id="women"
              value="women"
              name="category"
              onClick={() => setCategory("women")}
            />
            <span className="ml-2">Women</span>
          </label>

          {/* electronic */}
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-indigo-600"
              id="electric"
              value="electric"
              name="category"
              onClick={() => setCategory("electric")}
            />
            <span className="ml-2">Electronic</span>
          </label>

          {/* jewellery */}
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-indigo-600"
              id="jewellery"
              value="jewellery"
              name="category"
              onClick={() => setCategory("jewellery")}
            />
            <span className="ml-2">Jewellery</span>
          </label>

          {/* none  */}
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-indigo-600"
              id="none"
              value="none"
              name="category"
              onClick={() => setCategory("none")}
            />
            <span className="ml-2">None</span>
          </label>
        </div>
      </div>
    </div>
  );
}
