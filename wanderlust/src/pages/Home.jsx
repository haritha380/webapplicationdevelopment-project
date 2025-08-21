import DestinationCard from "../components/DestinationCard.jsx";
import GAL_IMAGE from "../assets/galle.webp";
import KAN_IMAGE from "../assets/kandy.jpg";
import COL_IMAGE from "../assets/colombo.jpg";
import MON_IMAGE from "../assets/mountain.jpg";
import { useEffect, useState } from "react";
import { api } from "../lib/api.js";

const HERO = MON_IMAGE;
const IMG_COLOMBO = COL_IMAGE;
const IMG_KANDY = KAN_IMAGE;
const IMG_GALLE = GAL_IMAGE;

export default function Home() {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    (async () => {
      const dist = await api("/districts");
      setDistricts(dist);
      console.log(dist);
    })();
  }, []);

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-[440px] md:h-[520px] overflow-hidden"
        style={{
          backgroundImage: `url(${HERO})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white container-xxl">
          <h1 className="h-hero">Discover Your Next Adventure</h1>
          <p className="mt-3 text-lg md:text-xl">
            Explore curated travel experiences across the globe
          </p>
          <a href="#popular" className="mt-6 btn-primary">
            Start Exploring
          </a>
        </div>
      </section>

      {/* Popular Destinations */}
      <section id="popular" className="py-12 container-xxl">
        <h2 className="mb-6 h-section">Popular destinations</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {districts.filter(d => ["Kandy", "Galle", "Colombo"].includes(d.name)).map(d => <DestinationCard
          key = {d._id }
            image={d.image}
            title={d.name}
            blurb={d.description}
            to={`/districts/${d._id}`}
          />)}
        </div>
      </section>
    </>
  );
}
