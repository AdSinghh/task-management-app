import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if(auth.user){
        navigate("/dashboard")
      }
  },[auth.user])
  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await auth.signin(formData.email, formData.password);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login Failed. Please try again.");
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{ backgroundImage: "frontend\assets\todoimage.jpg.avif", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <form
        onSubmit={submitHandler}
        className="flex flex-col w-full max-w-md gap-y-4 p-8 bg-white bg-opacity-90 rounded-lg shadow-md"
      >
        {/* Email Input */}
        <label className="w-full">
          <p className="text-sm text-gray-700 mb-1 leading-6">
            Email Address<sup className="text-pink-500">*</sup>
          </p>
          <input
            type="email"
            required
            value={formData.email}
            placeholder="Enter your email address"
            onChange={changeHandler}
            name="email"
            className="bg-gray-100 border border-gray-300 rounded-lg w-full p-3 text-gray-900"
          />
        </label>

        {/* Password Input */}
        <label className="w-full relative">
          <p className="text-sm text-gray-700 mb-1 leading-6">
            Password<sup className="text-pink-500">*</sup>
          </p>
          <input
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
            placeholder="Enter Password"
            onChange={changeHandler}
            name="password"
            className="bg-gray-100 border border-gray-300 rounded-lg w-full p-3 text-gray-900"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
          <Link to="#" className="text-xs mt-1 text-blue-500 hover:text-blue-700 ml-auto">
            Forgot Password
          </Link>
        </label>

        {/* Submit Button */}
        <button className="bg-yellow-500 hover:bg-yellow-400 py-2 px-4 rounded-lg mt-6 font-medium text-white">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;

