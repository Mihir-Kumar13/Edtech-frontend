import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmitDetails = (event) => {
    event.preventDefault();
    setOtpSent(false); // Reset OTP status
    sendOTP();
  };

  const sendOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/send-otp",
        { email }
      );

      toast.success(response.data.data.message);
      setOtpSent(true);
      setStep(2); // Move to the next step (enter OTP)
    } catch (error) {
      console.error("Error sending OTP:", error);
      const errorMessage =
        error.response?.data?.message || "Error sending OTP. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOTP = async (event) => {
    event.preventDefault();
    signupUser();
  };

  const signupUser = async () => {
    setLoading(true);
    const userData = {
      firstName,
      lastName,
      email,
      password,
      mobile,
      accountType: "Student",
      otp,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/register",
        userData
      );

      toast.success("Signup successful!");
      // Optionally, redirect or perform any additional actions after successful signup
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[300px] bg-zinc-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-zinc-800 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Signup</h2>

        {step === 1 && (
          <form className="space-y-6" onSubmit={handleSubmitDetails}>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name
              </label>
              <div className="mt-1">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 bg-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name
              </label>
              <div className="mt-1">
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 bg-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <div className="mt-1">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 bg-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="mt-1">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 bg-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium">
                Mobile Number
              </label>
              <div className="mt-1">
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  id="mobile"
                  name="mobile"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="w-full px-3 py-2 border border-gray-300 bg-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
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
          <form className="space-y-6" onSubmit={handleSubmitOTP}>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium">
                OTP (One Time Password)
              </label>
              <div className="mt-1">
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  id="otp"
                  name="otp"
                  type="text"
                  autoComplete="one-time-code"
                  required
                  className="w-full px-3 py-2 border border-gray-300 bg-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
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
