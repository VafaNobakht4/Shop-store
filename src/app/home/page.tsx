import React, { Suspense } from "react";
import Loading from "../../components/public/loading/Loading";
import Home from "@/components/private/main/Home";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  );
};

export default page;
