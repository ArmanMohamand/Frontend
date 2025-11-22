import React from "react";
import "../components/Header.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useEffect } from "react";

const Verify = () => {
  const [searchParams, setsearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifypayment = async () => {
    try {
      const res = await axios.post(
        `${url}/api/order/verifyorder`,
        { orderId, success },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      navigate("/cart");
    }
  };

  useEffect(() => {
    verifypayment();
  }, []);
  return (
    <div className="verify min-h-[60vh] grid">
      <div
        className="spinner w-[100px] h-[100px] place-self-center border-[5px] border-solid border-[#bdbdbd]
           border-t-[red] rounded-[50%] Anime-4"
      ></div>
    </div>
  );
};

export default Verify;
