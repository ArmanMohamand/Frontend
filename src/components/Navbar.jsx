import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import "./Header.css";
import { useNavigate, Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { IoReorderThreeOutline } from "react-icons/io5";

const Navbar = ({ setLogIn }) => {
  const [menu, setmenu] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { countTotalCartAmount, token, settoken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    settoken("");
    navigate("/");
  };

  return (
    <div className="relative flex flex-col md:flex-row md:justify-between items-center py-5 px-5 md:px-10 lg:px-20 gap-5 md:gap-0">
      <Link to="/">
        <h1 className="text-[#bfb5b3e9] text-4xl lg:text-5xl font-semibold">
          FitZilla
        </h1>
      </Link>
      <div className="flex w-full justify-between items-center md:hidden">
        <IoReorderThreeOutline
          className="text-3xl text-[#49557e] cursor-pointer"
          onClick={() => setNavOpen(!navOpen)}
        />
        <div className="flex flex-row items-center gap-4">
          {/* <img src={assets.search_icon} alt="search" className="w-5" /> */}
          <div className="relative">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="cart" className="w-6" />
            </Link>
            {countTotalCartAmount() > 0 && (
              <div className="absolute min-w-2.5 min-h-2.5 bg-[#FF6347] rounded-[5px] top-[-8px] right-[-8px]" />
            )}
          </div>
          {!token ? (
            <button
              onClick={() => setLogIn(true)}
              className="bg-transparent text-[14px] text-[#49557e] border border-[#FF6347] py-2 px-5 rounded-[50px] transition duration-300 hover:bg-[#fff4f2]"
            >
              Sign in
            </button>
          ) : (
            <div
              className="relative profile cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)} //  toggle on mobile
            >
              <img src={assets.profile_icon} alt="Profile" />
              <ul
                className={`absolute top-10 right-0 z-10 w-[150px] bg-[#fff2ef] shadow-lg rounded-[4px] border border-[#ff6347] py-3 px-6 list-none flex-col gap-2.5 transition duration-300
                  md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible
                  ${
                    profileOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
              >
                <li
                  onClick={() => navigate("/myorders")}
                  className="flex items-center cursor-pointer py-1.5 hover:text-[#ff6347]"
                >
                  <img src={assets.bag_icon} alt="Orders" className="w-5" />
                  <p>Orders</p>
                </li>
                <hr className="border-[#ff6347]" />
                <li
                  onClick={logout}
                  className="flex items-center cursor-pointer py-1.5 hover:text-[#ff6347]"
                >
                  <img src={assets.logout_icon} alt="Logout" className="w-5" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <ul className="hidden md:flex flex-wrap md:flex-nowrap list-none gap-4 md:gap-5 xl:gap-20 text-[#49557e] text-[16px] md:text-[18px] cursor-pointer justify-center">
        <Link
          to="/"
          onClick={() => setmenu("home")}
          className={
            menu === "home"
              ? "pb-[2px] border-b-[2px] border-b-[#49557e] hover:scale-105"
              : "hover:scale-105"
          }
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setmenu("menu")}
          className={
            menu === "menu"
              ? "pb-[2px] border-b-[2px] border-b-[#49557e] hover:scale-105"
              : "hover:scale-105"
          }
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setmenu("mobile-app")}
          className={
            menu === "mobile-app"
              ? "pb-[2px] border-b-[2px] border-b-[#49557e] hover:scale-105"
              : "hover:scale-105"
          }
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setmenu("contact us")}
          className={
            menu === "contact us"
              ? "pb-[2px] border-b-[2px] border-b-[#49557e] hover:scale-105"
              : "hover:scale-105"
          }
        >
          contact us
        </a>
      </ul>

      {/* {navOpen && (
        <ul className="flex flex-col gap-4 text-[#49557e] text-[16px] cursor-pointer md:hidden self-start mt-2">
          <li onClick={() => setmenu("home")} className="hover:scale-105">
            home
          </li>
          <li onClick={() => nevigate(/#explore-menu)} className="hover:scale-105">
            menu
          </li>
          <li onClick={() => setmenu("mobile-app")} className="hover:scale-105">
            mobile-app
          </li>
          <li onClick={() => setmenu("contact us")} className="hover:scale-105">
            contact us
          </li>
        </ul>
      )} */}
      {navOpen && (
        <ul className="flex flex-col gap-4 text-[#49557e] text-[16px] cursor-pointer md:hidden self-start mt-2">
          <Link
            to="/"
            onClick={() => {
              setmenu("home");
              setNavOpen(false); // close menu after click
            }}
            className="hover:scale-105"
          >
            home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => {
              setmenu("menu");
              setNavOpen(false);
            }}
            className="hover:scale-105"
          >
            menu
          </a>
          <a
            href="#app-download"
            onClick={() => {
              setmenu("mobile-app");
              setNavOpen(false);
            }}
            className="hover:scale-105"
          >
            mobile-app
          </a>
          <a
            href="#footer"
            onClick={() => {
              setmenu("contact us");
              setNavOpen(false);
            }}
            className="hover:scale-105"
          >
            contact us
          </a>
        </ul>
      )}

      <div className="hidden md:flex items-center gap-8">
        {/* <img src={assets.search_icon} alt="search" className="w-6" /> */}
        <div className="relative">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="cart" className="w-6" />
          </Link>
          {countTotalCartAmount() > 0 && (
            <div className="absolute min-w-2.5 min-h-2.5 bg-[#FF6347] rounded-[5px] top-[-8px] right-[-8px]" />
          )}
        </div>

        {!token ? (
          <button
            onClick={() => setLogIn(true)}
            className="bg-transparent text-[16px] text-[#49557e] border border-[#FF6347] py-2.5 px-7 rounded-[50px] transition duration-300 hover:bg-[#fff4f2]"
          >
            Sign in
          </button>
        ) : (
          <div className="relative profile cursor-pointer group">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="absolute top-10 right-0 z-10 w-[150px] bg-[#fff2ef] shadow-lg rounded-[4px] border border-[#ff6347] py-3 px-6 list-none flex-col gap-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
              <li
                onClick={() => navigate("/myorders")}
                className="flex items-center cursor-pointer py-1.5 hover:text-[#ff6347]"
              >
                <img src={assets.bag_icon} alt="Orders" className="w-5" />
                <p>Orders</p>
              </li>
              <hr className="border-[#ff6347]" />
              <li
                onClick={logout}
                className="flex items-center cursor-pointer py-1.5 hover:text-[#ff6347]"
              >
                <img src={assets.logout_icon} alt="Logout" className="w-5" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
