import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { cartItem, food_list, delete_from_cart, countTotalCartAmount, url } =
    useContext(StoreContext);

  const navigate = useNavigate();

  // Promo state
  const [promoCode, setPromoCode] = useState("");
  const deliveryFee = 20;
  const subtotal = countTotalCartAmount();
  const initialTotal = subtotal + deliveryFee;
  const [discountedTotal, setDiscountedTotal] = useState(initialTotal);

  // Recalculate base total whenever cart changes
  useEffect(() => {
    setDiscountedTotal(countTotalCartAmount() + deliveryFee);
  }, [cartItem]);

  // Apply promo code
  const applyPromo = async () => {
    try {
      const res = await axios.post(`${url}/api/promo/apply`, {
        code: promoCode,
        amount: countTotalCartAmount() + deliveryFee,
      });
      if (res.data.success) {
        setDiscountedTotal(res.data.newAmount);
      } else {
        alert(res.data.message || "Invalid promo code");
      }
    } catch (err) {
      alert("Error applying promo");
    }
  };

  return (
    <div className="mx-6 md:mx-20 mt-20 text-sm md:text-base">
      <div className="cartitems">
        <div className="hidden md:grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-[#808080] text-[max(1vw,12px)]">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr className="my-3 bg-[#e2e2e2] border-none h-[1px]" />
        {food_list.map((item) => {
          if (cartItem[item._id] > 0) {
            return (
              <div key={item._id} className="mb-4">
                <div className="grid grid-cols-6 md:grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-[max(1vw,12px)] gap-3 md:gap-0">
                  <img
                    src={url + "/images/" + item.image}
                    alt={item.name}
                    className="w-16 md:w-12"
                  />
                  <p>{item.name}</p>
                  <p className="pl-2.5">₹{item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>₹{item.price * cartItem[item._id]}</p>
                  <p
                    className="cursor-pointer text-red-500 transition-opacity duration-300"
                    onClick={() => delete_from_cart(item._id)}
                  >
                    X
                  </p>
                </div>
                <hr className="h-[1px] bg-[#e2e2e2] border-none mt-2" />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="mt-20 flex flex-col md:flex-row justify-between gap-10">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">Cart Totals</h2>
          <div className="flex justify-between text-[#555]">
            <p>Subtotal</p>
            <p>₹{subtotal}</p>
          </div>
          <hr className="h-[1px] bg-[#e2e2e2]" />
          <div className="flex justify-between text-[#555]">
            <p>Delivery Fee</p>
            <p>₹{deliveryFee}</p>
          </div>
          <hr className="h-[1px] bg-[#e2e2e2]" />
          <div className="flex justify-between text-[#555] font-bold">
            <p>Total</p>
            <b>₹{discountedTotal}</b>
          </div>
          <button
            className="bg-[#e63718e9] w-full md:w-[max(15vw,200px)] py-3 rounded text-white"
            onClick={() => navigate("/placeorder")}
          >
            Proceed To Checkout
          </button>
        </div>

        {/* Promo Code */}
        <div className="flex-1">
          <p className="text-[#555] mb-2">
            If you have a promo code, enter it here
          </p>
          <div className="flex flex-col sm:flex-row bg-[#eaeaea] rounded overflow-hidden">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo Code"
              className="flex-grow bg-transparent border-none outline-none px-3 py-2 text-sm"
            />
            <button
              onClick={applyPromo}
              className="bg-black text-white px-5 py-2 mt-2 sm:mt-0 sm:ml-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
