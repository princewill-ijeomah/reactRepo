import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./js/store/index";
import Users from "./js/components/Users";
import index from "./js/index";

render(
  <Provider store={store}>
    <Users />
  </Provider>,
  document.getElementById("root")
);
