import React from "react";
import ProductDescription from "./components/ProductDescription";

const page = ({ params }: { params: { id: string } }) => {
  return <ProductDescription id={params.id} />;
};

export default page;
