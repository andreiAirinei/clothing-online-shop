import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

// If redux-thunk middleware is enabled, any time you attempt to dispatch a function instead of an object, the middleware will call that function with dispatch method itself as the first argument

const middlewares = [thunk];

// set the logger only for development
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

// @...middlewares - It will spread all of the methods/values from the array into individual arguments

// techincally we don't need both exports
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

export default { store, persistor };
