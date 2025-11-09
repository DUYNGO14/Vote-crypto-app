import { authReducer, authSlice } from "@/store/reducers/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
const rootReducer = combineReducers({
  [authSlice.name]: authReducer,
});

export default rootReducer;