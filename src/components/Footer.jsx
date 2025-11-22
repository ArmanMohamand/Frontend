import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer  id="footer"  className="footer bg-[#323232] text-[#d9d9d9] px-6 md:px-[8vw] py-10 mt-24 flex flex-col items-center gap-10">
      <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 md:gap-20">
        <div className="Ft-left flex flex-col gap-5">
          <h1 className="text-[#bfb5b3e9] text-4xl md:text-5xl font-semibold">
            FitZilla  
          </h1>
          <p className="text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus dicta unde ullam nihil officiis illo iusto, non
            fugiat distinctio soluta, nobis dolorum sapiente rerum vitae odio
            nam voluptates assumenda ipsam?
          </p>
          <div className="social_icon flex gap-4">
            <img className="w-10" src={assets.facebook_icon} alt="Facebook" />
            <img className="w-10" src={assets.twitter_icon} alt="Twitter" />
            <img className="w-10" src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        <div className="Ft-center flex flex-col gap-5">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#7a8ed0]">
            COMPANY
          </h2>
          <ul className="text-sm space-y-2.5">
            <li className="cursor-pointer hover:text-white">Home</li>
            <li className="cursor-pointer hover:text-white">About us</li>
            <li className="cursor-pointer hover:text-white">Delivery</li>
            <li className="cursor-pointer hover:text-white">Privacy policy</li>
          </ul>
        </div>

        <div className="Ft-right flex flex-col gap-5">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#7a8ed0]">
            Get In Touch
          </h2>
          <ul className="text-sm space-y-2.5">
            <li className="cursor-pointer hover:text-white">+91-6376999821</li>
            <li className="cursor-pointer hover:text-white">
              fitzilladel@gmail.com
            </li>
          </ul>
        </div>
      </div>
      <hr className="w-full h-0.5 bg-[#808080] border-none" />

      <p className="text-center text-sm text-[#7a8ed0] tracking-wide">
        Copyright © 2025 FitZilla . All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
