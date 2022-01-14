import { isTemplateSpan } from "typescript";
import Product from "../../Components/Shopping/Product/Product";
import product from "../../ProductModal/ProductModal";
import actionConstants from "../action-constants/ActionConstant";
import { initialProductState } from "../reducers/reducers";

export const getAllProducts = () => {
  return async function (dispatch: any) {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error("Something Went Wrong");
    } else {
      const productList: Product = await response.json();    
      dispatch({
        type: actionConstants.GET_ALL_PRODUCTS,
        payload: productList,
      });
    }
  };
};

export const manageCart = (product: product) => {
  return { type: actionConstants.ADD_TO_CARTS, payload: product };
};

export const fetchCartData = () => {
  return async (dispatch: any) => {
    const fetchData = async () => {
      console.log('fetch')
      const response = await fetch(
        "https://cart-8811b-default-rtdb.firebaseio.com/Cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      if (cartData.products) {
        dispatch({ type: actionConstants.REPLACE_CART, payload: cartData });
      }
    } catch (err) {}
  };
};

export const sendCartData = (cartData: typeof initialProductState) => {
  return async function () {
    console.log('send')
    const response = await fetch(
      "https://cart-8811b-default-rtdb.firebaseio.com/Cart.json",
      {
        method: "PUT",
        body: JSON.stringify({
          products: cartData.products,
          totalAmount: cartData.totalAmount,
        }),
      }
    );
   
  };
};

export const removeFromCart = (id: string) => {
  return { type: actionConstants.REMOVE_FROM_CART, payload: id };
};
