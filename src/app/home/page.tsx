"use client";
import { fetchData } from "@/api/useApi";
import { Products } from "@/types/product";
import React, { useEffect, useState } from "react";
import Cards from "./components/Cards";

const page = () => {
  const [posts, setPosts] = useState<Products[]>([]);

  useEffect(() => {
    async function initPosts(): Promise<any> {
      setPosts(await fetchData("https://fakestoreapi.com/products"));
    }
    initPosts();
  }, []);
  console.log(posts);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-x-10">
      {posts.map((post) => (
        <Cards post={post} />
      ))}
    </div>
  );
};

export default page;
