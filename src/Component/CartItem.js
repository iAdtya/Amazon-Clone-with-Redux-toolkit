// to call reducer actions
import { useDispatch } from "react-redux";

// thunk actions from Product Reducer
import {
  removeFromCartThunk,
  increaseQuantThunk,
  decreaseQuantThunk,
} from "../app/reducers/productReducers";

export default function CartItem(props) {
  const dispatch = useDispatch();

  const { name, image, price, category, quantity } = props.product;

  return (
    <>
      <div className="flex flex-wrap m-4">
        <div className="w-full m-4">
          <img src={image} alt={category} className="w-full h-full" />
        </div>

        <div className="w-full h-1/3">
          <div className="w-full overflow-hidden">{name}</div>

          <div className="h-1/3 flex justify-between text-red-500">
            <div className="text-red-500">₹{price}</div>

            <div className="text-black">
              <span className="text-red-500">
                <i
                  class="fa-solid fa-circle-minus"
                  onClick={() => dispatch(decreaseQuantThunk(props.product))}
                ></i>
              </span>
              &nbsp; {quantity} &nbsp;
              <span className="text-green-500">
                <i
                  class="fa-solid fa-circle-plus"
                  onClick={() => dispatch(increaseQuantThunk(props.product))}
                ></i>
              </span>
            </div>
          </div>

          <div className="h-1/3">
            <button
              className="w-full h-full text-lg border-none rounded text-white bg-gradient-to-r from-red-700 via-pink-500 to-red-700 hover:bg-none hover:border-2 hover:border-red-700 hover:text-red-700 font-bold"
              onClick={() => dispatch(removeFromCartThunk(props.product))}
            >
              Remove From Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
