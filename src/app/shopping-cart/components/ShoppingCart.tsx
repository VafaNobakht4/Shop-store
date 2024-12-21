"use client";
import NavMenu from "@/components/header/NavMenu";
import { calculateTotalNumberItems } from "@/utils/calculateToalNumberItems";
import { usePost } from "@/zustand/store";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

const ShoppingCart = () => {
  const shoppingCartPosts = usePost((state) => state.shoppingCartPosts);
  const itemsNumebr = calculateTotalNumberItems(shoppingCartPosts);
  const addToCart = usePost((state) => state.addPostToShoppingCart);
  const removeFromCart = usePost((state) => state.removePostFromShoppingCart);
  return (
    <>
      <NavMenu isShowLogo />
      <div className="flex justify-center items-center h-screen overflow-y-auto">
        <div className="w-3/5 min-h-full sm:min-h-2/3 bg-white rounded-lg">
          <div className="p-14 flex flex-row justify-between">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h1 className="mt-0.5 text-lg">{`items: ${itemsNumebr}`}</h1>
          </div>
          <hr />
          {shoppingCartPosts.length > 0 ? (
            shoppingCartPosts.map((post) => (
              <>
                <div className="w-full h-auto sm:h-48">
                  <div className="flex flex-col m-auto sm:m-0 sm:flex-row justify-between">
                    <div>
                      <h1 className="ml-14 mt-6 text-lg font-bold">
                        {post.title}
                      </h1>
                      <div className="mt-6 ml-14">
                        <span className="font-normal text-lg">Price:</span>
                        <span className="text-base opacity-60">{` ${post.price}$`}</span>
                      </div>
                      <div className="flex flex-row ml-11 mt-4">
                        <IconButton
                          aria-label="Remove from cart"
                          color="error"
                          disabled={post.quantity === 0}
                          onClick={() => removeFromCart(post)}
                        >
                          <RemoveCircle />
                        </IconButton>
                        <span className="text-base opacity-60 mx-1 mt-2">
                          Quantity: {post.quantity}
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
                    <div>
                      <img
                        src={post?.images?.[0]}
                        alt={post.title}
                        className="p-4 w-52 object-cover h-44"
                      />
                    </div>
                  </div>
                </div>
                <hr />
              </>
            ))
          ) : (
            <div className="flex flex-row items-center justify-center pt-6 mt-4">
              Shopping cart is empty
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
