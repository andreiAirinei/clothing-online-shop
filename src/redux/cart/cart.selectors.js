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

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
);
