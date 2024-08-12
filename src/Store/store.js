import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./courseSlice";
import authReducer from "./authSlice";
import formReducer from "./formSlice";
const store = configureStore({
  reducer: {
    course: courseReducer,
    auth: authReducer,
    form: formReducer,
  },
});

export default store;
