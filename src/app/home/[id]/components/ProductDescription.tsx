"use client";
import { usePost } from "@/zustand/store";
import React, { FC } from "react";

type Props = {
  id: string;
};

const ProductDescription: FC<Props> = ({ id }) => {
  const post = usePost((state: any) => state.post);
  console.log(post);

  return <div>ProductDescription</div>;
};

export default ProductDescription;
