import { Products } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the interface for the PostState
interface PostState {
  post?: Products; // Single product
  shoppingCartPosts: Products[]; // Array of products with quantities
  savePost: (newPost: Products) => void; // Save a single post
  addPostToShoppingCart: (newPost: Products) => void; // Add or increment product quantity
  removePostFromShoppingCart: (product: Products) => void; // Decrement or remove product quantity
}

// Wrap the `localStorage` with an adapter to match Zustand's expected storage type
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
      post: undefined, // Initialize post as undefined
      shoppingCartPosts: [], // Initialize shoppingCartPosts as an empty array
      savePost: (newPost: Products) => set({ post: newPost }), // Save single post
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
            shoppingCartPosts: [
              ...currentCart,
              { ...newPost, quantity: 1 }, // Add with initial quantity
            ],
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
      name: "post-storage", // Name of the storage key
      storage: localStorageAdapter, // Use the custom localStorage adapter
    }
  )
);
