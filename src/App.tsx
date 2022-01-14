import { Fragment, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Redirect, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import AvailableCartProduct from "./Components/Cart/AvailableCartProduct/AvailableCartProduct";
import Header from "./Components/Header/Header";
import AvailableItem from "./Components/Shopping/AvailableItem/AvailableProduct";
import ProductDetails from "./Components/Shopping/ProductDetail/ProductDetails";
import PageNotFound from "./Components/UI/PageNotFound/PageNotFound";
import { fetchCartData, sendCartData } from "./redux/action-creators/ActionCreator";
import { RootState } from "./redux/reducers";


let isInitial = true;
function App() {
  const [showWishList, setShowWishList] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.manageCartItem);

  const showWishListHandler = () => {
    setShowWishList(true);
  };
  const hideWishListhandler = () => {
    setShowWishList(false);
  };

  // useEffect(() => {
  //   dispatch(fetchCartData());
  // }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;     
      dispatch(fetchCartData());
      return;
    }      
      dispatch(sendCartData(cart));    
  }, [cart, dispatch]);

  return (
    <Fragment>
      <Header onClickWishList={showWishListHandler}></Header>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/gl-shop/product" />
        </Route>
        <Route path="/gl-shop" exact>
          <Redirect to="/gl-shop/product" />
        </Route>
        <Route path="/gl-shop/product" exact>
          <AvailableItem></AvailableItem>
        </Route>
        <Route path="/gl-shop/product/:productId">
          <ProductDetails></ProductDetails>
        </Route>
        <Route path="/gl-shop/cart">
          <AvailableCartProduct></AvailableCartProduct>
        </Route>
        <Route path="*" exact={true} component={PageNotFound}></Route>
      </Switch>
    </Fragment>
  );
}

export default App;
