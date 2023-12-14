// // to call reducer actions
// import { useDispatch } from "react-redux";

// // thunk actions from Product Reducer
// import {
//   removeFromCartThunk,
//   increaseQuantThunk,
//   decreaseQuantThunk,
// } from "../../Redux/Reducers/productReducer";

// import oldStyles from "../../styles/home.module.css";
// import styles from "../../styles/cart.module.css";

// export default function CartItem(props) {
//   const dispatch = useDispatch();

//   const { name, image, price, category, quantity } = props.product;

//   return (
//     <>
//       <div className={oldStyles.cardContainer}>
//         <div className={styles.imageContainer}>
//           <img src={image} alt={category} />
//         </div>

//         <div className={styles.itemInfo}>
//           <div className={styles.namePrice}>{name}</div>

//           <div className={styles.priceQuant}>
//             <div className={styles.price}>₹{price}</div>

//             <div className={styles.quantity}>
//               <span className={styles.minus}>
//                 <i
//                   class="fa-solid fa-circle-minus"
//                   onClick={() => dispatch(decreaseQuantThunk(props.product))}
//                 ></i>
//               </span>
//               &nbsp; {quantity} &nbsp;
//               <span className={styles.plus}>
//                 <i
//                   class="fa-solid fa-circle-plus"
//                   onClick={() => dispatch(increaseQuantThunk(props.product))}
//                 ></i>
//               </span>
//             </div>
//           </div>

//           <div className={styles.btnContainer}>
//             <button
//               className={styles.removeBtn}
//               onClick={() => dispatch(removeFromCartThunk(props.product))}
//             >
//               Remove From Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
