import { useContext, useEffect, useState } from "react";
import classes from "./AvailableCart.module.css";
import Card from "../../UI/Cards/Card";
import CartItem from "../CartItem/CartItem";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { manageCart, removeFromCart } from "../../../redux/action-creators/ActionCreator";
import product from "../../../ProductModal/ProductModal";

const AvailableCartProduct: React.FC = () => {
  // const cartctx = useContext(CartContext);
  const history = useHistory();


  const dispatch = useDispatch();
  const cartProduct = useSelector((state: RootState) => state.manageCartItem);
  const hasItems = cartProduct.products.length > 0;

  const addtoCartHandler = (product: any) => {    
    dispatch(manageCart({ ...product, amount: 1 }));
  };

  const removefromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const redirectToProductsHandle = () => {
    history.push("/gl-shop/product");
  };

  return (
    <div className={classes["backdrop"]}>
      <div className={classes["cart"]}>
        <Card>
          <div className={classes["cart-items"]}>
            <ul>
              {cartProduct.products.map((product : product) => {                
                return (
                  <CartItem
                    key={product.id}
                    id={product.id}
                    name={product.title}
                    desciption={product.description}
                    price={product.price}
                    image={product.image}
                    amount={product.amount}
                    onAdd={addtoCartHandler.bind(null, product)}
                    onRemove={removefromCartHandler.bind(null, product.id)}
                  ></CartItem>
                );
              })}
              <div className={classes["total"]}>
                {hasItems ? <span>Total</span> : <h4>Cart is empty</h4>}
                <span>
                  ₹{Math.abs(parseFloat(cartProduct.totalAmount.toFixed(2)))}
                </span>
              </div>
            </ul>
          </div>
          <div className={classes["actions"]}>
            <button
              className={classes["button--alt"]}
              onClick={redirectToProductsHandle}
            >
              Products
            </button>
            {hasItems && <button className={classes["button"]}>Order</button>}
          </div>
        </Card>
      </div>
    </div>
  );
};
export default AvailableCartProduct;
