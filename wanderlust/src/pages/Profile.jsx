import { useUser } from "../store/UserContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_PROFILE =
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=600&auto=format&fit=crop";
const BG =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop";

export default function Profile() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("Colombo, Sri Lanka");
  const [language, setLanguage] = useState("English");
  const [photo, setPhoto] = useState("");
  const fileRef = useRef(null);

  const { user, updateUser, deleteAccount } = useUser();
  const navigate = useNavigate(); // ✅ for redirecting

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setAge(user.age || "");
      setEmail(user.email || "");
      setLocation(user.location || "Colombo, Sri Lanka");
      setLanguage(user.language || "English");
      setPhoto(user.photo || "");
    }
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();
    if (age && Number(age) < 18) {
      alert("Age must be 18 or older.");
      return;
    }
    updateUser({ fullName, age, email, location, language, photo });
    alert("Profile updated!");
  };

  const onPickPhoto = () => fileRef.current?.click();

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result?.toString() || "";
      setPhoto(dataUrl);
      updateUser({ photo: dataUrl });
    };
    reader.readAsDataURL(f);
  };

  // ✅ handle delete and redirect
  const handleDelete = () => {
    deleteAccount();
    navigate("/login", { replace: true });
  };

  const profileSrc = photo || DEFAULT_PROFILE;

  return (
    <>
      <section className="relative h-28 bg-[#1f1a17] text-white flex items-center justify-center">
        <div className="text-center container-xxl">
          <h1 className="text-4xl h-hero">Profile</h1>
        </div>
      </section>

      <section
        className="relative"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative grid gap-10 py-10 text-gray-100 container-xxl lg:grid-cols-3">
          {/* Left */}
          <div className="lg:col-span-1">
            <div className="p-6 bg-black/70 rounded-2xl">
              <div className="w-40 h-40 mx-auto overflow-hidden rounded-full ring-2 ring-white/30">
                <img
                  src={profileSrc}
                  className="object-cover w-full h-full"
                  alt="profile"
                />
              </div>
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onFileChange}
              />
              <button
                onClick={onPickPhoto}
                className="btn-ghost w-full mt-4 !bg-white/10 !text-white"
              >
                Change Photo
              </button>
              <p className="mt-2 text-xs text-center">
                Recommended size: 400×400px
              </p>
            </div>
          </div>

          {/* Right */}
          <form onSubmit={handleSave} className="space-y-8 lg:col-span-2">
            <div className="p-6 bg-black/70 rounded-2xl">
              <h3 className="mb-4 text-xl font-semibold">Profile Information</h3>
              <div className="grid gap-4">
                <div>
                  <label className="block mb-1">Full Name</label>
                  <input
                    className="input !bg-white/10 !border-white/10 text-white"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Age</label>
                  <input
                    className="input !bg-white/10 !border-white/10 text-white"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <p className="mt-1 text-xs opacity-70">Must be 18 or older</p>
                </div>
                <div>
                  <label className="block mb-1">Email Address</label>
                  <input
                    className="input !bg-white/10 !border-white/10 text-white"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                  />
                  <p className="mt-1 text-xs opacity-70">
                    Used for account recovery
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 bg-black/70 rounded-2xl">
                <h3 className="mb-3 text-xl font-semibold">
                  Travel Preferences
                </h3>
                <input
                  className="input !bg-white/10 !border-white/10 text-white"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, Country"
                />
              </div>
              <div className="p-6 bg-black/70 rounded-2xl">
                <h3 className="mb-3 text-xl font-semibold">Language</h3>
                <input
                  className="input !bg-white/10 !border-white/10 text-white"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  placeholder="e.g., English"
                />
              </div>
            </div>

            <div className="p-6 bg-black/70 rounded-2xl">
              <h3 className="mb-3 text-xl font-semibold">Privacy Settings</h3>
              <label className="inline-flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <span>Private Profile</span>
              </label>
            </div>

            <div className="p-6 bg-black/70 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-red-400">Delete Account</div>
                  <div className="text-xs opacity-70">
                    Permanently delete your account
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button type="submit" className="btn-primary">
                    Update
                  </button>
                  {/* ✅ updated delete button */}
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="btn-ghost !bg-white/10 !text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
