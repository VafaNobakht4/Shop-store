import { products } from "@/types/product";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
type Props = {
  post: products;
};

const Cards: FC<Props> = ({ post }) => {
  console.log(post);

  return (
    <div>
      <Card className="w-96 h-96 shadow-lg mt-4" title="vafa">
        <CardMedia
          className="object-cover h-60"
          image={post.image}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
};

export default Cards;
