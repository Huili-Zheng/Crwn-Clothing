import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import {
  createAction,
  ActionWithPayLoad,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
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

const delCartItem = (
  cartItems: CartItem[],
  productToDel: CartItem
): CartItem[] => {
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

const clearCartItem = (
  cartItems: CartItem[],
  productToClear: CartItem
): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
};

export type SetCartItems = ActionWithPayLoad<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export type SetIsCartOpen = ActionWithPayLoad<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const setIsCartOpen = withMatcher(
  (bool: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): SetCartItems => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const delItemFromCart = (
  cartItems: CartItem[],
  productToDel: CartItem
): SetCartItems => {
  const newCartItems = delCartItem(cartItems, productToDel);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  productToClear: CartItem
): SetCartItems => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  return setCartItems(newCartItems);
};
