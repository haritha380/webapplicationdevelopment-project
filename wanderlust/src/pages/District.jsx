import { useCart } from "../store/CartContext.jsx";
import KAN1_IMAGE from "../assets/kandy1.webp";
import TOOTH_IMAGE from "../assets/tooth.jpg";
import PERA_IMAGE from "../assets/pera.webp";
import BAHIR_IMAGE from "../assets/bahirawa.jpg";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { useUser } from "../store/UserContext.jsx";

const HERO = KAN1_IMAGE;
const T1 = TOOTH_IMAGE;
const T2 = PERA_IMAGE;
const T3 = BAHIR_IMAGE;

export default function District() {
  const { districtId } = useParams();

  const { user } = useUser();
  console.log(user);

  const [discrict, setDiscrict] = useState(null);

  const [places, setPlaces] = useState([]);

  const { add } = useCart();
  const { book } = useCart();

  useEffect(() => {
    (async () => {
      const dis = await api(`/districts/${districtId}`);
      setDiscrict(dis);
      const data = await api(`/places/${districtId}`);
      setPlaces(data);
      console.log(data);
    })();
  }, [districtId]);

  const cards = [
    {
      id: "temple",
      title: "Temple of the tooth",
      desc: "The Temple of the Tooth in Kandy is a sacred Buddhist site that houses a relic of the tooth of Buddha.",
      distance: "100km",
      fee: "Rs.2000",
      img: T1,
      to: "/places/temple-of-the-tooth",
    },
    {
      id: "peradeniya",
      title: "Peradeniya Botanical Garden",
      desc: "Largest botanical garden in Sri Lanka, famous for orchids and towering palm avenues.",
      distance: "92km",
      fee: "Rs.1500",
      img: T2,
      disabled: true,
    },
    {
      id: "bahirawa",
      title: "Bahirawa kanda",
      desc: "Hilltop temple with a towering white Buddha statue and panoramic views.",
      distance: "110km",
      fee: "Rs.2500",
      img: T3,
      disabled: true,
    },
  ];

  return (
    <>
      <section
        className="relative h-[360px]"
        style={{
          backgroundImage: `url(${discrict?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white container-xxl">
          <h1 className="font-serif text-6xl font-extrabold">
            {discrict?.name} district
          </h1>
          <p className="mt-3 text-3xl">{discrict?.description}</p>
        </div>
      </section>

      <section className="bg-[#1d1c1c] text-white py-14">
        <div className="container-xxl">
          <h2 className="mb-10 font-serif text-4xl font-extrabold md:text-5xl">
            popular destinations
          </h2>

          <div className="grid gap-12 md:grid-cols-3">
            {places.map((c) => (
              <div key={c.id} className="bg-[#121212] p-3 rounded-xl">
                <div className="bg-[#c7fff4] p-3 rounded-lg">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="object-cover w-full h-64 rounded-md"
                  />
                </div>
                <div className="mt-3">
                  <h3 className="font-serif text-xl font-bold">{c.name}</h3>
                  <p className="mt-2 text-sm text-gray-300">{c.description}</p>

                  <div className="mt-3 space-y-1 text-xs text-gray-300">
                    <div>Distance : {c.distance} km</div>
                    <div>Estimated transport fee : Rs.{c.price}</div>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => {
                        console.log("booking");
                        book({
                          userId: user.id,
                          type: "cab",
                          id: c._id,
                          title: c.name,
                          distance: c.distance,
                          fee: c.price,
                          img: c.image,
                        });
                      }}
                      className="btn-ghost"
                      title="Booking not available"
                    >
                      Book Cab
                    </button>

                    <button
                      onClick={() => {
                        console.log("added")
                        add({
                          id: c._id,
                          title: c.name,
                          distance: c.distance,
                          fee: c.price,
                          img: c.image,
                        });
                      }}
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
