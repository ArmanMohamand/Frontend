import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import "./Header.css";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItem, add_in_cart, delete_from_cart, url } =
    useContext(StoreContext);

  return (
    <div className="w-full m-auto rounded-[50px] shadow-[0_0_10px_#00000015] transition duration-300 Anima-2 flex flex-col min-h-[360px] bg-white hover:scale-105 hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] ">
      <div className="relative ">
        <img
          className="w-full h-[180px] object-cover rounded-tl-[15px] rounded-tr-[15px]"
          src={url + "/images/" + image}
          alt={name}
        />
        {!cartItem[id] ? (
          <img
            src={assets.add_icon_white}
            alt="Add"
            className="w-[35px] absolute bottom-[15px] right-[15px] cursor-pointer rounded-full hover:scale-105  duration-300"
            onClick={() => add_in_cart(id)}
          />
        ) : (
          <div className="absolute bottom-[15px] right-[15px] flex items-center gap-2.5 p-1.5 rounded-full bg-white">
            <img
              className="w-7 cursor-pointer"
              onClick={() => delete_from_cart(id)}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p className="text-sm font-medium">{cartItem[id]}</p>
            <img
              className="w-7 cursor-pointer"
              onClick={() => add_in_cart(id)}
              src={assets.add_icon_green}
              alt="Add"
            />
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col justify-between flex-grow">
        <div className="flex justify-between items-center mb-2.5">
          <p className="text-[20px] font-medium">{name}</p>
          <img className="w-[70px]" src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="text-[#676767] text-[12px] leading-snug line-clamp-2">
          {description}
        </p>
        <p className="text-[#e63718e9] font-semibold mt-2">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
