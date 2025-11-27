import React, { useEffect, useState, useContext } from "react";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        url + "/api/order/userorders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setData([]);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className=" mx-0 p-5">
      <h2 className="text-2xl font-extrabold text-[#bfb5b3e9] tracking-wide mb-4">
        My Orders
      </h2>

      <div className="flex flex-col gap-[20px] mt-[30px]">
        {data.length === 0 ? (
          <p className="text-gray-500 italic">No orders found.</p>
        ) : (
          data.map((order, index) => (
            <div
              key={index}
              className="
                grid 
                grid-cols-1 
                sm:grid-cols-[0.5fr_2fr_1fr] 
                md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] 
                items-center 
                gap-[20px] 
                text-[14px] 
                py-2.5 px-5 
                border border-solid border-[#eb434356] 
                rounded-[5px]
              "
            >
              <img
                src={assets.parcel_icon}
                alt="Parcel Icon"
                className="w-[50px] mx-auto sm:mx-0"
              />
              <p className="text-center sm:text-left">
                {order.items.map((item, i) =>
                  i === order.items.length - 1
                    ? item.name + " x" + item.quantity
                    : item.name + " x" + item.quantity + ", "
                )}
              </p>
              <p className="text-center sm:text-left">₹{order.amount}.00</p>
              <p className="hidden md:block">Items: {order.items.length}</p>

              <p
                className={`font-bold text-center sm:text-left py-2 px-3 rounded-[4px] transition 
              ${
                order.status === "Cancelled"
                  ? "bg-gray-300 text-red-600 cursor-not-allowed"
                  : order.status === "Delivered"
                  ? " text-green-600"
                  : " text-yellow-700"
              }`}
              >
                <span className="text-[#eb434356]">&#x25cf;</span>
                {order.status}
              </p>

              <button
                onClick={fetchOrders}
                disabled={order.status === "Cancelled"}
                className={`inline-block py-2 px-3 rounded-[4px] transition 
                ${
                  order.status === "Cancelled"
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-[#ffe1e1] text-[#454545] hover:bg-[#eb4343] hover:text-white cursor-pointer"
                }`}
              >
                {order.status === "Cancelled"
                  ? "Order was cancelled"
                  : "Track Your Order"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
