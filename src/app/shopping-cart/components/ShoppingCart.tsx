// ShoppingCart.tsx
"use client";
import React from "react";
import NavMenu from "@/components/private/header/NavMenu";
import { calculateTotalNumberItems } from "@/shared/utils/calculateToalNumberItems";
import { usePost } from "@/shared/zustand/store";
import {
  AddCircle,
  RemoveCircle,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { HOME } from "@/app/setting/routes";

const ShoppingCart = () => {
  const shoppingCartPosts = usePost((state) => state.shoppingCartPosts);
  const itemsNumber = calculateTotalNumberItems(shoppingCartPosts);
  const addToCart = usePost((state) => state.addPostToShoppingCart);
  const removeFromCart = usePost((state) => state.removePostFromShoppingCart);
  const savePost = usePost((state) => state.savePost);

  return (
    <>
      <NavMenu isShowLogo />
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold flex items-center">
              <ShoppingCartIcon className="mr-2" />
              Shopping Cart
            </h1>
            <h2 className="mt-4 sm:mt-0 text-xl font-medium text-gray-700">
              {`Items: ${itemsNumber}`}
            </h2>
          </div>
          <hr className="mb-6" />
          {shoppingCartPosts.length > 0 ? (
            <div className="space-y-6">
              {shoppingCartPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="sm:w-1/3 px-20 py-3 mx-auto">
                    <img
                      src={post.images[0]}
                      alt={post.title}
                      className="w-44 sm:h-56 object-cover"
                      onClick={() => {
                        savePost(post);
                        // Assuming push navigates to product details
                        window.location.href = `${HOME}${post.id}`;
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className="sm:w-2/3 p-4 sm:p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {post.description.length > 100
                          ? `${post.description.substring(0, 100)}...`
                          : post.description}
                      </p>
                      <div className="inline-block bg-pink-200 text-pink-800 text-sm px-3 py-1 rounded-full">
                        {post.category.charAt(0).toUpperCase() +
                          post.category.slice(1)}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                      <div className="mb-4 sm:mb-0">
                        <span className="text-lg font-semibold text-gray-800">
                          Price:{" "}
                        </span>
                        <span className="text-lg text-gray-700">{`${post.price}$`}</span>
                      </div>
                      <div className="flex items-center">
                        <IconButton
                          aria-label="Remove from cart"
                          color="error"
                          disabled={post.quantity === 0}
                          onClick={() => removeFromCart(post)}
                        >
                          <RemoveCircle />
                        </IconButton>
                        <span className="mx-2 text-lg text-gray-700">
                          {post.quantity}
                        </span>
                        <IconButton
                          aria-label="Add to cart"
                          color="primary"
                          onClick={() => addToCart(post)}
                        >
                          <AddCircle />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-md">
              <ShoppingCartIcon className="text-6xl text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Your Shopping Cart is Empty
              </h2>
              <p className="text-gray-500">
                Looks like you haven't added anything to your cart yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ShoppingCart;
