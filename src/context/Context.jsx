import React, { useEffect, useState } from "react";
import { createContext } from "react";
import runchat from "../config/gemini";

export const Context = createContext();
const ContextProvider = (props) => {
  const [input, setinput] = useState("");
  const [recentPrompts, setrecentPrompts] = useState("");
  const [prevPrompts, setprevPrompts] = useState([]);
  const [showResult, setshowResult] = useState(false);
  const [loading, setloading] = useState(false);
  const [ResuktData, setResuktData] = useState("");
  const onSent = async (prompt) => {
    setloading(true);
    setshowResult(true);
    setrecentPrompts(input);
    const response = await runchat(input);
if (!response || response === "__GEMINI_QUOTA_EXHAUSTED__") {
      console.warn("Gemini fallback triggered.");
      setResuktData("All Gemini models have reached their limits. Please try again after reset or upgrade.");
      setloading(false);
      return;
    }
    let responsearray = response.split("**");
    let newRes = "";
    for (let i = 0; i < responsearray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newRes += responsearray[i];
      } else {
        newRes += "<b>" + responsearray[i] + "<b/>";
      }
    }
    let newRes2 = newRes.split("*").join("<br>")
    setResuktData(newRes2);
    setloading(false);
    setinput("");
  };
  const contextValue = {
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
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
