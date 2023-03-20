import { configureStore } from "@reduxjs/toolkit";
import ReduxThunk from "redux-thunk";

import { completeSlice, todoSlice } from "./reducers/index.jsx";
export const middlewares = [ReduxThunk];

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
    completion: completeSlice.reducer,
  },
  middleware: middlewares,
});
