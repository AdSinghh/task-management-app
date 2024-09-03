import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../clients/auth.client';

const SignUp = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await registerUser(formData.name, formData.email, formData.password);
      toast.success("Account Created");
      navigate("/");
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={submitHandler} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {/* Name Input */}
        <div className="flex flex-col gap-4 mt-4">
          <label className="w-full">
            <p className="text-sm text-gray-700 mb-1">
              Name<sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type="text"
              name="name"
              onChange={changeHandler}
              placeholder="Enter Your Name"
              value={formData.name}
              className="bg-gray-100 border border-gray-300 rounded-lg text-gray-900 w-full p-3"
            />
          </label>
        </div>
        {/* Email Input */}
        <div className="mt-4">
          <label className="w-full">
            <p className="text-sm text-gray-700 mb-1">
              Email Address<sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type="email"
              name="email"
              onChange={changeHandler}
              placeholder="Enter Email Address"
              value={formData.email}
              className="bg-gray-100 border border-gray-300 rounded-lg text-gray-900 w-full p-3"
            />
          </label>
        </div>
        {/* Password Inputs */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          {/* Password Input */}
          <label className="w-full relative">
            <p className="text-sm text-gray-700 mb-1">
              Create Password<sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={changeHandler}
              placeholder="Enter Password"
              value={formData.password}
              className="bg-gray-100 border border-gray-300 rounded-lg text-gray-900 w-full p-3"
            />
            <span
              className="absolute right-3 top-9 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />
              ) : (
                <AiOutlineEye fontSize={24} fill='#AFB2BF' />
              )}
            </span>
          </label>
          {/* Confirm Password Input */}
          <label className="w-full relative">
            <p className="text-sm text-gray-700 mb-1">
              Confirm Password<sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={changeHandler}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              className="bg-gray-100 border border-gray-300 rounded-lg text-gray-900 w-full p-3"
            />
            <span
              className="absolute right-3 top-9 cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />
              ) : (
                <AiOutlineEye fontSize={24} fill='#AFB2BF' />
              )}
            </span>
          </label>
        </div>
        {/* Submit Button */}
        <button className="w-full bg-yellow-500 hover:bg-yellow-400 rounded-lg font-medium text-white px-4 py-2 mt-6">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
