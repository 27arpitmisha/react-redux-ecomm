import Product from "../../Components/Shopping/Product/Product";
import product from "../../ProductModal/ProductModal";
import actionConstants from "../action-constants/ActionConstant";

// export const initialProducts = {
//   products: [
//     {
//       id: "",
//       title: "",
//       description: "",
//       image: "",
//       price: 0,
//       amount: 0,
//     },
//   ],
//   totalAmount: 0,
// };

let initialProducts : product[] = [];

export const initialProductState = {
  products : initialProducts,
  totalAmount : 0
}

export const productReducers = (
  state = initialProductState,
  action: { type: string; payload: product[] }
) => {
  switch (action.type) {
    case actionConstants.GET_ALL_PRODUCTS: {
      // const allProducts = action.payload;
      return { ...state, products: action.payload };
    }
    default:{      
      return state; 
    }
  }
};

export const manageCart = (
  state = initialProductState,
  action: { type: string; payload:  any }
) => {
  switch (action.type) {
    case actionConstants.ADD_TO_CARTS:
      {
        const updatedAmount = state.totalAmount + action.payload.price;

        const existingProductID = state.products.findIndex((product: any) => {
          if (product.id == action.payload.id) {
            return product.id;
          }
        });

        let updatedCartItem;
        const existingProduct = state.products[existingProductID];

        if (existingProductID >= 0) {
          const updateProduct = {
            ...existingProduct,
            amount:
              state.products[existingProductID].amount + action.payload.amount,
          };

          updatedCartItem = [...state.products];
          updatedCartItem[existingProductID] = updateProduct;
        } else {
          updatedCartItem = state.products.concat(action.payload);
        }
        const finalProductList = updatedCartItem.filter((product : product) => product.id != '')        
        return {
          products: finalProductList,
          totalAmount: updatedAmount,
        };
      }
      break;
    case actionConstants.REMOVE_FROM_CART: {
      const existingProductID = state.products.findIndex((item: Product) => {
        if (item.id === action.payload) {
          return item;
        }
      });
      const existingProduct = state.products[existingProductID];
      const updatedAmount = state.totalAmount - existingProduct.price;
      let UpdatedProducts;
      if (existingProduct.amount === 1) {
        UpdatedProducts = state.products.filter(
          (product: product) => product.id !== action.payload
        );
      } else {
        state.products[existingProductID].amount =
          state.products[existingProductID].amount - 1;
        UpdatedProducts = [...state.products];
      }     
      return {
        products: UpdatedProducts,
        totalAmount: updatedAmount,
      };
    }
    case actionConstants.REPLACE_CART: {    
      return {
        products: action.payload.products,
        totalAmount: action.payload.totalAmount,
      };
    }
    default:
      return state;
  }
};
