import { Cart } from './schema';

export const minOrderAmount = 50.0;

const cartPrice = (cart: Cart): number => {
  return cart.items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
};

/**
 * Evaluates the cart for discount eligibility.
 */
export const hasDiscount = (cart: Cart): boolean => {
  return cartPrice(cart) >= minOrderAmount;
};
