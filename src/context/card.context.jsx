import { createContext, useEffect, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const delCartItem = (cartItems, productToDel) => {
  const onlyOneItem = cartItems.find(
    (cartItem) => cartItem.id === productToDel.id && productToDel.quantity === 1
  );

  if (onlyOneItem) {
    return cartItems.filter((cartItem) => cartItem.id !== productToDel.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToDel.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  cardCount: 0,
  total: 0,
  addItemToCart: () => {},
  delItemFromCart: () => {},
  clearItemFromCart: () => {},
});

export const CART_ACTION_TYPES = {
  ADD_ITEM: "ADD_ITEM",
  DEL_ITEM: "DEL_ITEM",
  CLEAR_ITEM: "CLEAR_ITEM",
  TOGGLE_CART: "TOGGLE_CART",
};

const INITIAL_STATE = {
  cartItems: [],
  isCartOpen: false,
  cardCount: 0,
  total: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  const { cartItems, cardCount, total, isCartOpen } = state;

  switch (type) {
    case "ADD_ITEM":
      return {
        ...state,
        cardCount: cardCount + 1,
        total: total + payload.price,
        cartItems: addCartItem(cartItems, payload),
      };
    case "DEL_ITEM":
      return {
        ...state,
        cardCount: cardCount - 1,
        total: total - payload.price,
        cartItems: delCartItem(cartItems, payload),
      };
    case "CLEAR_ITEM":
      return {
        ...state,
        cardCount: 0,
        total: total - payload.quantity * payload.price,
        cartItems: clearCartItem(cartItems, payload),
      };
    case "TOGGLE_CART":
      return {
        ...state,
        isCartOpen: !payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { cartItems, cardCount, total, isCartOpen } = state;

  const addItemToCart = (productToAdd) => {
    dispatch({ type: CART_ACTION_TYPES.ADD_ITEM, payload: productToAdd });
  };

  const delItemFromCart = (productToDel) => {
    dispatch({ type: CART_ACTION_TYPES.DEL_ITEM, payload: productToDel });
  };

  const clearItemFromCart = (productToClear) => {
    dispatch({ type: CART_ACTION_TYPES.CLEAR_ITEM, payload: productToClear });
  };

  const toggleIsCartOpen = () => {
    dispatch({ type: CART_ACTION_TYPES.TOGGLE_CART, payload: isCartOpen });
  };

  const value = {
    isCartOpen,
    toggleIsCartOpen,
    addItemToCart,
    delItemFromCart,
    clearItemFromCart,
    cartItems,
    cardCount,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
