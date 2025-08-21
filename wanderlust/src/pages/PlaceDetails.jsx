// src/pages/PlaceDetails.jsx
import { useCart } from "../store/CartContext.jsx";
import TEM_IMAGE from "../assets/temple.jpg";

const HERO = TEM_IMAGE;

export default function PlaceDetails() {
  const { add, book } = useCart(); // Get both 'add' and 'book' from CartContext

  const card = {
    id: "temple",
    title: "Temple of the Tooth",
    distance: "100km",
    fee: "Rs.2000",
    img: TEM_IMAGE, // Make sure the image is included in the data
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-[380px]"
        style={{ backgroundImage: `url(${HERO})`, backgroundSize: "cover", backgroundPosition: "top" }}
      >
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 flex flex-col justify-end h-full pb-10 text-white container-xxl">
          <h1 className="h-hero">Temple of the Tooth</h1>
          <p className="text-lg">Kandy, Sri Lanka</p>
        </div>
      </section>

      {/* Info grid */}
      <section className="container-xxl -mt+20">
        <div className="grid gap-5 lg:grid-cols-5">
          <div className="lg:col-span-1 card p-6 bg-[#cfeaff]">
            <h3 className="mb-3 font-serif text-2xl font-bold">About the Temple</h3>
            <p className="text-sm">
              The Temple of the Tooth is a Buddhist temple in Kandy which houses
              a relic believed to be the tooth of Buddha. It is one of the most
              sacred places of worship in the Buddhist world.
            </p>
          </div>

          <div className="lg:col-span-1 card p-6 bg-[#cfeaff]">
            <h3 className="mb-3 font-serif text-2xl font-bold">Quick info</h3>
            <ul className="space-y-3 text-sm">
              <li>📍 Kandy, Sri Lanka</li>
              <li>⭐ 4.8 (2,345 reviews)</li>
              <li>🕖 Open daily 6:00 AM - 8:00 PM</li>
            </ul>
          </div>

          <div className="lg:col-span-1 card p-6 bg-[#cfeaff]">
            <h3 className="mb-3 font-serif text-2xl font-bold">Travel Tips</h3>
            <ul className="space-y-3 text-sm list-disc list-inside">
              <li>Wear appropriate clothing (cover shoulders and knees)</li>
              <li>Remove shoes before entering the temple</li>
              <li>Follow temple etiquette and rules</li>
              <li>Consider hiring a guide for better experience</li>
            </ul>
          </div>

          <div className="lg:col-span-1 card p-6 bg-[#cfeaff]">
            <h3 className="mb-3 font-serif text-2xl font-bold">Emergency Contacts</h3>
            <ul className="space-y-3 text-sm">
              <li>👮 Local Police — 911 / 112</li>
              <li>🚑 Rescue Team — 911 / 1990</li>
              <li>🏥 Nearest Hospital — Central Hospital 011-2692692</li>
            </ul>
          </div>

          <div className="lg:col-span-1 card p-6 bg-[#cfeaff]">
            <h3 className="mb-3 font-serif text-2xl font-bold">Distance : {card.distance}</h3>
            <p className="text-sm">Transport fee: {card.fee}</p>
            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={() => add(card)} // Add the place to cart
                className="btn-dark"
              >
                Add to cart
              </button>
              {/* Book Taxi button that records the action in the backend */}
              <button onClick={() => book(card)} className="btn-taxi">
                Book Taxi
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
