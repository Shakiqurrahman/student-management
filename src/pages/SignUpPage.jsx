import React, { useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/ContextHooks";
import useMutationApi from "../hooks/useMutationQuery";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { callMutation, isLoading, error } = useMutationApi();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await callMutation("/users/register", formData);
      console.log("submitted Data", response?.data);
      // Save user data to localStorage
      if (response?.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      toast.success("Sign Up Successfully!");
      navigate("/");
      setUser(response?.data);
      setToken(response?.data?.accessToken);

      // Reset the form fields
      setFormData({
        fullName: "",
        userName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      if (typeof error === "string") {
        toast.error(error);
      } else {
        toast.error("An error occurred while signing up.");
      }
    }
  };
  return (
    <div className="flex justify-center items-center bg-gray-200 h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full m-4 sm:w-[450px] px-4 py-8 sm:p-8 shadow-lg bg-white rounded-xl"
      >
        <h1 className="text-2xl block text-center mb-5 font-semibold text-primary">
          Sign Up
        </h1>
        <div className="mt-3">
          <input
            type="text"
            name="fullName"
            onChange={handleInputChange}
            value={formData.fullName}
            className="border w-full px-3 py-2 outline-none  focus:border-primary duration-300 rounded-md"
            placeholder="Full Name"
            required
          />
        </div>
        <div className="mt-3">
          <input
            type="text"
            name="userName"
            onChange={handleInputChange}
            value={formData.userName}
            className="border w-full px-3 py-2 outline-none  focus:border-primary duration-300 rounded-md"
            placeholder="userName"
            required
          />
        </div>
        <div className="mt-3">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border w-full px-3 py-2 outline-none  focus:border-primary duration-300 rounded-md"
            placeholder="Email"
            required
          />
        </div>
        <div className="mt-3">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="border w-full px-3 py-2 outline-none focus:border-primary duration-300 rounded-md"
            placeholder="Password"
            required
          />
        </div>
        <div className="flex justify-between mt-3">
          <div className="gap-2 flex items-center">
            <input
              id="showPassword"
              name="showPassword"
              type="checkbox"
              className="size-4 outline-none accent-primary"
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <label
              htmlFor="showPassword"
              className="text-gray-600 select-none text-sm"
            >
              Show Password
            </label>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="disabled:bg-primary/80 flex items-center justify-center w-full text-center h-10 bg-primary hover:bg-primary/80 text-white font-medium duration-300 rounded select-none mt-4"
        >
          {isLoading ? (
            <CgSpinner className="animate-spin text-xl" />
          ) : (
            "Sign Up"
          )}
        </button>

        <div className="flex justify-center items-center gap-1 mt-2">
          <h1 className="text-gray-600 text-sm">Already have an account?</h1>
          <Link to={"/login"} className="text-primary text-sm hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
