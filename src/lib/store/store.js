import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./features/comment/comment-slice";
// store variable as a global variable
const makeStore = () => {
  return configureStore({
    reducer: {
      comment: commentReducer,
    },
  });
};
export default makeStore;
