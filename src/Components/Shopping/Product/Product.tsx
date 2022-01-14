import React, { useContext, useState } from "react";
import classes from "./Product.module.css";
import ShoppingForm from "./ShoppingItemForm";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { manageCart } from "../../../redux/action-creators/ActionCreator";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}
interface ProductData {
  key: string;
  singleProduct: Product;
}

const Product: React.FC<ProductData> = ({ singleProduct }) => {
  const [wishListStatus, setwishListStatus] = useState(false); 
  const history = useHistory();
  const dispatch = useDispatch();

 
  const sendProductHandler = () => {
    history.push(`/gl-shop/product/${singleProduct.id}`);
  };
  const addToCarthandle = (numOfItem: number) => {     
    const product = {
        id: singleProduct.id,
        title: singleProduct.title,
        description: singleProduct.description,
        price: singleProduct.price,
        image: singleProduct.image,
        amount: numOfItem
      }      
    dispatch(manageCart(product));
  };
  return (
    <li className={classes["shop"]}>
      <div className={classes["item"]}>
        <img
          src={singleProduct.image}
          alt={singleProduct.title}
          onClick={sendProductHandler}
        />
        <div className={classes["detail"]}>
          <h3>{singleProduct.title}</h3>
          <div className={classes["description"]}>
            {singleProduct.description.substring(0,90)}
          </div>
          <div className={classes["price"]}>₹{singleProduct.price}</div>
        </div>
      </div>
      <div>
        {
          <ShoppingForm
            id={singleProduct.id}
            onClick={addToCarthandle}                      
          />
        }
      </div>
    </li>
  );
};
export default Product;
