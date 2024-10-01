import React from "react";

const DeviceSizeIndicator = ({ enable = true }: {enable?: boolean}) => {
    if (process.env.NODE_ENV === "development" && enable) {
      return (
        <div className="fixed top-0 right-0 m-2 p-3 text-xs font-mono text-white h-6 w-6 rounded-full flex items-center justify-center bg-gray-700 sm:bg-pink-500 md:bg-orange-500 lg:bg-green-500 xl:bg-blue-500 z-[200]">
          <div className="block  sm:hidden md:hidden lg:hidden xl:hidden">al</div>
          <div className="hidden sm:block  md:hidden lg:hidden xl:hidden">sm</div>
          <div className="hidden sm:hidden md:block  lg:hidden xl:hidden">md</div>
          <div className="hidden sm:hidden md:hidden lg:block  xl:hidden">lg</div>
          <div className="hidden sm:hidden md:hidden lg:hidden xl:block">xl</div>
        </div>
      );
    }
  };
  
  export default DeviceSizeIndicator;
  