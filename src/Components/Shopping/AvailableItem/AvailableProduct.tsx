import React, { Fragment, useContext, useEffect, useState } from "react";
import classes from "./AvailableProduct.module.css";
import Card from "../../UI/Cards/Card";
import Spinner from "../../UI/Spinner/Spinner";
import Product from "../Product/Product";
import BannerImage from "../../../Assets/banner2.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import product from "../../../ProductModal/ProductModal";
import { getAllProducts } from "../../../redux/action-creators/ActionCreator";

const AvailableItem = () => {
  const [errorMsg, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const product = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());   
    // setProducts([...products]);
  }, []);

  return (
    <Fragment>
      <div className={classes["main-image"]}>
        <img src={BannerImage} />
      </div>
      <section className={classes["shops"]}>
        <ul>
          {errorMsg ? (
            <h3 className={classes["error"]}>Something went wrong! </h3>
          ) : isLoading ? (
            <Spinner></Spinner>
          ) : (
            <Card>
              {product.products.map((product:any) => {
                return (
                  <Product key={product.id} singleProduct={product}></Product>
                );
              })}
            </Card>
          )}
        </ul>
      </section>
    </Fragment>
  );
};
export default AvailableItem;
