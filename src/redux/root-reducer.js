import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';

// Our full state in REDUX is just one big JSON object
// The keys that represent the individual slices of state is the actual reducers that we wrote
export default combineReducers({
  user: userReducer
});
