import { useEffect, useState } from "react";
import { productSelector } from "../app/reducers/productReducers";
import { Link } from "react-router-dom";

import OrderDetail from "../Component/OrderDetail";
import { useSelector } from "react-redux";

export function MyOrder() {
  const { myorders } = useSelector(productSelector);
  // console.log(myorders);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">My Orders!!</h1>
      {myorders && myorders.length === 0 ? (
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-2">
            You Haven't Placed any orders yet!!
          </h1>
          <Link to="/" className="text-blue-500 underline">
            Start Shopping!!
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-md mx-auto">
          {myorders.map((order, i) => (
            <OrderDetail order={order} key={i} className="mb-4" />
          ))}
        </div>
      )}
    </div>
  );
}
