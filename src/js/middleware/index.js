// src/js/middleware/index.js

import { ADD_USERS } from "../constants/action-types";

//const forbiddenWords = ["spam", "money"];

export function emptyFieldMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === ADD_USERS) {
        /**const foundWord = forbiddenWords.filter(word =>
          action.payload.firstname.includes(word)
        );*/

        if (
          action.payload.firstname === "" ||
          action.payload.lastname === "" ||
          action.payload.birthdat === "" ||
          action.payload.age === "" ||
          action.payload.hobby === ""
        ) {
          return dispatch({ type: "FOUND_EMPTY_FIELD" });
        }
      }
      return next(action);
    };
  };
}
