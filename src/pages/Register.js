import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import w from "../images/w.png";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name: name,
        email: email,
        password: password,
      });
      toast.success("Register was successfully");
      setRegistrationSuccess(true);
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (registrationSuccess) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 1000);

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [registrationSuccess, navigate]);

  return (
    <div className="text-lg">
      <ToastContainer />
      <div className="flex min-h-full flex-col justify-center px-10 py-20 lg:px-16">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto w-64 h-64" src={w} alt="Your Company" />
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Create a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <form onSubmit={register} className="space-y-8">
            <div>
              <label
                htmlFor="name"
                className="block text-base font-medium text-gray-900"
              >
                Name
              </label>
              <div className="mt-3">
                <input
                  type="name"
                  name="name"
                  id="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-3">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-base font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-3">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-base font-medium text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-3">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-lg font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-base text-gray-500">
            Already have an account?
            <a
              href="/"
              className="font-semibold text-indigo-600 hover:text-indigo-500 ml-2"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
