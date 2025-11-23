import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";

const PasswordPage = () => {
  const { url } = useContext(StoreContext);
  const { token } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/user/forgot-password`, {
        email,
      });
      toast.success(res.data.message || "If email exists, reset link sent");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong Please Try again "
      );
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(`${url}/api/user/reset-password/${token}`, {
        password,
      });
      toast.success(res.data.message || "Password reset successful");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired link");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <form
        onSubmit={token ? handleReset : handleForgot}
        className="w-[max(23vw,330px)] bg-white rounded-lg p-6 shadow-sm flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold text-gray-900">
          {token ? "Reset password" : "Forgot password"}
        </h2>

        {!token ? (
          <>
            <p className="text-sm text-gray-600">
              Enter your email. We’ll send a reset link if your account exists.
            </p>
            <input
              type="email"
              className="border border-gray-300 rounded p-2.5 outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-[#e63718e9] text-white rounded-md p-2.5"
            >
              Send reset link
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              Choose a new password for your account.
            </p>

            <div className="relative">
              <input
                type={show ? "text" : "password"}
                className="border border-gray-300 rounded p-2.5 w-full outline-none"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-2 text-sm text-blue-600"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>

            <input
              type="password"
              className="border border-gray-300 rounded p-2.5 outline-none"
              placeholder="Confirm new password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-[#e63718e9] text-white rounded-md p-2.5"
            >
              Reset password
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default PasswordPage;
