"use client";
import { fetchData } from "@/api/useApi";
import { Products } from "@/types/product";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import SearchBox from "./Search";
import { PRODUCTS_API } from "@/api/routes";
import NoProductsFound from "@/components/NoProductFound";
import Loading from "./Loading";

const Home = () => {
  const [posts, setPosts] = useState<Products[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initPosts(): Promise<any> {
      setLoading(true);
      const res = await fetchData(PRODUCTS_API);
      setPosts(res.products);
      setLoading(false);
    }
    initPosts();
  }, []);

  const filteredPosts = posts?.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SearchBox setSearch={setSearch} />
      {loading ? (
        <Loading />
      ) : (
        <>
          {filteredPosts.length === 0 ? (
            <NoProductsFound />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-10 gap-x-20 gap-y-4 mb-10">
              {filteredPosts.map((post) => (
                <div key={post.id} className="col-span-1">
                  <Cards post={post} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
