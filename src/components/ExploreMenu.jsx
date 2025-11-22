import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../assets/assets";
const ExploreMenu = ({ category, setcategory }) => {
  return (
    <div className="mx-20 flex flex-col gap-5 " id="explore-menu">
      <h1 className="text-2xl font-[600] text-[max(2vw,24px)] ">
        Explore our menu
      </h1>
      <p className="max-w-[90%]  text-[#262626] text-[max(3.5vw,11px)] md:text-[16px] ">
        Cravings, meet their match. Discover a menu bursting with variety — from comfort classics to bold new flavors. Every dish is made to satisfy and elevate your dining experience, one bite at a time.
      </p>
      <div className=" list flex  justify-between items-center gap-5 text-center my-5 py-2 overflow-x-scroll  ">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setcategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="item"
            >
              <img
                className={
                  category === item.menu_name
                    ? "border-2 border-solid border-[#FF6347] p-1 rounded-[50%] w-[7.5vw] min-w-[80px] cursor-pointer transition duration-200"
                    : " rounded-[50%] w-[7.5vw] min-w-[80px] cursor-pointer transition duration-200 "
                }
                src={item.menu_image}
              />
              <p className="mt-2.5 text-[#747474] text-[max(1.4vw,16px)]">
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
      <hr className="my-2.5 mx-0 h-0.5 bg-[#e2e2e2] border-none" />
    </div>
  );
};

export default ExploreMenu;
