// src/pages/PortCityDetails.jsx
import { useCart } from "../store/CartContext.jsx";
import PORTCITY_IMAGE from "../assets/portcity.jpg";

const HERO = PORTCITY_IMAGE;

export default function PortCityDetails() {
  const { add, book } = useCart(); // <-- get book from context

  // Include img so the booking/cart record has the thumbnail too
  const card = {
    id: "port-city",
    title: "Port City Colombo",
    distance: "2km",
    fee: "Rs.1500",
    img: PORTCITY_IMAGE,
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-[380px]"
        style={{
          backgroundImage: `url(${HERO})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 flex flex-col justify-end h-full pb-10 text-white container-xxl">
          <h1 className="h-hero">Port City Colombo</h1>
          <p className="text-lg">Colombo, Sri Lanka</p>
        </div>
      </section>

      {/* Info grid */}
      <section className="mt-6 container-xxl">
        <div className="grid gap-5 lg:grid-cols-5">
          <div className="lg:col-span-1 card p-6 bg-[#cfeaff]">
            <h3 className="mb-3 font-serif text-2xl font-bold">About Port City</h3>
            <p className="text-sm">
              Port City Colombo is a modern seafront development featuring promenades,
              recreational spaces, and striking skyline views. It’s a popular spot for
              evening walks, cycling, and waterfront dining.
            </p>
          </div>

          <div className="lg:col-span-1 card p-6 bg-[#cfeaff]">
            <h3 className="mb-3 font-serif text-2xl font-bold">Quick info</h3>
            <ul className="space-y-3 text-sm">
              <li>📍 Colombo, Sri Lanka</li>
              <li>⭐ 4.6 (1,280 reviews)</li>
              <li>🕖 Open 24/7 public spaces; best at sunset</li>
            </ul>
          </div>

          <div className="lg:col-span-1 card p-6 bg-[#cfeaff]">
            <h3 className="mb-3 font-serif text-2xl font-bold">Travel Tips</h3>
            <ul className="space-y-3 text-sm list-disc list-inside">
              <li>Great for sunset photos—bring a light jacket for sea breeze</li>
              <li>Plenty of walking/cycling paths—wear comfy shoes</li>
              <li>Check for events or pop-up markets on weekends</li>
              <li>Carry water; shade can be limited at noon</li>
            </ul>
          </div>

          <div className="lg:col-span-1 card p-6 bg-[#cfeaff]">
            <h3 className="mb-3 font-serif text-2xl font-bold">Emergency Contacts</h3>
            <ul className="space-y-3 text-sm">
              <li>👮 Police — 119 / 112</li>
              <li>🚑 Ambulance — 1990</li>
              <li>🏥 Colombo General Hospital — 0112 691111</li>
            </ul>
          </div>

          <div className="lg:col-span-1 card p-6 bg-[#cfeaff]">
            <h3 className="mb-3 font-serif text-2xl font-bold">
              Distance : {card.distance}
            </h3>
            <p className="text-sm">Transport fee: {card.fee}</p>
            <div className="flex flex-col gap-3 mt-6">
              <button onClick={() => add(card)} className="btn-dark">
                Add cart
              </button>
              {/* Record a booking in the DB */}
              <button onClick={() => book(card)} className="btn-taxi">
                Book Taxi
              </button>
              {/* Optionally: after booking, you could navigate or show a toast */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
