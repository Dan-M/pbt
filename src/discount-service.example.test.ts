import { hasDiscount } from './discount-service';
import { Cart } from './schema';

describe('Discount Service', () => {
  it('gets discount for cart with products worth more than 50', () => {
    const sampleData: Cart = {
      items: [
        {
          name: 'item1',
          description: 'item1',
          price: 10,
          quantity: 1,
        },
        {
          name: 'item2',
          description: 'item2',
          price: 20,
          quantity: 1,
        },
        {
          name: 'item3',
          description: 'item3',
          price: 20.1,
          quantity: 1,
        },
      ],
      user: {
        name: 'user1',
        age: 20,
        email: 'test@example.ch',
      },
    };
    expect(hasDiscount(sampleData)).toBe(true);
  });
  it('does not get discount for cart with products worth less than 50', () => {
    const sampleData: Cart = {
      items: [
        {
          name: 'item1',
          description: 'item1',
          price: 1,
          quantity: 10,
        },
        {
          name: 'item2',
          description: 'item2',
          price: 2,
          quantity: 10,
        },
        {
          name: 'item3',
          description: 'item3',
          price: 19.9,
          quantity: 1,
        },
      ],
      user: {
        name: 'user1',
        age: 2,
        email: 'test@example.ch',
      },
    };
    expect(hasDiscount(sampleData)).toBe(false);
  });
});
