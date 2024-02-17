"use client";
import { fetchData } from "@/api/useApi";
import { products } from "@/types/product";
import React, { useEffect, useState } from "react";

const page = () => {
  const [posts, setPosts] = useState<products[]>([]);

  useEffect(() => {
    async function initPosts(): Promise<any> {
      setPosts(await fetchData("https://api.escuelajs.co/api/v1/products"));
    }
    initPosts();
  }, []);
  console.log(posts);

  return <div></div>;
};

export default page;
