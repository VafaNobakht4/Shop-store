import { products } from "@/types/product";
import React, { FC } from "react";
type Props = {
  post: products;
};

const Cards: FC<Props> = ({ post }) => {
  return <div className="grid"></div>;
};

export default Cards;
