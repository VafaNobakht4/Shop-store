"use client";
import { usePost } from "@/zustand/store";
import React, { FC, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { HOME } from "@/app/setting/routes";

const ProductDescription: FC = () => {
  const post = usePost((state) => state.post);
  const { push } = useRouter();
  const imageUrl = post?.images?.[0];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <ArrowBackIcon
        className="text-black text-4xl mr-2 cursor-pointer !ml-10 mt-4"
        onClick={() => push(HOME)}
      />
      <div className="flex flex-col md:flex-row justify-evenly items-center h-screen overflow-scroll">
        {imageUrl ? (
          <div className=" flex flex-col lg:flex-row items-center p-4 md:p-6 lg:p-8">
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full lg:w-1/2 h-auto object-fit mb-4 lg:mb-0 lg:mr-8"
            />
            <div className="flex flex-col w-full lg:w-1/2">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                {post.title}
              </h2>
              <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
                {post.description}
              </p>
              <div className="h-12 w-32 sm:w-48 bg-pink-200 mt-4 sm:mt-6 flex justify-center items-center rounded">
                <span className="text-black text-xl sm:text-2xl font-medium">
                  {post.category.charAt(0).toUpperCase() +
                    post.category.slice(1)}
                </span>
              </div>
              <span className="font-semibold text-lg sm:text-xl mt-4 mb-10 sm:mt-6">
                {`${post.price} $`}
              </span>
            </div>
          </div>
        ) : (
          <p>No image available</p>
        )}
      </div>
    </>
  );
};

export default ProductDescription;
