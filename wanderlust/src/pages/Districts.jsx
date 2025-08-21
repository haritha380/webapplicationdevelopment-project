import { Link } from "react-router-dom";
import KANDY_IMG from "../assets/kandy1.webp";
import COLOMBO_IMG from "../assets/colomboview.jpg";
import GALLE_IMG from "../assets/galle.webp";
import NUWARA_IMG from "../assets/nuwaraeliya.jpg";
import JAFFNA_IMG from "../assets/jaffna.jpg";
import ANURADHAPURA_IMG from "../assets/anuradhapura.jpg";
import { useEffect, useState } from "react";
import { api } from "../lib/api";






// const districts = [
//   {
//     id: "kandy",
//     name: "Kandy",
//     to: "/districts/kandy", // ✅ existing page
//     img: KANDY_IMG,
//     blurb: "Cultural capital; Temple of the Tooth, botanical gardens."
//   },
//   {
//     id: "colombo",
//     name: "Colombo",
//     to: "/districts/colombo", 
//     img: COLOMBO_IMG,
//     blurb: "Modern skyline; Lotus Tower, Port City, seafront promenade."
//   },
//   {
//     id: "galle",
//     name: "Galle",
//     to: "#", // set to /districts/galle when you build it
//     img: GALLE_IMG,
//     blurb: "UNESCO Dutch Fort, cobbled lanes, blue bays."
//   },
//   {
//     id: "nuwara-eliya",
//     name: "Nuwara Eliya",
//     to: "#",
//     img: NUWARA_IMG,
//     blurb: "Tea estates, misty hills, cool climate."
//   },
//   {
//     id: "jaffna",
//     name: "Jaffna",
//     to: "#",
//     img: JAFFNA_IMG,
//     blurb: "Northern culture, forts, islands & cuisine."
//   },
//   {
//     id: "anuradhapura",
//     name: "Anuradhapura",
//     to: "#",
//     img: ANURADHAPURA_IMG,
//     blurb: "Ancient stupas, sacred Bo tree, heritage ruins."
//   }
// ];

export default function Districts() {

  const [districts, setDistricts] = useState([]); 

useEffect(() => {
  (async () => {
    const dist = await api("/districts")
    setDistricts(dist)
    console.log(dist)
  })()
}, [])
  return (
    <>
      {/* Banner */}
      <section className="relative h-[260px] bg-black text-white">
        <div className="flex flex-col items-center justify-center h-full text-center container-xxl">
          <h1 className="font-serif text-5xl font-extrabold">Select District</h1>
          <p className="mt-2 text-lg opacity-90">Choose a district to explore destinations</p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 container-xxl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {districts.map((d) => (
            <div key={d._id} className="overflow-hidden card shadow-soft group">
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={d.image}
                  alt={d.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-5 bg-blue-50">
                <h3 className="font-serif text-2xl font-extrabold text-gray-900">{d.name}</h3>
                <p className="mt-1 text-sm text-gray-700">{d.blurb}</p>

                {d.to === "#" ? (
                  <button
                    disabled
                    className="mt-4 cursor-not-allowed btn-ghost opacity-60"
                    title="Coming soon"
                  >
                    Coming soon
                  </button>
                ) : (
                  <Link to={`/districts/${d._id}`} className="inline-block mt-4 btn-primary">
                    Explore
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
