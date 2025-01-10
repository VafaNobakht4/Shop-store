"use client";
import { HOME, SHOPPING_CART } from "@/app/setting/routes";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import { usePost } from "@/shared/zustand/store";
import { calculateTotalNumberItems } from "@/shared/utils/calculateToalNumberItems";
import SearchBox from "@/components/public/search/Search";

type Props = {
  search?: string;
  setSearch?: (search: string) => void;
  isShowLogo: boolean;
};

const NavMenu: FC<Props> = ({ search, setSearch, isShowLogo }) => {
  const shoppingCartPosts = usePost((state) => state.shoppingCartPosts);
  const itemsNumber = calculateTotalNumberItems(shoppingCartPosts);

  const { push } = useRouter();

  return (
    <>
      <header className="grid grid-cols-3 items-center px-4">
        <Image
          src={logo}
          alt="logo"
          className={`!w-20 !h-20 rounded-full hover:cursor-pointer ml-6 ${
            isShowLogo ? "mt-3.5" : ""
          }`}
          onClick={() => push(HOME)}
        />
        {!isShowLogo && (
          <>
            <SearchBox setSearch={setSearch!} search={search!} />
            <div className="flex justify-end relative mr-7">
              <ShoppingCartIcon
                className="hover:cursor-pointer !text-4xl mt-2"
                onClick={() => push(SHOPPING_CART)}
              />
              {itemsNumber > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-semibold">
                  {itemsNumber}
                </span>
              )}
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default NavMenu;
