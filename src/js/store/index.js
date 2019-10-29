// src/js/store/index.js

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { emptyFieldMiddleware } from "../middleware";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(emptyFieldMiddleware))
);

export default store;
