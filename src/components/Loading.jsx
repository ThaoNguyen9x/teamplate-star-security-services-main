// FullScreenLoading.jsx
import React from 'react';
import { Triangle } from 'react-loader-spinner';

const FullScreenLoading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black">
      <Triangle
        visible={true}
        height={80}
        width={80}
        color="white"
        ariaLabel="triangle-loading"
      />
    </div>
  );
};

export default FullScreenLoading;
