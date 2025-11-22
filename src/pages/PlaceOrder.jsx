import React, { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
const PlaceOrder = () => {
  const { countTotalCartAmount, token, food_list, cartItem, url, userId } =
    useContext(StoreContext);

  const [data, setdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const placeorderhandler = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItem[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItem[item._id] });
      }
    });

    const orderData = {
      // userId: localStorage.getItem("userId"),
      userId: userId,
      address: data,
      items: orderItems,
      amount: countTotalCartAmount() + 20,
    };
    try {
      const res = await axios.post(url + "/api/order/placeorder", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Response:", res.data);
      if (res.data.success) {
        const { session_url } = res.data;
        // is this correct?
        localStorage.setItem("pendingOrder", JSON.stringify(orderData));
        window.location.href = session_url;
      } else {
        toast.error("Order placement failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response?.data || error.message
      );
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.info("Please log in to place an order", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => navigate("/cart"), 1000);
    }
    // check if cart has any items
    const hasItems = Object.values(cartItem).some((qty) => qty > 0);
    if (!hasItems) {
      toast.info("Your cart is empty", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => navigate("/cart"), 1000);
    }
  }, [token, cartItem, navigate]);

  return (
    <form
      onSubmit={placeorderhandler}
      className="px-4 md:px-8 lg:px-16 xl:px-20 mt-16 flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-12 w-full overflow-x-hidden"
    >
      <div className="w-full max-w-full lg:max-w-[500px]">
        <p className="text-3xl font-semibold mb-12">Delivery information</p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              required
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First name"
              className="border border-[#c5c5c5] rounded-[4px] p-[10px] w-full mb-[15px] mt-0.5 ml-0.5 outline-[#e63718e9]"
            />
            <input
              required
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last name"
              className="border border-[#c5c5c5] rounded-[4px] p-[10px] w-full mb-[15px] mt-0.5 ml-0.5 outline-[#e63718e9]"
            />
          </div>
          <input
            required
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email address"
            className="border border-[#c5c5c5] rounded-[4px] p-[10px] w-full mb-[15px] mt-0.5 ml-0.5 outline-[#e63718e9]"
          />
          <input
            required
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            placeholder="Street"
            className="border border-[#c5c5c5] rounded-[4px] p-[10px] w-full mb-[15px] mt-0.5 ml-0.5 outline-[#e63718e9]"
          />
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              required
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              placeholder="City"
              className="border border-[#c5c5c5] rounded-[4px] p-[10px] w-full mb-[15px] mt-0.5 ml-0.5 outline-[#e63718e9]"
            />
            <input
              required
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              placeholder="State"
              className="border border-[#c5c5c5] rounded-[4px] p-[10px] w-full mb-[15px] mt-0.5 ml-0.5 outline-[#e63718e9]"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              required
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              type="text"
              placeholder="Zip code"
              className="border border-[#c5c5c5] rounded-[4px] p-[10px] w-full mb-[15px] mt-0.5 ml-0.5 outline-[#e63718e9]"
            />
            <input
              required
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              type="text"
              placeholder="Country"
              className="border border-[#c5c5c5] rounded-[4px] p-[10px] w-full mb-[15px] mt-0.5 ml-0.5 outline-[#e63718e9]"
            />
          </div>
          <input
            required
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="text"
            placeholder="Phone"
            className="border border-[#c5c5c5] rounded-[4px] p-[10px] w-full mb-[15px] mt-0.5 ml-0.5 outline-[#e63718e9]"
          />
        </div>
      </div>
      <div className="w-full max-w-full lg:max-w-[500px]">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">Cart Totals</h2>
          <div className="flex justify-between text-[#555]">
            <p>Subtotal</p>
            <p>₹{countTotalCartAmount()}</p>
          </div>
          <hr className="h-[1px] bg-[#e2e2e2]" />
          <div className="flex justify-between text-[#555]">
            <p>Delivery Fee</p>
            <p>₹20</p>
          </div>
          <hr className="h-[1px] bg-[#e2e2e2]" />
          <div className="flex justify-between text-[#555] font-bold">
            <p>Total</p>
            <b>₹{countTotalCartAmount() + 20}</b>
          </div>
          <button
            type="submit"
            className="bg-[#e63718e9] w-full md:w-[max(15vw,200px)] py-3 rounded text-white mt-7 hover:bg-[#d5300f] transition"
          >
            Proceed To Payment
          </button>
        </div>
      </div>
    </form>
  );
};
export default PlaceOrder;
