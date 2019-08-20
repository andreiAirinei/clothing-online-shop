export const addItemToCart = (cartItems, cartItemToAdd) => {
  // If it matches, it will set that cart item, where this condition is true, to our constant. If it doesn't find anything after looping through everything, it will be undefined

  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  // Quantity property gets attached the first time around since this IF block won't run when it's a new item!
  if (existingCartItem) {
    // Map will return a new array with the items updated
    // @RETURN - will exit the function and will not continue it
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // This runs first when a new item is added to the cart
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
