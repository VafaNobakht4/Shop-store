"use client";
import { Products } from "@/types/product";
import { usePost } from "@/zustand/store";
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
      className={`mt-4 transition-all duration-500 transform ${
        hovered ? "scale-105 shadow-2xl" : "shadow-lg"
      } hover:cursor-pointer hover:scale-105 hover:shadow-2xl`}
      title={post.title}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardMedia
        component="img"
        className="h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
        image={post.images[0]}
        alt={post.title}
        onClick={() => {
          push(`${HOME}${post.id}`);
          savePost(post);
        }}
      />
      <CardContent>
        <Tooltip title={post.title} arrow>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="text-ellipsis overflow-hidden whitespace-nowrap transition-opacity duration-500 ease-in-out"
          >
            {post.title.length > 25
              ? `${post.title.substring(0, 25)}...`
              : post.title}
          </Typography>
        </Tooltip>
        <div className="flex flex-row justify-between">
          <div className="mt-1.5">
            <span className="font-semibold text-lg">Price:</span>
            <span className="text-base opacity-1">{`${post.price}$`}</span>
          </div>
          <div className="flex flex-row">
            <IconButton
              aria-label="Remove from cart"
              color="error"
              onClick={() => removeFromCart(post)}
            >
              <RemoveCircle />
            </IconButton>
            <span className="text-base opacity-50 mx-1 mt-2">
              Quantity: {productQuantity}
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
      </CardContent>
    </Card>
  );
};

export default Cards;
