// import React, { use, useState } from "react";
// import { assets } from "../assets/assets";
// import { useContext } from "react";
// import { StoreContext } from "../context/StoreContext";
// import axios from "axios";

// import "./Header.css";

// const LogInPopUp = ({ setLogIn }) => {
//   const { url, settoken } = useContext(StoreContext);

//   const [cstate, setcstate] = useState("Login");
//   const [data, setdata] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const onchangehandler = (e) => {
//     setdata({ ...data, [e.target.name]: e.target.value });
//   };

//   const onlogin = async (e) => {
//     e.preventDefault();
//     let newurl = url;
//     if (cstate === "Login") {
//       newurl += "/api/user/login";
//     } else {
//       newurl += "/api/user/register";
//     }

//     const res = await axios.post(newurl, data);
//     if (res.status === 200 || res.status === 201) {
//       settoken(res.data.token);
//       localStorage.setItem("token", res.data.token);
//       // toast.success("Account created successfully");
//       setLogIn(false);
//     } else {
//       alert(res.data.message);
//     }
//   };

//   return (
//     <div className="logIn absolute z-[1] w-[100%] h-[100%] bg-[#00000090] grid">
//       <form
//         className="place-self-center w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-6  py-6 px-8 rounded-lg text-[14px] Anima-3"
//         onSubmit={onlogin}
//       >
//         <div className="title flex justify-between items-center text-black">
//           <h2 className="text-2xl font-semibold">{cstate}</h2>
//           <img
//             onClick={() => setLogIn(false)}
//             src={assets.cross_icon}
//             className="w-[16px] cursor-pointer"
//             alt=""
//           />
//         </div>
//         <div className="input flex flex-col gap-5 ">
//           {cstate === "Login" ? (
//             <></>
//           ) : (
//             <input
//               name="name"
//               className="border outline-none border-[#c9c9c9] p-2.5"
//               type="text"
//               placeholder="Your name "
//               required
//               onChange={onchangehandler}
//               value={data.name}
//             />
//           )}

//           <input
//             className="border  outline-none border-[#c9c9c9] p-2.5"
//             type="email"
//             name="email"
//             onChange={onchangehandler}
//             value={data.email}
//             placeholder="Your email"
//             required
//           />
//           <input
//             className="border  outline-none border-[#c9c9c9] p-2.5"
//             type="password"
//             name="password"
//             onChange={onchangehandler}
//             value={data.password}
//             placeholder="Password"
//             required
//           />
//         </div>
//         <button
//           className="border-none p-2.5 rounded-md text-white bg-[#e63718e9] text-[15px] "
//           type="submit"
//         >
//           {cstate === "Sign Up" ? "Create account" : "Login"}
//         </button>
//         <div className="flex items-start gap-2 mt-[-15px]">
//           <input type="checkbox" required className="mt-1 " />
//           <p>By continuing,i agree to the terms of use & privacy policy</p>
//         </div>
//         {cstate === "Login" ? (
//           <p>
//             Create a new account?{" "}
//             <span
//               onClick={() => setcstate("Sign Up")}
//               className="cursor-pointer text-[#e63718e9] font-medium  "
//             >
//               Click here
//             </span>
//           </p>
//         ) : (
//           <p>
//             Already have an account?{" "}
//             <span
//               onClick={() => setcstate("Login")}
//               className="cursor-pointer text-[#e63718e9] font-medium "
//             >
//               Login here
//             </span>
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default LogInPopUp;

import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import "./Header.css";

const LogInPopUp = ({ setLogIn }) => {
  const { url, settoken } = useContext(StoreContext);

  const [cstate, setcstate] = useState("Login");
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // 👈 new state

  const onchangehandler = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const onlogin = async (e) => {
    e.preventDefault();
    let newurl = url;
    if (cstate === "Login") {
      newurl += "/api/user/login";
    } else {
      newurl += "/api/user/register";
    }

    const res = await axios.post(newurl, data);
    if (res.status === 200 || res.status === 201) {
      settoken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setLogIn(false);
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className="logIn absolute z-[1] w-[100%] h-[100%] bg-[#00000090] grid">
      <form
        className="place-self-center w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-6 py-6 px-8 rounded-lg text-[14px] Anima-3"
        onSubmit={onlogin}
      >
        <div className="title flex justify-between items-center text-black">
          <h2 className="text-2xl font-semibold">{cstate}</h2>
          <img
            onClick={() => setLogIn(false)}
            src={assets.cross_icon}
            className="w-[16px] cursor-pointer"
            alt=""
          />
        </div>

        <div className="input flex flex-col gap-5">
          {cstate === "Login" ? null : (
            <input
              name="name"
              className="border outline-none border-[#c9c9c9] p-2.5"
              type="text"
              placeholder="Your name"
              required
              onChange={onchangehandler}
              value={data.name}
            />
          )}

          <input
            className="border outline-none border-[#c9c9c9] p-2.5"
            type="email"
            name="email"
            onChange={onchangehandler}
            value={data.email}
            placeholder="Your email"
            required
          />
          <div className="relative">
            <input
              className="border outline-none border-[#c9c9c9] p-2.5 w-full"
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={onchangehandler}
              value={data.password}
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-sm text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          className="border-none p-2.5 rounded-md text-white bg-[#e63718e9] text-[15px]"
          type="submit"
        >
          {cstate === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="flex items-start gap-2 mt-[-15px]">
          <input type="checkbox" required className="mt-1" />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {cstate === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setcstate("Sign Up")}
              className="cursor-pointer text-[#e63718e9] font-medium"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setcstate("Login")}
              className="cursor-pointer text-[#e63718e9] font-medium"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LogInPopUp;
