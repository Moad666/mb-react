// ResetPassword.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import w from "../images/w.png";


function ResetPassword() {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reset, setReset] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/resetpassword/${user_id}`,
        { password }
      );
      setSuccess(response.data.success);
      toast.success("Password changed successfully");
      setReset(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    if (reset) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3500);

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [reset, navigate]);

  return (
    <div>
      <ToastContainer/>
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
              Reset your Password!
            </h2>
            <div className="flex flex-col">
              <label htmlFor="password" className="block text-base font-medium text-gray-900">
                New Password
              </label>
              <input
                type="password"
                id="password"
                className="mb-5 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                name="password"
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-lg font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Reset Password
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
