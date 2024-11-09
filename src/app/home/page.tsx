import React from "react";
import dynamic from "next/dynamic";

const Home = dynamic(() => import("@/app/home/components/Home"), {
  ssr: false,
});

const page = () => {
  return <Home />;
};

export default page;
