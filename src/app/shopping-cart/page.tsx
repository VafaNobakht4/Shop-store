import dynamic from "next/dynamic";
import React from "react";
import Loading from "../../components/public/loading/Loading";

const ShoppingCart = dynamic(
  () => import("@/app/shopping-cart/components/ShoppingCart"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const page = () => {
  return (
    <div className="bg-gray-50">
      <ShoppingCart />{" "}
    </div>
  );
};

export default page;
