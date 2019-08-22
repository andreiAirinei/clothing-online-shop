import CartActionTypes from './cart.types';

// We don't need payload here
// Payload is an optional property
export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
});

export const decreaseItemQuantity = item => ({
  type: CartActionTypes.DECREASE_ITEM_QUANTITY,
  payload: item
});
