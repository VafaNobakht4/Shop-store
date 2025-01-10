// Cards.tsx
"use client";
import { Products } from "@/types/product";
import { usePost } from "@/shared/zustand/store";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { HOME } from "@/app/setting/routes";

type Props = {
  post: Products;
};

const Cards: FC<Props> = ({ post }) => {
  const [hovered, setHovered] = useState(false);
  const { push } = useRouter();
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const addToCart = usePost((state) => state.addPostToShoppingCart);
  const removeFromCart = usePost((state) => state.removePostFromShoppingCart);
  const shoppingCartPosts = usePost((state) => state.shoppingCartPosts);
  const savePost = usePost((state) => state.savePost);
  const productQuantity =
    shoppingCartPosts.find((item) => item.id === post.id)?.quantity || 0;

  return (
    <Card
      className={`mt-4 transition-transform duration-300 transform ${
        hovered ? "scale-105 shadow-xl" : "shadow-md"
      } hover:cursor-pointer w-full`}
      title={post.title}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardMedia
        component="img"
        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover"
        image={post.images[0]}
        alt={post.title}
        onClick={() => {
          push(`${HOME}${post.id}`);
          savePost(post);
        }}
      />
      <CardContent className="flex flex-col p-4 sm:p-5">
        <Tooltip title={post.title} arrow>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            className="text-ellipsis overflow-hidden whitespace-nowrap text-lg font-semibold"
          >
            {post.title.length > 25
              ? `${post.title.substring(0, 25)}...`
              : post.title}
          </Typography>
        </Tooltip>
        <Typography
          variant="body2"
          color="text.secondary"
          className="mb-4 text-sm text-gray-700"
        >
          {post.description.length > 60
            ? `${post.description.substring(0, 60)}...`
            : post.description}
        </Typography>
        <div className="h-8 px-3 bg-pink-200 mt-2 flex justify-center items-center rounded-full self-start">
          <Typography
            variant="subtitle2"
            className="text-black text-sm font-medium"
          >
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </Typography>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
          <div className="mb-2 sm:mb-0">
            <Typography variant="subtitle1" className="font-semibold text-lg">
              Price:{" "}
              <span className="text-base text-gray-800">{`${post.price}$`}</span>
            </Typography>
          </div>
          <div className="flex flex-row items-center">
            <IconButton
              aria-label="Remove from cart"
              color="error"
              onClick={() => removeFromCart(post)}
              size="small"
            >
              <RemoveCircle fontSize="small" />
            </IconButton>
            <span className="text-base text-gray-600 mx-1 sm:text-sm">
              {`Qty: ${productQuantity}`}
            </span>
            <IconButton
              aria-label="Add to cart"
              color="primary"
              onClick={() => addToCart(post)}
              size="small"
            >
              <AddCircle fontSize="small" />
            </IconButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cards;
