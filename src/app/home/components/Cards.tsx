import { Products } from "@/types/product";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
} from "@mui/material";
import React, { FC, useState } from "react";

type Props = {
  post: Products;
};

const Cards: FC<Props> = ({ post }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <Card
      className={`mt-4 transition-transform duration-300 transform ${
        hovered ? "scale-105 shadow-xl" : "shadow-lg"
      } hover:cursor-pointer`}
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
            className="text-ellipsis overflow-hidden whitespace-nowrap transition-opacity duration-500"
          >
            {post.title.length > 25
              ? `${post.title.substring(0, 25)}...`
              : post.title}
          </Typography>
        </Tooltip>
        <Typography
          variant="body2"
          color="text.secondary"
          className="flex gap-x-3"
        >
          <span className="font-semibold text-lg">Price:</span>
          <span className="text-base opacity-50">{`${post.price}$`}</span>
        </Typography>
      </CardContent>
      <CardActions>{/* Actions can be added here if needed */}</CardActions>
    </Card>
  );
};

export default Cards;
