import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false); 
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await login(email, password);
      toast.success("Login successful 🎉");
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      toast.error(
        "Login failed. Please check your credentials and try again 😢"
      );
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials and try again.");

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
            Login
          </h2>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="mb-4">
            <label
              className="block text-[#5672e2] text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-[#5672e2] focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-[#5672e2] text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-[#5672e2] focus:shadow-outline"
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
                disabled={isLoading}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="text-gray-500" />
                ) : (
                  <AiFillEye className="text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <button
              className="bg-[#5672e2] hover:bg-[#5672e2] w-full text-white font-bold py-2 px-4 rounded-lg focus:outline-[#5672e2] focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
          <div className="mt-4 text-center bg-[#141E46] p-2 rounded-lg">
            <p className="text-white text-sm">
              New user?{" "}
              <a
                href="/register"
                className="text-blue-400 hover:text-blue-600 font-semibold"
              >
                Register here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
