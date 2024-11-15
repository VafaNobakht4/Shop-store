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
    <div className="flex flex-row justify-evenly items-center min-h-screen">
      {imageUrl ? (
        <div className="border-black border-solid flex flex-row items-center">
          <img
            src={imageUrl}
            alt="Product image"
            className="w-[400px] h-auto"
          />
          <div className="flex flex-col gap-y-4 justify-end">
            <span className="w-[1000px] items-center text-lg">
              {post.description}
            </span>
            <span className="font-semibold text-xl">{`${post.price} $`}</span>
          </div>
        </div>
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
};

export default ProductDescription;
