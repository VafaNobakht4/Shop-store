"use client";
import { fetchData } from "@/api/useApi";
import { products } from "@/types/product";
import React, { useEffect, useState } from "react";
import Cards from "./components/Cards";

const page = () => {
  const [posts, setPosts] = useState<products[]>([]);

  useEffect(() => {
    async function initPosts(): Promise<any> {
      setPosts(await fetchData("https://api.escuelajs.co/api/v1/products"));
    }
    initPosts();
  }, []);
  console.log(posts);

  return (
    <div>
      {posts.map((post) => (
        <Cards post={post} />
      ))}
    </div>
  );
};

export default page;
