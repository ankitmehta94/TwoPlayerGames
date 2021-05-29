import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import createReducer from './rootReducer';

import api from '../Utilities/Api';

const middlewares = [
  reduxThunk.withExtraArgument({api}),
];

const __BROWSER__ = typeof window!=="undefined";

const storeEnhancers = [
  applyMiddleware(...middlewares),
  __BROWSER__  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : (f) => f,
];

export default (initialState) => {
  const store = createStore(createReducer(), initialState, compose(...storeEnhancers) );
  store.asyncReducers = {};
  return store;
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}