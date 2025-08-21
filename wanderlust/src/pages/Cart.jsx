// src/pages/Cart.jsx
import { useCart } from "../store/CartContext.jsx";

const BG =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop";

export default function Cart() {
  const { items, remove, clear, book } = useCart();

  return (
    <>
      <section className="relative h-28 bg-[#1f1a17] text-white flex items-center justify-center">
        <div className="text-center container-xxl">
          <h1 className="text-3xl h-hero md:text-4xl">Cart</h1>
          <p className="text-sm opacity-80">Saved places for travel later</p>
        </div>
      </section>

      <section
        className="relative min-h-[420px]"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative py-12 container-xxl">
          {items.length === 0 ? (
            <div className="max-w-lg p-8 card bg-white/90">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {items.map((i) => {
                const pid = i.id || i.placeId; // safe id for both shapes
                return (
                  <div key={pid} className="flex gap-4">
                    {i.img ? (
                      <img
                        src={i.img}
                        alt={i.title}
                        className="object-cover rounded-lg w-72 h-44"
                      />
                    ) : (
                      <div className="grid text-gray-500 bg-gray-200 rounded-lg w-72 h-44 place-content-center">
                        No image
                      </div>
                    )}
                    <div className="bg-[#c6ffee] rounded-2xl p-5 w-full">
                      <div className="mb-2 font-serif text-2xl font-bold">
                        {i.title}
                      </div>
                      {i.distance && (
                        <div className="text-sm">Distance : {i.distance}</div>
                      )}
                      {i.fee && (
                        <div className="text-sm">Transport fee : {i.fee}</div>
                      )}

                      <div className="flex items-center gap-4 mt-5">
                        <button onClick={() => book(i)} className="btn-dark">
                          Book Taxi
                        </button>
                        <button
                          onClick={() => remove(pid)}
                          className="px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-8">
              <button
                onClick={clear}
                className="px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
