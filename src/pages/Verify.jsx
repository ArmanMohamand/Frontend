import React, { useEffect, useContext } from "react";
import "../components/Header.css";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");

  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifypayment = async () => {
    try {
      // Load the order saved in PlaceOrder.jsx
      const savedOrder = JSON.parse(localStorage.getItem("pendingOrder"));
      if (!savedOrder) {
        console.error("No pending order found in localStorage");
        navigate("/cart");
        return;
      }

      const orderData = { ...savedOrder, success };

      const res = await axios.post(`${url}/api/order/verifyorder`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        // Clear localStorage after successful verification
        localStorage.removeItem("pendingOrder");
        navigate("/myorders");
      } else {
        navigate("/cart");
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
