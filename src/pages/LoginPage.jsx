import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/ContextHooks";
import useMutationApi from "../hooks/useMutationQuery";
import { handleApiError } from "../utils/handleApiError";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { callMutation, isLoading, error } = useMutationApi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await callMutation("/users/login", formData);
      console.log("submitted Data", response?.data);
      navigate("/");
      setUser(response?.data);

      // Reset the form fields
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error(errorMessage);
      // setError(errorMessage);
    } finally {
      // setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex justify-center items-center bg-gray-200 h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full m-4 sm:w-[450px] px-4 py-8 sm:p-8 shadow-lg bg-white rounded-xl"
      >
        <h1 className="text-2xl block text-center mb-5 font-semibold text-primary">
          Login
        </h1>
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
          <div>
            <Link className="text-primary text-sm" to="#">
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-white py-2 w-full rounded-md font-medium disabled:opacity-70"
          >
            LOGIN
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center mt-1">{error}</p>
        )}
        <div className="flex justify-center items-center gap-1 mt-2">
          <p className="text-gray-600 text-sm">Don&apos;t have an account?</p>
          <Link
            to={"/sign-up"}
            className="text-primary text-sm hover:underline"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
