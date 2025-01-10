import React, { Suspense } from "react";
import Loading from "../../components/public/loading/Loading";
import ShoppingCart from "./components/ShoppingCart";

const page = () => {
  return (
    <div className="bg-gray-50">
      <Suspense fallback={<Loading />}>
        <ShoppingCart />
      </Suspense>
    </div>
  );
};

export default page;
