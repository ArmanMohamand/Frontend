// import React from "react";
// import "./Header.css";
// const Header = () => {
//   return (
//     <div className="bg-[url('/header_img.png')] bg-no-repeat bg-cover relative h-[max(50vw,320px)] px-5 md:px-10 lg:px-20 my-5 md:my-8 mx-5 md:mx-10 lg:mx-20 rounded-[20px] overflow-hidden">
//       <div className="absolute flex flex-col items-start gap-[3vw] w-full md:max-w-[60%] bottom-[10%] left-[5vw] Anima">
//         <h2 className="font-medium text-white text-[max(5vw,24px)] leading-tight mr-5 ">
//           Order your favourite food here
//         </h2>
//         <p className="text-white text-[max(3.5vw,11px)] mr-5 md:text-[1.3vw] leading-relaxed  ">
//           Hungry? Let’s fix that. Dive into our menu packed with everything from
//           street-style bites to chef‑crafted meals. Your next favorite dish is
//           just a click away. Pick what you crave, place your order, and we’ll
//           deliver flavor straight to your doorstep. No stress, no fuss — just
//           pure deliciousness waiting for you.
//         </p>
//         <button className="border-none text-[#747474] font-medium py-[1vw] px-[3vw] bg-white text-[max(3.5vw,13px)] md:text-[1vw] rounded-full hover:scale-105 transition duration-200">
//           <a href="#explore-menu">View Menu</a>
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Header;

import React from "react";
import "./Header.css";

const Header = () => {
  const handleScroll = () => {
    const section = document.getElementById("explore-menu");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[url('/header_img.png')] bg-no-repeat bg-cover relative h-[max(50vw,320px)] px-5 md:px-10 lg:px-20 my-5 md:my-8 mx-5 md:mx-10 lg:mx-20 rounded-[20px] overflow-hidden">
      <div className="absolute flex flex-col items-start gap-[3vw] w-full md:max-w-[60%] bottom-[10%] left-[5vw] Anima">
        <h2 className="font-medium text-white text-[max(5vw,24px)] leading-tight mr-5 ">
          Order your favourite food here
        </h2>
        <p className="text-white text-[max(3.5vw,11px)] mr-5 md:text-[1.3vw] leading-relaxed">
          Hungry? Let’s fix that. Dive into our menu packed with everything from
          street-style bites to chef‑crafted meals. Your next favorite dish is
          just a click away. Pick what you crave, place your order, and we’ll
          deliver flavor straight to your doorstep. No stress, no fuss — just
          pure deliciousness waiting for you.
        </p>
        <button
          onClick={handleScroll}
          className="border-none text-[#747474] font-medium py-[1vw] px-[3vw] bg-white text-[max(3.5vw,13px)] md:text-[1vw] rounded-full hover:scale-105 transition duration-200"
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
