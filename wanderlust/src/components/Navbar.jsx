import { Link, NavLink, useNavigate } from "react-router-dom";
import { Compass, MapPin, User2, ShoppingCart, LogOut } from "lucide-react";
import { useUser } from "../store/UserContext";
import { useAuth } from "../store/AuthContext";
import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Navbar() {
  const navigate = useNavigate();
  const active = "text-gray-900 font-medium";
  const base = "text-gray-600 hover:text-gray-900";

  const { user, clearUser } = useUser();
  const { logout } = useAuth?.() || { logout: () => {} };

  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

   const [districts, setDistricts] = useState([]); 
  
  useEffect(() => {
    const refresh = async () => {
      const dist = await api("/districts")
      setDistricts(dist)
      // console.log(dist)
    }
    // setInterval(refresh, 5000)
    refresh()
  }, [])

  const onLogout = () => {
    try { logout?.(); } catch {}
    try { clearUser(); } catch {}
    navigate("/login");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = searchQuery.trim().toLowerCase();
      console.log(query, districts)
      const res = districts.findIndex(e=>e.name.trim().toLowerCase()==query)
      console.log(res)
      if (res != -1) {
        const id = districts[res]._id
        setError("");
         navigate(`/districts/${id}`,);
      }
      else {
        setError("Not available for now, try later.");
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex items-center justify-between h-16 gap-4 container-xxl">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid w-8 h-8 text-white rounded-full bg-brand-600 place-content-center">
            <Compass size={18} />
          </div>
          <span className="font-semibold tracking-wide">
            {user?.fullName ? `Wanderlust — ${user.fullName}` : "Wanderlust"}
          </span>
        </Link>

        <div className="relative flex-1 hidden max-w-xl md:flex">
          <input
            className="w-full px-4 py-2 bg-gray-100 border border-transparent rounded-full outline-none focus:border-brand-400"
            placeholder="Search destinations, activities, or guides…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          {error && (
            <div className="absolute left-0 mt-1 text-sm text-red-500 top-full">
              {error}
            </div>
          )}
        </div>

        <nav className="flex items-center gap-5">
          <NavLink to="/districts" className={({ isActive }) => isActive ? active : base}>
            <span className="inline-flex items-center gap-2">
              <MapPin size={18}/> Select District
            </span>
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? active : base}>
            <span className="inline-flex items-center gap-2">
              <User2 size={18}/> Profile
            </span>
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? active : base}>
            <span className="inline-flex items-center gap-2">
              <ShoppingCart size={18}/> Cart
            </span>
          </NavLink>
          <button onClick={onLogout} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <LogOut size={18}/> Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
