import React from "react";
import { assets } from "../assets/assets";
const AppDownload = () => {
  return (
    <div
      className="download md:mx-20 m-auto mt-24 text-[max(3vw,20px)] text-center font-medium flex flex-col items-center"
      id="app-download"
    >
      <p>
        For Better Experience Download
        <br />
        <span className="text-[#bfb5b3e9]">FitZilla App</span>
      </p>
      <div className="where mt-10">
        <img
          className="w-[max(30vw,120px)] max-w-44 transition duration-500 hover:scale-105 cursor-pointer   "
          src={assets.play_store}
          alt="Download on Play Store"
        />
      </div>
    </div>
  );
};
export default AppDownload;
