import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

// @...middlewares - It will spread all of the methods/values from the array into individual arguments
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
