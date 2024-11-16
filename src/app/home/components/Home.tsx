"use client";
import { fetchData } from "@/api/useApi";
import { Products } from "@/types/product";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import SearchBox from "./Search";
import { PRODUCTS_API } from "@/api/routes";
import NoProductsFound from "@/components/NoProductFound";
import Loading from "./Loading";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { useRouter } from "next/navigation";
import { HOME } from "@/app/setting/routes";

const Home = () => {
  const [posts, setPosts] = useState<Products[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
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
      <div className="grid grid-cols-3">
        <Image
          src={logo}
          alt="logo"
          className="w-20 h-20 rounded-full ml-8 mt-4 hover:cursor-pointer"
          onClick={() => push(HOME)}
        />
        <SearchBox setSearch={setSearch} search={search} />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {filteredPosts.length === 0 ? (
            <NoProductsFound setSearch={setSearch} />
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
