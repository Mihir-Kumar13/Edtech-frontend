import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const SignupForm = () => {
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitDetails = async (event) => {
    event.preventDefault();
    setOtpSent(false);
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/send-otp`,
        { email: formData.email }
      );
      toast.success(response.data.data.message);
      setOtpSent(true);
      setStep(2);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(
        error.response?.data?.message || "Error sending OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOTP = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/register`,
        { ...formData, accountType: "Student" }
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

  const renderInput = (name, label, type = "text", autoComplete) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <div className="mt-1">
        <input
          value={formData[name]}
          onChange={handleChange}
          id={name}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required
          className="w-full px-3 py-2 border border-gray-300 bg-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-[300px] text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-zinc-800 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Signup</h2>

        {step === 1 && (
          <form className="space-y-6" onSubmit={handleSubmitDetails}>
            {renderInput("firstName", "First Name", "text", "given-name")}
            {renderInput("lastName", "Last Name", "text", "family-name")}
            {renderInput("email", "Email address", "email", "email")}
            {renderInput("password", "Password", "password", "new-password")}
            {renderInput("mobile", "Mobile Number", "tel", "tel")}
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
            {renderInput(
              "otp",
              "OTP (One Time Password)",
              "text",
              "one-time-code"
            )}
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
    </div>
  );
};

export default SignupForm;
