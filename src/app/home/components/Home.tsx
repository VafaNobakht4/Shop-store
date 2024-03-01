"use client";
import { fetchData } from "@/api/useApi";
import { Products } from "@/types/product";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Loading from "./Loading";
import Search from "./Search";

const Home = () => {
  const [posts, setPosts] = useState<Products[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function initPosts(): Promise<any> {
      setPosts(await fetchData("https://fakestoreapi.com/products"));
    }
    initPosts();
  }, []);

  return (
    <>
      <Search setSearch={setSearch} />
      {posts.length ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-x-10">
          {posts.map((post) => {
            if (post.title.includes(search)) return <Cards post={post} />;
          })}
        </div>
      ) : (
        <div className="m-auto justify-center flex flex-row items-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default Home;
