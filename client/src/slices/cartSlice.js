import { createSlice } from '@reduxjs/toolkit';
import secureLocalStorage from 'react-secure-storage';

let initialState = {
  cartItems: secureLocalStorage.getItem('cartItems')
    ? JSON.parse(secureLocalStorage.getItem('cartItems'))
    : [],
  // shippingCost: secureLocalStorage.getItem('shipping')
  //   ? JSON.parse(secureLocalStorage.getItem('shipping'))
  //   : 0,

  shipping: secureLocalStorage.getItem('shipping')
    ? JSON.parse(secureLocalStorage.getItem('shipping'))
    : 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;

      newItem.price = newItem.price.toFixed(2);

      // check if item already in cart
      const itemExists = state.cartItems.find((product) => {
        return product.id === newItem.id && product.size === newItem.size;
      });

      //if qty is > stock set their quantity to the stock
      let qtyExceedsStock = false;
      if (itemExists) {
        if (newItem.quantity + itemExists?.quantity > newItem.stock) {
          newItem.quantity = newItem.stock;
          qtyExceedsStock = true;
        }
      }

      // if item already in cart just update quantity
      if (itemExists) {
        state.cartItems = state.cartItems.map((product) => {
          if (
            product.id === itemExists.id &&
            product.size === itemExists.size
          ) {
            return {
              ...product,
              //if qty is > stock set their quantity to the stock
              quantity: qtyExceedsStock
                ? Number.parseInt(newItem.stock, 10)
                : Number.parseInt(product.quantity, 10) +
                  Number.parseInt(newItem.quantity, 10),
            };
          } else {
            return product;
          }
        });
      }

      // if item not already in cart add to cart
      if (!itemExists) {
        state.cartItems = [...state.cartItems, newItem];
      }

      secureLocalStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    updateQty(state, action) {
      const { newQty, cakeId, cakeSize, stock } = action.payload;

      // replace old qty of item with new
      state.cartItems = state.cartItems.map((product) => {
        if (product.id === cakeId && product.size === cakeSize) {
          return {
            ...product,
            quantity:
              newQty > stock
                ? Number.parseInt(stock, 10)
                : Number.parseInt(newQty, 10),
          };
        } else {
          return product;
        }
      });

      secureLocalStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeItem(state, action) {
      const itemToRemove = action.payload;

      state.cartItems = state.cartItems.filter((product) => {
        return (
          product.id !== itemToRemove.cakeId ||
          product.size !== itemToRemove.cakeSize
        );
      });

      secureLocalStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    updateShipping(state, action) {
      state.shipping = {
        cost: action.payload.cost,
        type: action.payload.type,
      };

      secureLocalStorage.setItem('shipping', JSON.stringify(state.shipping));
    },
  },
});

export const { addItem, updateQty, removeItem, updateShipping } =
  cartSlice.actions;
export default cartSlice.reducer;
export const selectCartState = (state) => state.cart.cartItems;
export const selectShipping = (state) => state.cart.shipping;
