import React, { useState, useEffect, useContext, useRef } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxMinus } from "react-icons/rx";
import { assets } from "../assets/assets";
import { Context } from "../context/Context";
import "./Header.css";

const Maker = () => {
  const [leftOpen, setleftOpen] = useState(false);
  const [showAi, setshowAi] = useState(false);
  const [border, setborder] = useState(false);
  const resultRef = useRef(null);
  const {
    onSent,
    prevPrompts,
    setprevPrompts,
    setrecentPrompts,
    recentPrompts,
    showResult,
    setshowResult,
    loading,
    ResuktData,
    setResuktData,
    input,
    setinput,
  } = useContext(Context);

  useEffect(() => {
    if (!showAi) setborder(false);
  }, [showAi]);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [ResuktData]);

  return (
    <>
      <h2
        className={
          showAi
            ? "hidden"
            : "main text-2xl font-semibold fixed bottom-0 right-0 cursor-pointer z-20 m-14"
        }
        onClick={() => setshowAi(true)}
      >
        <img
          src={assets.Ailogo}
          alt="logo"
          className="w-[80px] cursor-pointer"
        />
      </h2>
      {showAi && (
        <div className="fixed bottom-0 right-0 m-7 bg-[#002D9C] rounded-2xl border-t border-l border-r border-white flex flex-col md:h-[75vh] md:w-[55vw] lg:h-[80vh] lg:w-[706px] h-[60vh] w-[85vw] opacity-75">
          <div className="flex justify-between items-center px-5 pt-5">
            <h2 className="main text-2xl font-medium text-white">FitzAi</h2>
            <div className="group relative inline-block">
              <RxMinus
                className="text-3xl cursor-pointer text-white"
                onClick={() => setshowAi(false)}
              />
              <span className="absolute -top-8 right-3/4 transform translate-x-1/2 text-white bg-black text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-50 transition-opacity">
                Minimize
              </span>
            </div>
          </div>
          <div className="absolute top-3 right-14">
            <div className="group relative w-full">
              <img
                src={assets.add_icon_white}
                onClick={() => {
                  setrecentPrompts(""),
                    setshowResult(false),
                    setResuktData(""),
                    setinput("");
                }}
                className="w-[40px] cursor-pointer"
              />
              <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-50 transition-opacity">
                New Chat
              </span>
            </div>
          </div>
          {!showResult && (
            <h2 className="pl-6 py-4 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-white">
              Hi Welcome, How can I help you today?
            </h2>
          )}
          <div
            ref={resultRef}
            className="result flex-grow overflow-y-auto px-[3%] py-4 text-2xl"
          >
            {recentPrompts && (
              <div className="my-10 mx-0 flex items-center gap-5 text-white text-4xl">
                <p>{`[${recentPrompts}]`}</p>
              </div>
            )}

            <div className="re-data flex items-start gap-5">
              <img src={assets.gemini_icon} className="w-10" />
              {loading ? (
                <div className="w-full flex flex-col gap-2.5">
                  {[...Array(3)].map((_, i) => (
                    <hr
                      key={i}
                      className="rounded-[4px] border-none bg-[#f6f7f8]
                      bg-[linear-gradient(to_right,_#9ed7ff,_#ffffff,_#9ed7ff)]
                      bg-[length:800px_50px] h-[20px] animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <p
                  dangerouslySetInnerHTML={{ __html: ResuktData }}
                  className="text-[17px] font-light text-white"
                ></p>
              )}
            </div>
          </div>
          <div className="mt-auto w-full relative">
            <input
              type="text"
              id="Search"
              value={input}
              onChange={(e) => setinput(e.target.value)}
              onClick={() => setborder(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSent();
                }
              }}
              placeholder="Enter your search"
              className="bg-white outline-none w-full py-2 px-2 text-sm sm:text-base lg:text-lg rounded-b-2xl placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg"
            />
            <img
              onClick={() => onSent()}
              src={assets.send_icon}
              alt="send"
              className="absolute right-0 bottom-0 w-8 h-[35.9px] sm:w-10 sm:h-10 md:w-12 md:h-[41px] lg:w-16 lg:h-[46px] cursor-pointer bg-black rounded-br-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Maker;
