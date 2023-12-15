export default function OrderDetail(props) {
  const { date, list, amount } = props.order;
  console.log(list);
  return (
    <div className="bg-white shadow-md rounded-md p-6 my-4 mx-auto w-full md:w-3/4">
      <h1 className="text-xl font-bold mb-4 text-center">Ordered On: {date}</h1>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 p-2">S.no</th>
            <th className="border-b-2 border-gray-300 p-2">Product Name</th>
            <th className="border-b-2 border-gray-300 p-2">Price</th>
            <th className="border-b-2 border-gray-300 p-2">Quantity</th>
            <th className="border-b-2 border-gray-300 p-2">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((item, index) => (
              <tr key={index}>
                <td className="border-b border-gray-200 p-2">{index + 1}</td>
                <td className="border-b border-gray-200 p-2">{item.name}</td>
                <td className="border-b border-gray-200 p-2">{item.price}</td>
                <td className="border-b border-gray-200 p-2">
                  {item.quantity}
                </td>
                <td className="border-b border-gray-200 p-2">
                  ₹{item.price * item.quantity}
                </td>
              </tr>
            ))}
          <tr>
            <td className="p-2" colSpan={4}>
              Grand Total
            </td>
            <td className="p-2">₹{amount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
