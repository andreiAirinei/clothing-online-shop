// When we fire the state for the first time, it is going to be nothing
// Redux doesn't know that we have any state when the app first initializez
// Set an initial state
const INITIAL_STATE = {
  currentUser: null
};

// Keep in mind! NULL is considered a value! If NULL gets passed in the arguments, state does not get the default value

// !!! Every single reducer gets every single action that gets fired, even if those actions are not related to this reducer
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      // Return a new object which represents the new state that our user reducer is going to transform into
      // value is: everything else on the state (spread operator) plus the current user that is changed
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
