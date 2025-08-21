import { useCart } from "../store/CartContext.jsx";

// LOCAL IMAGE IMPORTS (place files in src/assets/)
import HERO_COLOMBO from "../assets/colomboview.jpg";
import IMG_LOTUS from "../assets/lotus.jpeg";
import IMG_PORT from "../assets/portcity.jpg";
import IMG_VIHARA from "../assets/vihara.jpg";
import { Link } from 'react-router-dom';


/* If you don't have local files yet, comment out the imports above and use URLs:
const HERO_COLOMBO = "https://images.unsplash.com/photo-1541791845191-bfd3bfff4783?w=1600&q=80&auto=format&fit=crop";
const IMG_LOTUS = "https://.../lotus.jpg";
const IMG_PORT  = "https://.../portcity.jpg";
const IMG_VIHARA= "https://.../viharamahadevi.jpg";
*/

export default function Colombo() {
  const { add } = useCart();

  const cards = [
    {
      id: "lotus-tower",
      title: "Lotus Tower",
      desc:
        "Sri Lanka’s tallest structure and iconic landmark with panoramic views of Colombo.",
      distance: "5km",
      fee: "Rs.1200",
      img: IMG_LOTUS,
       disabled: true
    },
    {
      id: "port-city",
      title: "Port City",
      desc:
        "Futuristic waterfront development with promenades, parks, and skyline vistas.",
      distance: "8km",
      fee: "Rs.1500",
      img: IMG_PORT,
      to: "/places/colombo/port-city" // Add this line to link to the Port City details page
    },
    {
      id: "viharamahadevi-park",
      title: "Viharamahadevi Park",
      desc:
        "Historic urban park with tree-lined paths, a golden Buddha statue, and relaxing green spaces.",
      distance: "3km",
      fee: "Rs.800",
      img: IMG_VIHARA,
       disabled: true
    }
  ];

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-[360px]"
        style={{ backgroundImage: `url(${HERO_COLOMBO})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 h-full container-xxl flex flex-col items-center justify-center text-center text-white">
          <h1 className="font-serif text-6xl font-extrabold">Colombo district</h1>
          <p className="text-3xl mt-3">Explore the vibrant heart of Sri Lanka</p>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-[#1d1c1c] text-white py-14">
        <div className="container-xxl">
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold mb-10">popular destinations</h2>

          <div className="grid md:grid-cols-3 gap-12">
            {cards.map((c) => (
              <div key={c.id} className="bg-[#121212] p-3 rounded-xl">
                <div className="bg-[#c7fff4] p-3 rounded-lg">
                  <img src={c.img} alt={c.title} className="w-full h-64 object-cover rounded-md" />
                </div>

                <div className="mt-3">
                  <h3 className="font-serif text-xl font-bold">{c.title}</h3>
                  <p className="text-sm text-gray-300 mt-2">{c.desc}</p>

                  <div className="text-xs mt-3 space-y-1 text-gray-300">
                    <div>Distance : {c.distance}</div>
                    <div>Estimated transport fee : {c.fee}</div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                   
                {c.disabled ? (
  <button
    disabled
    className="btn-dark opacity-50 cursor-not-allowed"
    title="Booking not available"
  >
    Book Cab
  </button>
) : c.to ? (
  <Link to={c.to} className="btn-dark">Book Cab</Link>
) : (
  <button className="btn-dark">Book Cab</button>
)}

                    <button
                      onClick={() => add({ id: c.id, title: c.title, distance: c.distance, fee: c.fee, img: c.img })}
                      className="btn-ghost"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
