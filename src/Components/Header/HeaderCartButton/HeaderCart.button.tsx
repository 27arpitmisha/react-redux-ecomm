import classes from "./HeaderCart.module.css";
import CartIcon from "../../UI/CartIcon";
import React, { MouseEventHandler, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers/index";
import product from "../../../ProductModal/ProductModal";
const HeaderCart: React.FC = () => {  
  const history = useHistory();

  const productsOnCart = useSelector((state:RootState) => state.manageCartItem)
  const numberOfCartItems = productsOnCart.products.reduce((curNumber : number, product : product) => {
    return curNumber + product.amount;
  }, 0);

  const cartClickHandle = () => {
    history.push("/gl-shop/cart");
  };
  return (
    <button className={classes["button"]} onClick={cartClickHandle}>
      <span className={classes["icon"]}>
        <CartIcon></CartIcon>
      </span>
      <span>Check Cart</span>
      <span className={classes["badge"]}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCart;
