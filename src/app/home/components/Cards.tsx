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
      <Card className="shadow-lg mt-4" title="vafa">
        <CardMedia
          className="h-48 sm:h-64 md:h-80 lg:h-96"
          image={post.images[0]}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${post.title.substring(0, 25)}...`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <div className="gap-x-3">
              <span className="font-semibold text-lg">Price:</span>
              <span className="text-base opacity-50"> {`${post.price}$`}</span>
            </div>
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
};

export default Cards;
