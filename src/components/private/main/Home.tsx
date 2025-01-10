// Home.tsx
"use client";
import { fetchData } from "@/api/useApi";
import { Products } from "@/types/product";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { PRODUCTS_API } from "@/api/routes";
import NoProductsFound from "@/components/public/not-found-product/NoProductFound";
import Loading from "../../public/loading/Loading";
import NavMenu from "@/components/private/header/NavMenu";
import Pagination from "../../public/pagination/Pagination";
import usePagination from "@/shared/hooks/usePagination";

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
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentItems.map((post) => (
              <Cards key={post.id} post={post} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          </div>
        </div>
      </section>
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
