// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";
import FALL_IMAGE from "../assets/duwili.jpg"; // Same image used in Login page

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      // Admin specific email and password
      if (email === "haritha@gmail.com" && password === "haritha") {
        await login({ email, password });
        navigate("/admin-dashboard"); // Redirect to the admin dashboard
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Login failed");
    }
  }

  return (
    <div className="grid md:grid-cols-2 min-h-[640px]">
      {/* Left image section */}
      <div
        className="relative hidden md:block"
        style={{
          backgroundImage: `url(${FALL_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute text-white top-12 left-10 right-10">
          <h1 className="font-serif text-5xl font-black leading-tight">
            Admin Login
          </h1>
          <h3 className="mt-5 text-3xl">
            Manage your admin dashboard here
          </h3>
          <p className="mt-6 text-lg">
            Access restricted features for administrators only
          </p>
        </div>
      </div>

      {/* Right form section */}
      <div className="bg-[#f5eef5] flex items-center justify-center py-16">
        <div className="w-full max-w-xl px-8">
          <h2 className="font-serif text-4xl font-bold text-center">
            Admin Login
          </h2>
          <p className="mt-3 text-lg text-center">
            Please log in to access the admin dashboard
          </p>

          <form onSubmit={handleLogin} className="mt-10 space-y-6">
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                className="input"
                name="email" // <-- IMPORTANT
                type="email"
                placeholder="haritha@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Password</label>
              <input
                className="input"
                name="password" // <-- IMPORTANT
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-right">
              <button type="button" className="text-blue-700 underline">
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="w-full btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
