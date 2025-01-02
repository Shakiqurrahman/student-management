import React, { useState } from "react";
import { Link } from "react-router";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add form submission logic here
    console.log(formData);

    // Reset the form fields
    setFormData({
      fullName: "",
      username: "",
      email: "",
      password: "",
    });
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
            name="username"
            onChange={handleInputChange}
            value={formData.username}
            className="border w-full px-3 py-2 outline-none  focus:border-primary duration-300 rounded-md"
            placeholder="Username"
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
        <div className="mt-4">
          <button
            type="submit"
            className="bg-primary text-white py-2 w-full rounded-md font-medium"
          >
            SIGN UP
          </button>
        </div>

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
