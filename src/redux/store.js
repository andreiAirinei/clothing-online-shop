import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

// @...middlewares - It will spread all of the methods/values from the array into individual arguments

// techincally we don't need both exports
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

export default { store, persistor };
