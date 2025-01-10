import { Products } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PostState {
  post?: Products;
  shoppingCartPosts: Products[];
  savePost: (newPost: Products) => void;
  addPostToShoppingCart: (newPost: Products) => void;
  removePostFromShoppingCart: (product: Products) => void;
}

const localStorageAdapter = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const usePost = create<PostState>()(
  persist(
    (set, get) => ({
      post: undefined,
      shoppingCartPosts: [],
      savePost: (newPost: Products) => set({ post: newPost }),
      addPostToShoppingCart: (newPost: Products) => {
        const currentCart = get().shoppingCartPosts;
        const existingProduct = currentCart.find(
          (item) => item.id === newPost.id
        );
        if (existingProduct) {
          set({
            shoppingCartPosts: currentCart.map((item) =>
              item.id === newPost.id
                ? { ...item, quantity: (item.quantity || 0) + 1 }
                : item
            ),
          });
        } else {
          set({
            shoppingCartPosts: [...currentCart, { ...newPost, quantity: 1 }],
          });
        }
      },
      removePostFromShoppingCart: (product: Products) => {
        const currentCart = get().shoppingCartPosts;
        const existingProduct = currentCart.find(
          (item) => item.id === product.id
        );

        if (existingProduct && existingProduct.quantity > 1) {
          set({
            shoppingCartPosts: currentCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          });
        } else {
          set({
            shoppingCartPosts: currentCart.filter(
              (item) => item.id !== product.id
            ),
          });
        }
      },
    }),
    {
      name: "storage",
      storage: localStorageAdapter,
    }
  )
);
