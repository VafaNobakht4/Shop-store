"use client";

import { HOME } from "@/app/setting/routes";
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
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";

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

  // Find the quantity of this product in the shopping cart
  const productQuantity =
    shoppingCartPosts.find((item) => item.id === post.id)?.quantity || 0;
  console.log(shoppingCartPosts);

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
        <Typography
          variant="body2"
          color="text.secondary"
          className="flex gap-x-3 items-center"
        >
          <span className="font-semibold text-lg">Price:</span>
          <span className="text-base opacity-50">{`${post.price}$`}</span>
          {/* Display the quantity */}
          <span className="text-base opacity-50 ml-4">
            Quantity: {productQuantity}
          </span>
        </Typography>

        {/* Add and Remove Buttons */}
        <div className="flex justify-between items-center mt-4">
          <IconButton
            aria-label="Add to cart"
            color="primary"
            onClick={() => addToCart(post)}
          >
            <AddCircle />
          </IconButton>
          <IconButton
            aria-label="Remove from cart"
            color="secondary"
            onClick={() => removeFromCart(post)}
          >
            <RemoveCircle />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cards;
