import { useReducer } from 'react';

import CartContext from './cartContext';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, { type, item, id }) => {
  if (type === 'ADD_CART_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (curItem) => curItem.id === item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount + item.price * item.amount;

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (type === 'REMOVE_CART_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (curItem) => curItem.id === id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((curItem) => curItem.id !== id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) =>
    dispatchCartAction({ type: 'ADD_CART_ITEM', item: item });

  const removeItemFromCartHandler = (id) =>
    dispatchCartAction({ type: 'REMOVE_CART_ITEM', id: id });

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
