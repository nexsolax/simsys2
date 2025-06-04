import { Products } from '../shared/models/product';
import { StoreSet } from '../store';

export interface CartItem {
  product: Products;
  quantity: number;
  price: number;
}

export interface CartState {
  cart: CartItem[];
}

export interface CartActions {
  addToCart: (product: Products, quantity?: number, price?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const initialCart: CartState = {
  cart: [],
};

export const cartActions = (set: StoreSet): CartActions => ({
  addToCart: (product, quantity = 1, price = 0) => {
    set((state) => {
      const existing = state.cart.cart.find((item) => item.product.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.cart.cart.push({ product, quantity, price });
      }
    });
  },
  removeFromCart: (productId) => {
    set((state) => {
      state.cart.cart = state.cart.cart.filter((item) => item.product.id !== productId);
    });
  },
  updateCartQuantity: (productId, quantity) => {
    set((state) => {
      const item = state.cart.cart.find((item) => item.product.id === productId);
      if (item) item.quantity = quantity;
    });
  },
  clearCart: () => {
    set((state) => {
      state.cart.cart = [];
    });
  },
});
