import * as z from 'zod';
import * as fc from 'fast-check';
import { ZodFastCheck } from 'zod-fast-check';
import { Cart, cartSchema } from './schema';
import { hasDiscount, minOrderAmount } from './discount-service';

// Create an arbitrary which generates valid inputs for the schema
const cartArbitrary = ZodFastCheck().inputOf(cartSchema);

const oneItemProvidesDiscount = (cart: Cart): boolean => {
  return cart.items.filter((item) => item.price > minOrderAmount).length > 0;
};

const emptyCardDoesNotProvideDiscount = (cart: Cart): boolean => {
  return cart.items.length === 0;
};

describe('Discount service properties', () => {
  test('An empty cart does ont get discount', () =>
    fc.assert(
      fc.property(cartArbitrary, (cart) => {
        const provideDiscount = hasDiscount(cart);
        expect(emptyCardDoesNotProvideDiscount(cart)).toEqual(!provideDiscount);
      }),
    ));

  test('Cart with one item price > minOrderAmount gets discount', () =>
    fc.assert(
      fc.property(cartArbitrary, (cart) => {
        console.log(`Cart to be tested: ${JSON.stringify(cart)}`);
        const provideDiscount = hasDiscount(cart);
        expect(oneItemProvidesDiscount(cart)).toEqual(provideDiscount);
      }),
    ));
});
