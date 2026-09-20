'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { siteConfig } from '@/lib/config';
import type { CartItem } from '@/lib/types';

const STORAGE_KEY = 'sagar-sportz:cart:v1';

type Action =
  | { type: 'hydrate'; items: CartItem[] }
  | { type: 'add'; item: CartItem }
  | { type: 'remove'; key: string }
  | { type: 'qty'; key: string; quantity: number }
  | { type: 'clear' };

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'hydrate':
      return action.items;
    case 'add': {
      // Identical line items merge; a different size, colour or customisation
      // produces a new line because the key encodes all of it.
      const existing = state.find((i) => i.key === action.item.key);
      if (existing) {
        return state.map((i) =>
          i.key === action.item.key
            ? { ...i, quantity: i.quantity + action.item.quantity }
            : i,
        );
      }
      return [...state, action.item];
    }
    case 'remove':
      return state.filter((i) => i.key !== action.key);
    case 'qty':
      return state.map((i) =>
        i.key === action.key
          ? { ...i, quantity: Math.max(1, Math.min(999, action.quantity)) }
          : i,
      );
    case 'clear':
      return [];
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  ready: boolean;
  drawerOpen: boolean;
  lastAdded: string | null;
  addItem: (item: Omit<CartItem, 'key'> & { key?: string }) => void;
  removeItem: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/** Stable key for a line item: same product + variant + customisation = same line. */
export function makeCartKey(item: Omit<CartItem, 'key'>) {
  const c = item.customisation;
  const custom = c
    ? [
        c.sport,
        c.jerseyType,
        c.pattern,
        c.primaryColor,
        c.secondaryColor,
        c.teamName,
        c.playerName,
        c.playerNumber,
        c.logoFileName,
        c.sponsorFileName,
        c.notes,
      ]
        .map((v) => v ?? '')
        .join('|')
    : '';
  return [item.productId, item.size ?? '', item.color ?? '', custom].join('::');
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  // Restore on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'hydrate', items: JSON.parse(raw) });
    } catch {
      /* corrupted or unavailable storage — start with an empty cart */
    }
    setReady(true);
  }, []);

  // Persist on change (only after hydration, so we never wipe a stored cart).
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full or blocked — the cart still works for this session */
    }
  }, [items, ready]);

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const addItem = useCallback(
    (item: Omit<CartItem, 'key'> & { key?: string }) => {
      const key = item.key ?? makeCartKey(item);
      dispatch({ type: 'add', item: { ...item, key } as CartItem });
      setLastAdded(key);
      setDrawerOpen(true);
    },
    [],
  );

  const removeItem = useCallback(
    (key: string) => dispatch({ type: 'remove', key }),
    [],
  );
  const setQuantity = useCallback(
    (key: string, quantity: number) => dispatch({ type: 'qty', key, quantity }),
    [],
  );
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
    const shipping =
      subtotal === 0 || subtotal >= siteConfig.freeShippingOver
        ? 0
        : siteConfig.flatShipping;
    return {
      items,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      ready,
      drawerOpen,
      lastAdded,
      addItem,
      removeItem,
      setQuantity,
      clear,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    };
  }, [items, ready, drawerOpen, lastAdded, addItem, removeItem, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
