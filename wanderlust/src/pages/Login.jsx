// src/pages/Login.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";
import FALL_IMAGE from "../assets/fall.jpg";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();

    try {
      await login({ email, password }); // calls backend /api/auth/login
      navigate("/"); // success -> go home
    } catch (err) {
      alert(err.message);
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
            Discover Sri Lanka
          </h1>
          <h3 className="mt-5 text-3xl">
            Your gateway to paradise island adventures
          </h3>
          <p className="mt-6 text-lg">
            Explore ancient temples, pristine beaches, and lush landscapes
          </p>
        </div>
      </div>

      {/* Right form section */}
      <div className="bg-[#f5eef5] flex items-center justify-center py-16">
        <div className="w-full max-w-xl px-8">
          <h2 className="font-serif text-4xl font-bold text-center">
            Welcome Back!
          </h2>
          <p className="mt-3 text-lg text-center">
            Log in to continue your journey
          </p>

          <form onSubmit={handleLogin} className="mt-10 space-y-6">
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                className="input"
                name="email" // <-- IMPORTANT
                type="email"
                placeholder="you@example.com"
                required
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

            <p className="text-center">
              Don't have an account?{" "}
              <Link className="text-blue-700 underline" to="/register">
                Sign Up
              </Link>
            </p>

            {/* Admin Login Link */}
            <div className="mt-4 text-center">
              <Link className="text-blue-700 underline" to="/admin-login">
                Admin Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
