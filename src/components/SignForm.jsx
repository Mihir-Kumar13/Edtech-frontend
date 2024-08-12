import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("Student");

  const email = watch("email");
  const otp = watch("otp");

  const handleSubmitDetails = (data) => {
    setOtpSent(false);
    sendOTP(data.email);
  };

  const sendOTP = async (email) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/send-otp`,
        { email }
      );

      toast.success(response.data.data.message);
      setOtpSent(true);
      setStep(2);
    } catch (error) {
      console.error("Error sending OTP:", error);
      const errorMessage =
        error.response?.data?.message || "Error sending OTP. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOTP = async (data) => {
    signupUser(data);
  };

  const signupUser = async (data) => {
    setLoading(true);
    const userData = {
      ...data,
      accountType,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/register`,
        userData
      );

      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[300px] text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-zinc-800 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Signup</h2>

        {step === 1 && (
          <form
            className="space-y-6"
            onSubmit={handleSubmit(handleSubmitDetails)}
          >
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name
              </label>
              <div className="mt-1">
                <input
                  {...register("firstName", { required: true })}
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  className="w-full px-3 py-2 border border-gray-300 bg-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.firstName && (
                  <span className="text-red-500">First name is required</span>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name
              </label>
              <div className="mt-1">
                <input
                  {...register("lastName", { required: true })}
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  className="w-full px-3 py-2 border border-gray-300 bg-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.lastName && (
                  <span className="text-red-500">Last name is required</span>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <div className="mt-1">
                <input
                  {...register("email", { required: true })}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="w-full px-3 py-2 border border-gray-300 bg-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="mt-1">
                <input
                  {...register("password", { required: true })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  className="w-full px-3 py-2 border border-gray-300 bg-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.password && (
                  <span className="text-red-500">Password is required</span>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium">
                Mobile Number
              </label>
              <div className="mt-1">
                <input
                  {...register("mobile", { required: true })}
                  id="mobile"
                  name="mobile"
                  type="tel"
                  autoComplete="tel"
                  className="w-full px-3 py-2 border border-gray-300 bg-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.mobile && (
                  <span className="text-red-500">
                    Mobile number is required
                  </span>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="accountType"
                className="block text-sm font-medium mb-2"
              >
                Account Type
              </label>
              <div className="flex items-center justify-between max-w-[200px] bg-gray-200 rounded-full p-1">
                <button
                  type="button"
                  onClick={() => setAccountType("Student")}
                  className={`py-2 px-4 rounded-full transition-all duration-300 ${
                    accountType === "Student"
                      ? "bg-blue-600 text-white"
                      : "bg-transparent text-gray-700"
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setAccountType("Instructor")}
                  className={`py-2 px-4 rounded-full transition-all duration-300 ${
                    accountType === "Instructor"
                      ? "bg-blue-600 text-white"
                      : "bg-transparent text-gray-700"
                  }`}
                >
                  Instructor
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </form>
        )}

        {step === 2 && otpSent && (
          <form className="space-y-6" onSubmit={handleSubmit(handleSubmitOTP)}>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium">
                OTP (One Time Password)
              </label>
              <div className="mt-1">
                <input
                  {...register("otp", { required: true })}
                  id="otp"
                  name="otp"
                  type="text"
                  autoComplete="one-time-code"
                  className="w-full px-3 py-2 border border-gray-300 bg-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.otp && (
                  <span className="text-red-500">OTP is required</span>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="px-4 py-2 text-gray-600 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={() => setStep(1)}
                disabled={loading}
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
