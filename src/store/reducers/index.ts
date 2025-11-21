import { authReducer, authSlice } from "@/store/reducers/authSlice";
import { miningReducer, miningSlice } from "@/store/reducers/miningSlice";
import { newsReducer, newsSlice } from "@/store/reducers/newsSlice";
import { combineReducers } from "@reduxjs/toolkit";
const rootReducer = combineReducers({
  [authSlice.name]: authReducer,
  [miningSlice.name]: miningReducer,
  [newsSlice.name]: newsReducer,  
});

export default rootReducer;