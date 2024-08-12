import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      await register(email, password);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#27374D]">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="grainy shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold mb-6 text-[#5672e2] text-center">
            Register
          </h2>
          {error && <p className="text-red-500 text-sm italic mb-4">{error}</p>}
          <div className="mb-4">
            <label
              className="block text-[#5672e2] text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-[#5672e2]  focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-[#5672e2] text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-[#5672e2]  focus:shadow-outline"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 bottom-3"
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="text-gray-500" />
                ) : (
                  <AiFillEye className="text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-[#5672e2] text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password:
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-[#5672e2]  focus:shadow-outline"
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="******************"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3  bottom-3"
              >
                {showConfirmPassword ? (
                  <AiFillEyeInvisible className="text-gray-500" />
                ) : (
                  <AiFillEye className="text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <button
              className="bg-[#5672e2] hover:bg-[#4966d9] w-full text-white font-bold py-2 px-4 rounded focus:outline-[#5672e2]  focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
          <div className="mt-4 text-center bg-[#141E46] p-2 rounded-lg">
            <p className="text-white text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-400 hover:text-blue-600 font-semibold"
              >
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
