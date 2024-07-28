import React from "react";

const SearchBar = ({ placeholder }) => {
  return (
    <div className="flex items-center gap-2 bg-blue-950 p-2 rounded-md">
      <i className="bi bi-search text-xl text-white"></i>
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent outline-none text-white"
      />
    </div>
  );
};

export default SearchBar;
