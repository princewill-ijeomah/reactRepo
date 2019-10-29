// src/js/actions/index.js
import { ADD_USERS } from "../constants/action-types";

export function addUser(payload) {
  return { type: ADD_USERS, payload };
}
