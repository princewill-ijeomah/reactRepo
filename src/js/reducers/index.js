// src/reducers/index.js
import { ADD_USERS } from "../constants/action-types";

const initialState = {
  users: [],
  errors: ""
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_USERS) {
    return Object.assign({}, state, {
      users: state.users.concat(action.payload)
    });
  }
  return state;
}

export default rootReducer;
