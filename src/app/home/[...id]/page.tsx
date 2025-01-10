import Loading from "@/components/public/loading/Loading";
import React, { Suspense } from "react";
import ProductDetail from "../../../components/private/product-detail/ProductDetail";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProductDetail />
    </Suspense>
  );
};

export default page;
