import { Products } from "@/types/product";
import { create } from "zustand";
interface PostState {
  post?: Products;
  savePost: (newPost: Products) => void;
}
export const usePost = create<PostState>((set) => ({
  savePost: (newPost: Products) => set({ post: newPost }),
}));
