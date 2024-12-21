"use client";
import { fetchData } from "@/api/useApi";
import { Products } from "@/types/product";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { PRODUCTS_API } from "@/api/routes";
import NoProductsFound from "@/components/NoProductFound";
import Loading from "./Loading";
import NavMenu from "@/components/header/NavMenu";
import usePagination from "../hooks/usePagination";
import Pagination from "./Pagination";

const Home = () => {
  const [posts, setPosts] = useState<Products[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initPosts = async () => {
      setLoading(true);
      try {
        const res = await fetchData(PRODUCTS_API);
        setPosts(res.products);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    initPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  // Use pagination hook
  const { currentPage, totalPages, currentItems, paginate } = usePagination(
    filteredPosts,
    9
  );

  const renderContent = () => {
    if (loading) return <Loading />;
    if (filteredPosts.length === 0)
      return <NoProductsFound setSearch={setSearch} />;

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-10 gap-x-20 gap-y-4 mb-10">
          {currentItems.map((post) => (
            <div key={post.id} className="col-span-1">
              <Cards post={post} />
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      </>
    );
  };

  return (
    <>
      <NavMenu search={search} setSearch={setSearch} isShowLogo={false} />
      {renderContent()}
    </>
  );
};

export default Home;
