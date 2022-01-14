import { combineReducers } from "redux";
import { manageCart, productReducers } from "./reducers";

export const rootReducer = combineReducers({
  product: productReducers,
  manageCartItem: manageCart,
});

export type RootState = ReturnType<typeof rootReducer>;
