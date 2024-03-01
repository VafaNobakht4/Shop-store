import { Input } from "@mui/material";
import React, { FC } from "react";

type Props = {
  setSearch: (value: string) => void;
};

const Search: FC<Props> = ({ setSearch }) => {
  return (
    <div>
      <Input
        placeholder="Search"
        className="w-72"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
