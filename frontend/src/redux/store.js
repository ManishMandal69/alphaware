import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";  // Adjust the path as needed
import jobReducer from "./reducer/jobReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    jobList: jobReducer  // Using the default export from userSlice
  },
});

export default store;
