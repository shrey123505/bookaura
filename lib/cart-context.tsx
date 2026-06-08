"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product, products } from "@/lib/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isLoaded: boolean;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const storageKey = "bookaura-cart";

type StoredCartItem = {
  id: string;
  quantity: number;
};

function persistItems(items: CartItem[]) {
  const storedItems = items.map((item) => ({
    id: item.product.id,
    quantity: item.quantity
  }));
  window.localStorage.setItem(storageKey, JSON.stringify(storedItems));
}

function normalizeQuantity(quantity: number) {
  return Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const rawCart = window.localStorage.getItem(storageKey);
      if (!rawCart) {
        setIsLoaded(true);
        return;
      }

      const storedItems = JSON.parse(rawCart) as StoredCartItem[];
      const hydratedItems = storedItems
        .map((item) => {
          const product = products.find((entry) => entry.id === item.id);
          return product ? { product, quantity: normalizeQuantity(item.quantity) } : null;
        })
        .filter(Boolean) as CartItem[];
      setItems(hydratedItems);
    } catch {
      window.localStorage.removeItem(storageKey);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (product: Product) => {
      setItems((currentItems) => {
        const existingItem = currentItems.find((item) => item.product.id === product.id);
        let nextItems: CartItem[];
        if (existingItem) {
          nextItems = currentItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          nextItems = [...currentItems, { product, quantity: 1 }];
        }
        persistItems(nextItems);
        return nextItems;
      });
    };

    const removeItem = (productId: string) => {
      setItems((currentItems) => {
        const nextItems = currentItems.filter((item) => item.product.id !== productId);
        persistItems(nextItems);
        return nextItems;
      });
    };

    const updateQuantity = (productId: string, quantity: number) => {
      setItems((currentItems) => {
        const nextItems = currentItems
          .map((item) =>
            item.product.id === productId
              ? { ...item, quantity: normalizeQuantity(quantity) }
              : item
          )
          .filter((item) => item.quantity > 0);
        persistItems(nextItems);
        return nextItems;
      });
    };

    const clearCart = () => {
      persistItems([]);
      setItems([]);
    };
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );

    return {
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isLoaded,
      totalItems,
      totalPrice
    };
  }, [isLoaded, items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
