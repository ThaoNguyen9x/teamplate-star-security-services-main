import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Pagination = ({ count, item_per_page }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = parseInt(searchParams.get("page")) || 1;

  const totalPages = Math.ceil(count / item_per_page);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const handleChangePage = (newPage) => {
    searchParams.set("page", newPage);
    navigate({ search: searchParams.toString() });
  };

  if (totalPages <= 1) return null;

  return (
    <ul className="inline-flex -space-x-px text-sm">
      <li>
        <button
          onClick={() => handleChangePage(page - 1)}
          disabled={!hasPrev}
          className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${
            !hasPrev && "cursor-not-allowed"
          }`}
        >
          Previous
        </button>
      </li>
      {[...Array(totalPages)].map((_, index) => (
        <li key={index}>
          <button
            onClick={() => handleChangePage(index + 1)}
            className={`flex items-center justify-center px-4 h-10 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
              page === index + 1 &&
              "border text-white border-gray-300 !bg-blue-950 hover:bg-blue-100 hover:text-blue-700"
            }`}
          >
            {index + 1}
          </button>
        </li>
      ))}
      <li>
        <button
          onClick={() => handleChangePage(page + 1)}
          disabled={!hasNext}
          className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${
            !hasNext && "cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
