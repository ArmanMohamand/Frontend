import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
export const StoreContext = createContext(null);
import axios from "axios";

const StoreContextProvider = (props) => {
  const [cartItem, setcartItem] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [token, settoken] = useState(localStorage.getItem("token") || "");
  const [food_list, setfood_list] = useState([]);

  const url = "https://backend-1-iyjt.onrender.com";

  const add_in_cart = async (itemId) => {
    if (!cartItem[itemId]) {
      setcartItem((prev) => {
        const updated = { ...prev, [itemId]: 1 };
        localStorage.setItem("cart", JSON.stringify(updated));
        return updated;
      });
    } else {
      setcartItem((prev) => {
        const updated = { ...prev, [itemId]: prev[itemId] + 1 };
        localStorage.setItem("cart", JSON.stringify(updated));
        return updated;
      });
    }

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId: itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  };

  const delete_from_cart = async (itemId) => {
    setcartItem((prev) => {
      const updated = { ...prev, [itemId]: prev[itemId] - 1 };
      if (updated[itemId] <= 0) delete updated[itemId];
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });

    if (token) {
      await axios.post(
        url + "/api/cart/delete",
        { itemId: itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  };

  const countTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find(
          (product) => product._id.toString() === item
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodlist = async () => {
    const res = await axios.get(url + "/api/food/list");
    setfood_list(res.data.data);
  };

  const loadCartdata = async (token) => {
    const res = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { Authorization: `Bearer ${token}` } } // ✅ safer header
    );
    if (res.data?.data?.cartItems) {
      setcartItem(res.data.data.cartItems);
      localStorage.setItem("cart", JSON.stringify(res.data.data.cartItems)); // ✅ persist
    }
  };

  useEffect(() => {
    async function fetchData() {
      await fetchFoodlist();
      if (token) {
        await loadCartdata(token);
      }
    }
    fetchData();
  }, [token]);

  const contextValue = {
    food_list,
    cartItem,
    setcartItem,
    add_in_cart,
    delete_from_cart,
    countTotalCartAmount,
    url,
    token,
    settoken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
