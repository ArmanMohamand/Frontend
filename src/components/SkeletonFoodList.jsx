import React from "react";

const SkeletonFoodList = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 gap-y-[50px]">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-[15px] shadow-md bg-white p-4 flex flex-col gap-3"
        >
          <div className="w-full h-[150px] bg-gray-300 rounded-md"></div>
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
          <div className="h-3 w-full bg-gray-300 rounded"></div>
          <div className="h-3 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-4 w-16 bg-gray-300 rounded mt-2"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonFoodList;
