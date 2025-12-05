import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";
import SkeletonFoodList from "./SkeletonFoodList";
const FoodDisplay = ({ category }) => {
  const { food_list, loadingFoods } = useContext(StoreContext);

  return (
    <div className="mt-[30px] px-4 sm:px-10 md:px-20 w-full m-auto max-w-[1280px] lg:max-w-[1440px] xl:max-w-[1600px]">
      <h1 className="text-2xl font-[600] text-[max(2vw,24px)]">
        Top dishes near you
      </h1>

      <p className="text-sm italic text-gray-500 mt-1">
        Showing category: <span className="font-medium">{category}</span>
      </p>

      <div className="p-2 rounded-md mt-[30px]">
        {loadingFoods && food_list.length === 0 ? (
          <SkeletonFoodList />
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 gap-y-[50px]">
            {food_list.map((item, index) => {
              if (category === "All" || category === item.category) {
                return (
                  <div key={index}>
                    <FoodItem
                      id={item._id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      image={item.image}
                    />
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
