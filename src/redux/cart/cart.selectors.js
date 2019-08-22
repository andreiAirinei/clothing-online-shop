import { createSelector } from 'reselect';

// INPUT selector
// Gets the whole state and returns a slice
const selectCart = state => state.cart;

// const selectUser = state => state.user;

// OUTPUT selector
// @arg1 - collection, array of INPUT selectors
// @arg2 - a function that will return the value we want out of the selector

// This is now a MEMOIZED selector
export const selectCartItems = createSelector(
  // arg1 - [selectCart, selectUser]
  [selectCart],
  // arg2 - (cart, user)
  cart => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

// Select the total QUANTITY of items in the cart
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
);

// Select the total COST of items in the cart
export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
      0
    )
);
