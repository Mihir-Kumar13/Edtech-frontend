import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./courseSlice";
import authReducer from "./authSlice";
const store = configureStore({
  reducer: {
    course: courseReducer,
    auth: authReducer,
  },
});

export default store;
