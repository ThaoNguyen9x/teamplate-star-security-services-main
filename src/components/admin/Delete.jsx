import React from "react";

const Delete = ({ id, handleDelete, setRemove }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 rounded-lg shadow-lg">
        <div className="flex flex-col items-center gap-3">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
            <i className="bi bi-exclamation-triangle-fill text-red-700 text-xl"></i>
          </div>
          <h2 className="text-lg font-semibold mb-3">Confirm Delete</h2>
        </div>
        <p className="mb-4">Are you sure you want to delete this item?</p>
        <div className="flex justify-center gap-2">
          <button
            className="px-3 py-2 border text-blue-950 border-blue-950 hover:bg-blue-950 hover:text-white rounded-lg"
            onClick={() => setRemove(false)}
          >
            Cancel
          </button>
          <button
            className="px-3 py-2 border text-red-700 border-red-700 hover:bg-red-700 hover:text-white rounded-lg"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
