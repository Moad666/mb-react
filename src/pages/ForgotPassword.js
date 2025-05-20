import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import w from "../images/w.png";
import { Navigate, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [forgot, setForgot] = useState(false);

  // back
  const goToLogin = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/forgotpassword",
        { email }
      );
      toast.success("Check your email for resetting your password");
      setMessage(response.data.success);
      setForgot(true);
    } catch (error) {
      toast.error("Email doesn't exist!");
      setMessage(error.response.data.error);
    }
  };

  useEffect(() => {
    if (forgot) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3500);

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [forgot, navigate]);

  return (
    <div className="text-lg">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center mt-32">
        <div className="bg-white shadow-xl rounded p-8 mb-5">
          <div className="flex justify-center mb-4">
            <img src={w} width={250} height={250} alt="Logo" />
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 w-80"
          >
            <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900">
              You Forgot your Password?
            </h2>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mb-5 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-lg font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              send reset link
            </button>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-400 px-4 py-2 text-lg font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={goToLogin}
            >
              Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
