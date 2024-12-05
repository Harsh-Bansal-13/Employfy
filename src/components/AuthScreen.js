import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const AuthScreen = ({ setToken }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = () => setShow(!show);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });
      setToken(response.data.token);
      localStorage.setItem("employ-login", response.data.token);
    } catch (err) {
      setError("Invalid credentials or not a valid user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center bg-purple-100">
      <h1 className="text-4xl font-bold text-purple-800">Project By Harsh</h1>
      <form
        className="bg-white p-6 rounded-lg shadow-xl w-96"
        onSubmit={handleLogin}
      >
        <h2 className="text-xl font-semibold mb-4 text-purple-700">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4 relative">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="button"
            onClick={handleClick}
            className="absolute right-3 top-3 text-purple-500"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-purple-500 text-white py-3 rounded-md hover:bg-purple-600 transition-all duration-200"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>
      </form>
    </div>
  );
};

export default AuthScreen;
