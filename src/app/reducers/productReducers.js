import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { db } from "../../firebaseInit";

import {
  updateDoc,
  doc,
  arrayUnion,
  onSnapshot,
  arrayRemove,
} from "firebase/firestore";

import { toast } from "react-toastify";

function getDate() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export const getInitialCartOrdersThunk = createAsyncThunk(
  "product/getCartOrders",
  (args, thunkAPI) => {
    const { authReducer, productReducer } = thunkAPI.getState();
    const { isLoggedIn, userLoggedIn } = authReducer;

    if (isLoggedIn) {
      const snap = onSnapshot(doc(db, "Users", userLoggedIn.id), (doc) => {
        const data = doc.data();
        thunkAPI.dispatch(setCart(data.cart));
        thunkAPI.dispatch(setMyOrders(data.orders));
      });
    }
    return productReducer.cart;
  }
);

export const addToCartThunk = createAsyncThunk(
  "product/addToCart",
  async (arg, thunkAPI) => {
    const { authReducer, productReducer } = thunkAPI.getState();
    const { isLoggedIn, userLoggedIn } = authReducer;

    if (!isLoggedIn) {
      toast.error("Please Login!!!");
      return;
    }

    const index = productReducer.cart.findIndex(
      (item) => item.name === arg.name
    );
    if (index !== -1) {
      thunkAPI.dispatch(increaseQuantThunk(productReducer.cart[index]));
      toast.success("Product Quantity Increased!!");
      return;
    }

    const userRef = doc(db, "Users", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: arrayUnion({ quantity: 1, ...arg }),
    });

    thunkAPI.dispatch(increaseTotalAmount(arg.price));
    thunkAPI.dispatch(increaseTotalItem());

    toast.success("Added to you Cart!!!");
  }
);

export const increaseQuantThunk = createAsyncThunk(
  "product/increaseProductQuantity",
  async (product, thunkAPI) => {
    // user's data
    const { productReducer } = thunkAPI.getState();

    // finding product inside the cart
    const index = productReducer.cart.findIndex(
      (item) => item.name === product.name
    );

    // increase the quantity of product in initialState cart
    thunkAPI.dispatch(increaseProductQuantity(index));

    // increase total amount of products in cart
    thunkAPI.dispatch(increaseTotalAmount(product.price));

    // update the cart inside the database
    thunkAPI.dispatch(updateCartInDatabase());
  }
);

export const decreaseQuantThunk = createAsyncThunk(
  "product/decreaseProductQuantity",
  async (product, thunkAPI) => {
    // getting user's data
    const { productReducer } = thunkAPI.getState();

    // finding the product inside the cart
    const index = productReducer.cart.findIndex(
      (item) => item.name === product.name
    );

    // if quantity of product is 1 then remove it from the cart
    if (productReducer.cart[index].quantity === 1) {
      thunkAPI.dispatch(removeFromCartThunk(product));
      return;
    }

    // else
    // decrease the quantity of product inside the cart
    thunkAPI.dispatch(decreaseProductQuantity(index));

    // reduce the amount of product from total amount of cart
    thunkAPI.dispatch(reduceTotalAmount(productReducer.cart[index].price));

    // update the cart inside the database
    thunkAPI.dispatch(updateCartInDatabase());
  }
);

export const removeFromCartThunk = createAsyncThunk(
  "product/removeFromCart",
  async (arg, thunkAPI) => {
    const { authReducer } = thunkAPI.getState();
    const { userLoggedIn } = authReducer;

    const userRef = doc(db, "Users", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: arrayRemove(arg),
    });
    return arg;
  }
);

export const clearCartThunk = createAsyncThunk(
  "product/emptyCart",
  async (arg, thunkAPI) => {
    const { authReducer, productReducer } = thunkAPI.getState();
    const { userLoggedIn } = authReducer;

    if (productReducer.itemInCart === 0) {
      toast.error("Cart is already empty!!!");
      return;
    }

    const userRef = doc(db, "Users", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: [],
    });
    toast.success("Cart is empty now!!!");
  }
);

export const purchaseAllThunk = createAsyncThunk(
  "product/purchaseAllItems",
  async (arg, thunkAPI) => {
    const { authReducer, productReducer } = thunkAPI.getState();
    const { userLoggedIn } = authReducer;

    const currentDate = getDate();
    const userRef = doc(db, "Users", userLoggedIn.id);
    await updateDoc(userRef, {
      orders: arrayUnion({
        date: currentDate,
        items: productReducer.cart,
        amount: productReducer.total,
      }),
    });
    thunkAPI.dispatch(clearCartThunk());
  }
);

const updateCartInDatabase = createAsyncThunk(
  'product/updateCartInDatabase',
  async(args,thunkAPI) => {

      // user's data from initialState
      const {authReducer, productReducer} = thunkAPI.getState();
      const { userLoggedIn } = authReducer;

      // update the cart inside the firebase database
      const userRef = doc(db, "buybusy-redux", userLoggedIn.id);
      await updateDoc(userRef, {
          cart: productReducer.cart
      });
  }
)

const productSlice = createSlice({
  name: "product",
  initialState: {
    cart: [],
    itemInCart: 0,
    myorders: [],
    total: 0,
  },
  reducers: {
    setMyOrders: (state, action) => {
      state.myorders = action.payload;
      return;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
      return;
    },
    increaseProductQuantity: (state, action) => {
      const index = action.payload;
      state.cart.at(index).quantity++;
      return;
    },
    decreaseProductQuantity: (state, action) => {
      const index = action.payload;
      state.cart.at(index).quantity--;
      return;
    },
    increaseTotalItem: (state, action) => {
      state.itemInCart++;
      return;
    },
    increaseTotalAmount: (state, action) => {
      state.total += action.payload;
      return;
    },
    reduceTotalAmount: (state, action) => {
      state.total -= action.payload;
      return;
    },
  },
  extraReducers: (builder) => {
    // update the state after getting data from database
    builder
      .addCase(getInitialCartOrdersThunk.fulfilled, (state, action) => {
        const cart = action.payload;
        if (cart) {
          let sum = 0,
            len = 0;
          cart.map((item) => {
            Number((sum += item.price * item.quantity));
            Number((len += item.quantity));
          });
          state.total = sum;
          state.itemInCart = len;
        }
      })
      // update state after increasing product quantity in cart and database
      .addCase(increaseQuantThunk.fulfilled, (state, action) => {
        state.itemInCart++;
      })
      // update state after decreasing product quantity in cart and database
      .addCase(decreaseQuantThunk.fulfilled, (state, action) => {
        if (state.itemInCart > 1) {
          state.itemInCart--;
        }
      })
      // update state after removing product from cart and database
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        const product = action.payload;
        // reduce item count and total amount
        state.total -= product.quantity * product.price;
        state.itemInCart -= product.quantity;
        // notification
        toast.success("Removed from Cart!!");
      })
      // update state after removing all products from cart
      .addCase(clearCartThunk.fulfilled, (state, action) => {
        state.itemInCart = 0;
        state.total = 0;
        state.cart = [];
      });
  },
});

// exporting the reducers of slice
export const productReducer = productSlice.reducer;

export const {
  setMyOrders,
  increaseProductQuantity,
  decreaseProductQuantity,
  setCart,
  increaseTotalItem,
  increaseTotalAmount,
  reduceTotalAmount,
} = productSlice.actions;

//exporting the state of reducer to get data
export const productSelector = (state) => state.productReducer;
