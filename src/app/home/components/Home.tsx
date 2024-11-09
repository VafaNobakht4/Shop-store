"use client";
import { fetchData } from "@/api/useApi";
import { Products } from "@/types/product";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Search from "./Search";
import { PRODUCTS_API } from "@/api/routes";

const Home = () => {
  const [posts, setPosts] = useState<Products[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function initPosts(): Promise<any> {
      setPosts(await fetchData(PRODUCTS_API));
    }
    initPosts();
  }, []);

  return (
    <>
      <Search setSearch={setSearch} />
      {/* {posts.length ? ( */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-10 gap-x-20">
        {posts.map((post) => {
          if (post.title.includes(search))
            return (
              <div className="col-span-1">
                <Cards post={post} />
              </div>
            );
        })}
      </div>
      {/* ) : (
        <div className="m-auto justify-center flex flex-row items-center">
          <Loading />
        </div>
      )} */}
    </>
  );
};

export default Home;
