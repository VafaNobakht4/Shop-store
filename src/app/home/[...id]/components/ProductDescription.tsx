"use client";
import { usePost } from "@/zustand/store";
import React, { FC } from "react";

type Props = {
  id: string;
};

const ProductDescription: FC<Props> = ({ id }) => {
  const post = usePost((state) => state.post);
  const imageUrl = post?.images?.[0];
  return (
    <div className="flex flex-col lg:flex-row justify-evenly items-center min-h-screen">
      {imageUrl ? (
        <div className="border-black border-solid flex flex-col sm:flex-row items-center">
          <img
            src={imageUrl}
            alt="Product image"
            className="w-[900px] h-[900px]"
          />
          <div className="flex flex-col mx-10">
            <span className="text-3xl font-bold mb-8">{post.title}</span>
            <span className="max-w-[1000px] items-center text-lg">
              {post.description}
            </span>
            <div className="h-12 w-48 bg-pink-200 mt-6 flex justify-center items-center">
              <span className="!text-black text-2xl font-medium">
                {post.category.slice(0, 1).toUpperCase() +
                  post.category.slice(1, post.category.length)}
              </span>
            </div>

            <span className="font-semibold text-xl my-6">{`${post.price} $`}</span>
          </div>
        </div>
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
};

export default ProductDescription;
