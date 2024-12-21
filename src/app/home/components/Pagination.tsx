"use client";
import { Button } from "@mui/material";
import React, { FC } from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
};

const Pagination: FC<Props> = ({ currentPage, totalPages, paginate }) => {
  return (
    <div className="flex justify-center mt-8 mb-8">
      <Button
        className="px-5 py-2 mx-2 !bg-gray-400 !text-gray-900 !rounded-md disabled:!bg-gray-200"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span className="flex items-center justify-center px-4 py-2 mx-2">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        className="px-5 py-2 mx-2 !bg-gray-400 !text-gray-900 !rounded-md disabled:!bg-gray-200"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
