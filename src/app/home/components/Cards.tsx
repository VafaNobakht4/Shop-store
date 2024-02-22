import { Products } from "@/types/product";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
type Props = {
  post: Products;
};

const Cards: FC<Props> = ({ post }) => {
  return (
    <div>
      <Card className="w-96 h-96 shadow-lg mt-4" title="vafa">
        <CardMedia
          className="object-cover h-36"
          image={post.image}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.description}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
};

export default Cards;
